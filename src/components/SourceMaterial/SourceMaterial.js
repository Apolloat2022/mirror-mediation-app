import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, bookLinks } from '../../styles/Global';

const SourceMaterial = () => {
  const openLink = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0A0A0F', '#1A1A2E']}
        style={styles.gradient}
      >
        
        <View style={styles.header}>
          <Text style={styles.title}>Source Material</Text>
          <Text style={styles.subtitle}>
            The original teachings that inspired this experience
          </Text>
        </View>

        <View style={styles.bookCard}>
          <View style={styles.bookCover}>
            <Text style={styles.bookIcon}>📖</Text>
          </View>
          
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>Mirror</Text>
            <Text style={styles.bookAuthor}>by Moksha Mukti</Text>
            <Text style={styles.bookDescription}>
              The original book that started this journey of self-inquiry
            </Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => openLink(bookLinks.physicalBook)}
          >
            <LinearGradient
              colors={['#FF6B4A', '#FF8E6B']}
              style={styles.optionGradient}
            >
              <Text style={styles.optionIcon}>📚</Text>
              <Text style={styles.optionTitle}>Physical Book</Text>
              <Text style={styles.optionDescription}>
                Get the complete printed edition
              </Text>
              <Text style={styles.optionButton}>Purchase on Amazon</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => openLink(bookLinks.audiobook)}
          >
            <LinearGradient
              colors={['#4A90E2', '#6BA8FF']}
              style={styles.optionGradient}
            >
              <Text style={styles.optionIcon}>🎧</Text>
              <Text style={styles.optionTitle}>Audiobook</Text>
              <Text style={styles.optionDescription}>
                Listen to the narrated version
              </Text>
              <Text style={styles.optionButton}>Get on Google Play</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About the Book</Text>
          <Text style={styles.aboutText}>
            "Mirror" takes you on a profound journey beyond intellectual understanding, 
            pointing directly to the truth of who you really are. This app is designed 
            to complement the book's teachings with experiential practices.
          </Text>
        </View>

      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.void,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
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
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  bookCover: {
    width: 60,
    height: 80,
    backgroundColor: 'rgba(0,212,255,0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  bookIcon: {
    fontSize: 24,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 22,
    color: colors.stardust,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 16,
    color: colors.quantum,
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  optionGradient: {
    padding: 24,
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 20,
    color: colors.stardust,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: 'rgba(245,242,232,0.8)',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  optionButton: {
    fontSize: 14,
    color: colors.stardust,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  aboutSection: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 20,
  },
  aboutTitle: {
    fontSize: 20,
    color: colors.stardust,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 15,
    color: '#888',
    lineHeight: 22,
  },
});

export default SourceMaterial;