import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/Global';
import { LIBRARY_FRAGMENTS } from '../../utils/Constants';

const Library = () => {
  const isWeb = Platform.OS === 'web';
  const { width: screenWidth } = Dimensions.get('window');
  const [displayedFragments, setDisplayedFragments] = useState([]);

  // Get 4 random fragments that change on each component mount/refresh
  useEffect(() => {
    selectRandomFragments();
  }, []);

  const selectRandomFragments = () => {
    // Create a copy of the fragments array
    const shuffled = [...LIBRARY_FRAGMENTS]
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, 4); // Take first 4
    
    setDisplayedFragments(shuffled);
  };

  const refreshFragments = () => {
    selectRandomFragments();
  };

  return (
    <LinearGradient
      colors={['#0A0A0F', '#1A1A2E']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={[
        styles.container,
        isWeb && { paddingHorizontal: screenWidth > 768 ? 100 : 20 }
      ]}>
        <Text style={styles.title}>The Library</Text>
        <Text style={styles.subtitle}>Random Wisdom Fragments</Text>
        
        {/* Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={refreshFragments}>
          <Text style={styles.refreshButtonText}>Refresh Fragments</Text>
        </TouchableOpacity>

        <Text style={styles.collectionTitle}>Today's Selection ({displayedFragments.length}/4)</Text>
        
        {/* Display only 4 random fragments */}
        {displayedFragments.map((fragment) => (
          <View key={`${fragment.id}-${Math.random()}`} style={styles.fragmentCard}>
            <Text style={styles.fragmentText}>{fragment.text}</Text>
            <View style={styles.themeTag}>
              <Text style={styles.themeText}>{fragment.theme}</Text>
            </View>
          </View>
        ))}

        {/* Info text */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • 4 random fragments are selected each time{'\n'}
            • Refresh to see new wisdom{'\n'}
            • {LIBRARY_FRAGMENTS.length} total fragments in library
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
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
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: 'rgba(0,212,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,212,255,0.3)',
    alignSelf: 'center',
    marginBottom: 30,
  },
  refreshButtonText: {
    fontSize: 14,
    color: colors.quantum,
    fontWeight: '600',
  },
  collectionTitle: {
    fontSize: 20,
    color: colors.stardust,
    marginBottom: 20,
    textAlign: 'center',
  },
  fragmentCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.quantum,
  },
  fragmentText: {
    fontSize: 16,
    color: colors.stardust,
    lineHeight: 24,
    marginBottom: 12,
  },
  themeTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,107,74,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  themeText: {
    fontSize: 12,
    color: colors.dawn,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  infoText: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
});

export default Library;