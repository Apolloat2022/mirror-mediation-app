import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { colors } from '../../styles/Global';

const Meditation = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 min
  const breathAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  // refs for the two sounds
  const bgMusicRef = useRef(null);

  /* ========== 1-second countdown ========== */
  useEffect(() => {
    if (isMeditating && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(timerRef.current);
  }, [isMeditating, timeLeft]);

  /* ========== breathing circle animation ========== */
  useEffect(() => {
    if (isMeditating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
          Animated.timing(breathAnim, { toValue: 0, duration: 4000, useNativeDriver: true }),
        ])
      ).start();
    } else {
      breathAnim.stopAnimation();
    }
  }, [isMeditating]);

  /* ========== background music (looping) ========== */
  const startBackgroundMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sound/meditation-bg.mp3'),
        { shouldPlay: true, isLooping: true, volume: 0.25 }
      );
      bgMusicRef.current = sound;
    } catch (e) {
      console.warn('BG music error:', e);
    }
  };

  const stopBackgroundMusic = async () => {
    if (bgMusicRef.current) {
      try {
        await bgMusicRef.current.stopAsync();
        await bgMusicRef.current.unloadAsync();
        bgMusicRef.current = null;
      } catch (e) {/* ignore */}
    }
  };

  /* ========== bell (end marker) ========== */
  const playBell = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sound/bell.mp3'),
        { shouldPlay: true, volume: 1.0 }
      );
      await sound.playAsync();
    } catch (e) {
      console.warn('Bell error:', e);
    }
  };

  /* ========== user actions ========== */
  const handleStart = () => {
    setIsMeditating(true);
    setTimeLeft(15 * 60);
    startBackgroundMusic();
  };

  const handleComplete = () => {
    setIsMeditating(false);
    stopBackgroundMusic().then(() => playBell());
    Alert.alert('Session Complete', '15 minutes of meditation is done. 🎉');
    setTimeLeft(15 * 60);
  };

  /* ========== helpers ========== */
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const breathScale = breathAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.4],
  });
  const breathOpacity = breathAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1],
  });

  /* ========== UI ========== */
  return (
    <LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Quantum Plexus</Text>
        <Text style={styles.subtitle}>Breath-aware meditation</Text>

        {!isMeditating ? (
          <View style={styles.setupSection}>
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <LinearGradient
                colors={[colors.quantum, colors.ocean]}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Begin Meditation</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.meditationSection}>
            <Animated.View
              style={[
                styles.breathCircle,
                { transform: [{ scale: breathScale }], opacity: breathOpacity },
              ]}
            />
            <Text style={styles.instruction}>Follow your breath</Text>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

            <TouchableOpacity style={styles.stopButton} onPress={handleComplete}>
              <Text style={styles.stopButtonText}>End Session</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

/* ========== styles (unchanged) ========== */
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 20, paddingTop: 80, alignItems: 'center' },
  title: { fontSize: 32, color: colors.stardust, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 60 },
  setupSection: { alignItems: 'center', marginTop: 60 },
  startButton: { borderRadius: 30, overflow: 'hidden' },
  buttonGradient: { paddingHorizontal: 40, paddingVertical: 20, borderRadius: 30 },
  buttonText: { fontSize: 18, color: colors.stardust, fontWeight: '600' },
  meditationSection: { alignItems: 'center', marginTop: 60 },
  breathCircle: { width: 200, height: 200, borderRadius: 100, borderWidth: 2, borderColor: colors.quantum, marginBottom: 40 },
  instruction: { fontSize: 18, color: colors.stardust, marginBottom: 10 },
  timer: { fontSize: 24, color: colors.quantum, marginBottom: 40 },
  stopButton: { backgroundColor: 'rgba(255,107,74,0.2)', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25, borderWidth: 1, borderColor: colors.dawn },
  stopButtonText: { fontSize: 16, color: colors.dawn },
});

export default Meditation;