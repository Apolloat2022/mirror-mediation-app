import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { colors } from '../../styles/Global';

const MirrorAudio = () => {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }

      setIsPlaying(true);
      
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/audio/meditation.mp3'),
        { shouldPlay: true }
      );
      
      soundRef.current = sound;
      setSound(sound);
      
      // Get duration
      const status = await sound.getStatusAsync();
      setDuration(status.durationMillis);
      
      // Update playback position
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPlaybackPosition(status.positionMillis);
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPlaybackPosition(0);
          }
        }
      });
      
    } catch (error) {
      console.warn('Audio error:', error);
      Alert.alert('Audio Error', 'Could not play meditation audio');
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
      setIsPlaying(false);
      setPlaybackPosition(0);
    }
  };

  const pauseSound = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const formatTime = (millis) => {
    if (!millis) return "0:00";
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progress = duration > 0 ? (playbackPosition / duration) * 100 : 0;

  return (
    <LinearGradient colors={['#0A0A0F', '#1A1A2E']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Mirror Audio</Text>
        <Text style={styles.subtitle}>Contemplative Listening</Text>

        <View style={styles.audioCard}>
          <View style={styles.audioInfo}>
            <Text style={styles.audioTitle}>Mirror Meditation</Text>
            <Text style={styles.audioDescription}>
              A guided contemplation from the Mirror. Close your eyes and listen deeply.
            </Text>
            <Text style={styles.audioDuration}>
              Duration: {formatTime(duration)}
            </Text>
            
            {/* Progress Bar */}
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${progress}%` }]} 
              />
            </View>
            
            <Text style={styles.timeText}>
              {formatTime(playbackPosition)} / {formatTime(duration)}
            </Text>
          </View>
          
          <View style={styles.controls}>
            {!isPlaying ? (
              <TouchableOpacity 
                style={styles.playButton}
                onPress={playSound}
              >
                <Text style={styles.playButtonText}>▶️ Play</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.controlGroup}>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={pauseSound}
                >
                  <Text style={styles.controlButtonText}>⏸️ Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.controlButton}
                  onPress={stopSound}
                >
                  <Text style={styles.controlButtonText}>⏹️ Stop</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.note}>
          • Find a quiet space for listening{'\n'}
          • Use headphones for best experience{'\n'}
          • Allow the words to settle deeply
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { 
    padding: 20, 
    paddingTop: 60, 
    paddingBottom: 40,
    alignItems: 'center'
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
  audioCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.2)',
  },
  audioInfo: { 
    marginBottom: 20 
  },
  audioTitle: { 
    fontSize: 22, 
    color: colors.stardust, 
    marginBottom: 12, 
    fontWeight: '600',
    textAlign: 'center'
  },
  audioDescription: { 
    fontSize: 16, 
    color: '#888', 
    marginBottom: 16, 
    lineHeight: 22,
    textAlign: 'center'
  },
  audioDuration: { 
    fontSize: 14, 
    color: colors.quantum, 
    textAlign: 'center',
    marginBottom: 16
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.quantum,
    borderRadius: 3,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center'
  },
  controls: {
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0,212,255,0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.quantum,
  },
  playButtonText: { 
    fontSize: 18,
    color: colors.stardust,
    fontWeight: '600'
  },
  controlGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  controlButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  controlButtonText: {
    fontSize: 16,
    color: colors.stardust,
  },
  note: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 20,
  },
});

export default MirrorAudio;