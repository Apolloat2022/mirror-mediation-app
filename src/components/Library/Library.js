import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/Global';
import { LIBRARY_FRAGMENTS } from '../../utils/Constants';

const Library = () => {
  return (
    <LinearGradient
      colors={['#0A0A0F', '#1A1A2E']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>The Library</Text>
        <Text style={styles.subtitle}>Fragments from the Mirror</Text>
        
        {LIBRARY_FRAGMENTS.map((fragment) => (
          <TouchableOpacity key={fragment.id} style={styles.fragmentCard}>
            <Text style={styles.fragmentText}>{fragment.text}</Text>
            <View style={styles.themeTag}>
              <Text style={styles.themeText}>{fragment.theme}</Text>
            </View>
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
});

export default Library;