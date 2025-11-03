import { StyleSheet } from 'react-native';

export const colors = {
  void: '#0A0A0F',
  stardust: '#F5F2E8',
  dawn: '#FF6B4A',
  ocean: '#4A90E2',
  quantum: '#00D4FF',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.void,
  },
  gradientBackground: {
    flex: 1,
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
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
});

export const bookLinks = {
  physicalBook: 'https://www.amazon.com/Mirror-Robin-Pandey/dp/B0BKS3Q2FL',
  audiobook: 'https://play.google.com/store/audiobooks/details/Robin_Pandey_Mirror?id=AQAAAEAq1luWYM'
};