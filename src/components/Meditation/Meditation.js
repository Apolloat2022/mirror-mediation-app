import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/Global';

const Meditation = () => {
  const [isMeditating, setIsMeditating] = useState(false);

  return (
    <LinearGradient
      colors={['#0A0A0F', '#1A1A2E']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Quantum Plexus</Text>
        <Text style={styles.subtitle}>Breath-aware meditation</Text>
        
        {!isMeditating ? (
          <View style={styles.setupSection}>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => setIsMeditating(true)}
            >
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
            <View style={styles.breathCircle} />
            <Text style={styles.instruction}>Follow your breath</Text>
            <TouchableOpacity 
              style={styles.stopButton}
              onPress={() => setIsMeditating(false)}
            >
              <Text style={styles.stopButtonText}>Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: colors.stardust,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 60,
  },
  setupSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  startButton: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    color: colors.stardust,
    fontWeight: '600',
  },
  meditationSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  breathCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.quantum,
    marginBottom: 40,
  },
  instruction: {
    fontSize: 18,
    color: colors.stardust,
    marginBottom: 40,
  },
  stopButton: {
    backgroundColor: 'rgba(255,107,74,0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.dawn,
  },
  stopButtonText: {
    fontSize: 16,
    color: colors.dawn,
  },
});

export default Meditation;