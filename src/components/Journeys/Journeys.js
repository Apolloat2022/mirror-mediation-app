import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/Global';
import { JOURNEY_PATHS } from '../../utils/Constants';

const Journeys = () => {
  return (
    <LinearGradient
      colors={['#0A0A0F', '#1A1A2E']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Journey Paths</Text>
        <Text style={styles.subtitle}>Guided inquiries into self-realization</Text>
        
        {JOURNEY_PATHS.map((journey) => (
          <TouchableOpacity key={journey.id} style={styles.journeyCard}>
            <LinearGradient
              colors={['rgba(74,144,226,0.2)', 'rgba(74,144,226,0.1)']}
              style={styles.journeyGradient}
            >
              <Text style={styles.journeyTitle}>{journey.title}</Text>
              <Text style={styles.journeyDescription}>{journey.description}</Text>
              <View style={styles.journeyMeta}>
                <Text style={styles.journeyDuration}>{journey.duration}</Text>
                <Text style={styles.journeyTheme}>{journey.theme}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingTop: 40,
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
    marginBottom: 40,
  },
  journeyCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  journeyGradient: {
    padding: 24,
  },
  journeyTitle: {
    fontSize: 20,
    color: colors.stardust,
    marginBottom: 8,
  },
  journeyDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    lineHeight: 20,
  },
  journeyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  journeyDuration: {
    fontSize: 12,
    color: colors.ocean,
  },
  journeyTheme: {
    fontSize: 12,
    color: colors.quantum,
  },
});

export default Journeys;