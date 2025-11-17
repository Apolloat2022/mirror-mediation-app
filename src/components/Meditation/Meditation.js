import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { colors } from '../../styles/Global';

const Meditation = () => {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 min
  const breathAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  // Get screen dimensions for responsive layout
  const { height: screenHeight, width: screenWidth } = Dimensions.get('window');
  const isWeb = Platform.OS === 'web';
  const isSmallScreen = screenHeight < 700;
  
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

  // Responsive size calculations
  const circleSize = isSmallScreen ? 140 : 180;
  const topPadding = isWeb ? 40 : (isSmallScreen ? 50 : 80);
  const sectionMarginTop = isSmallScreen ? 30 : 60;

  /* ========== UI ========== */
  return (
    <LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={styles.gradient}>
      <View style={[styles.container, { paddingTop: topPadding }]}>
        <Text style={styles.title}>Quantum Plexus</Text>
        <Text style={styles.subtitle}>Breath-aware meditation</Text>

        {!isMeditating ? (
          <View style={[styles.setupSection, { marginTop: sectionMarginTop }]}>
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
          <View style={[styles.meditationSection, { marginTop: sectionMarginTop - 20 }]}>
            <Animated.View
              style={[
                styles.breathCircle,
                { 
                  width: circleSize, 
                  height: circleSize, 
                  borderRadius: circleSize / 2,
                  transform: [{ scale: breathScale }], 
                  opacity: breathOpacity 
                },
              ]}
            />
            <Text style={styles.instruction}>Follow your breath</Text>
            <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

            {/* End Session Button with guaranteed visibility */}
            <View style={styles.endSessionContainer}>
              <TouchableOpacity style={styles.stopButton} onPress={handleComplete}>
                <Text style={styles.stopButtonText}>End Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

/* ========== Updated responsive styles ========== */
const styles = StyleSheet.create({
  gradient: { 
    flex: 1 
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: { 
    fontSize: 32, 
    color: colors.stardust, 
    textAlign: 'center', 
    marginBottom: 8 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#888', 
    textAlign: 'center', 
    marginBottom: 40
  },
  setupSection: { 
    alignItems: 'center',
    width: '100%',
  },
  startButton: { 
    borderRadius: 30, 
    overflow: 'hidden',
    shadowColor: colors.quantum,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: { 
    paddingHorizontal: 40, 
    paddingVertical: 20, 
    borderRadius: 30 
  },
  buttonText: { 
    fontSize: 18, 
    color: colors.stardust, 
    fontWeight: '600',
    textAlign: 'center',
  },
  meditationSection: { 
    alignItems: 'center', 
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 30, // Ensures space for the button
  },
  breathCircle: { 
    borderWidth: 2, 
    borderColor: colors.quantum,
    marginBottom: 30,
  },
  instruction: { 
    fontSize: 18, 
    color: colors.stardust, 
    marginBottom: 15,
    textAlign: 'center',
  },
  timer: { 
    fontSize: 24, 
    color: colors.quantum, 
    marginBottom: 20,
    fontWeight: '600',
  },
  endSessionContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto', // Pushes to bottom
    paddingBottom: 20, // Extra padding for safety
  },
  stopButton: { 
    backgroundColor: 'rgba(255,107,74,0.2)', 
    paddingHorizontal: 30, 
    paddingVertical: 15, 
    borderRadius: 25, 
    borderWidth: 1, 
    borderColor: colors.dawn,
    minWidth: 150,
    shadowColor: colors.dawn,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  stopButtonText: { 
    fontSize: 16, 
    color: colors.dawn,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Meditation;