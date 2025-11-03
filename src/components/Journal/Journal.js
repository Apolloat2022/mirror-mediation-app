import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../styles/Global';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [prompt] = useState("Without thinking, what is here now?");

  return (
    <LinearGradient
      colors={['#0A0A0F', '#1A1A2E']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Reflections</Text>
        
        <View style={styles.promptSection}>
          <Text style={styles.promptLabel}>Today's Prompt</Text>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>

        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Write your reflection here..."
          placeholderTextColor="#666"
          value={entry}
          onChangeText={setEntry}
        />

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => {
            // Save logic would go here
            setEntry('');
          }}
        >
          <Text style={styles.saveButtonText}>Save Reflection</Text>
        </TouchableOpacity>
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
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    color: colors.stardust,
    textAlign: 'center',
    marginBottom: 40,
  },
  promptSection: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  promptLabel: {
    fontSize: 14,
    color: colors.quantum,
    marginBottom: 8,
    letterSpacing: 1,
  },
  promptText: {
    fontSize: 18,
    color: colors.stardust,
    fontStyle: 'italic',
    lineHeight: 26,
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 20,
    minHeight: 200,
    color: colors.stardust,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: 'rgba(0,212,255,0.2)',
    paddingVertical: 16,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.quantum,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: colors.quantum,
    fontWeight: '600',
  },
});

export default Journal;