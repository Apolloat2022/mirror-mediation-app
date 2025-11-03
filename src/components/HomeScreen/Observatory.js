import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/Global';
import { DAILY_POINTERS } from '../../utils/Constants';

const Observatory = () => {
  const dailyPointer = DAILY_POINTERS[new Date().getDay()];

  return (
    <LinearGradient
      colors={['#0A0A0F', '#1A1A2E']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.dailyMirror}>
          <Text style={styles.dailyLabel}>Today's Mirror</Text>
          <View style={styles.pointerCard}>
            <Text style={styles.pointerText}>{dailyPointer}</Text>
          </View>
        </View>

        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>The Observatory</Text>
          <Text style={styles.welcomeText}>
            A space for silent observation and self-inquiry
          </Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  dailyMirror: {
    alignItems: 'center',
    marginBottom: 40,
  },
  dailyLabel: {
    fontSize: 14,
    color: colors.quantum,
    marginBottom: 16,
    letterSpacing: 2,
  },
  pointerCard: {
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.3)',
  },
  pointerText: {
    fontSize: 18,
    color: colors.stardust,
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  welcomeSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    color: colors.stardust,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Observatory;