import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Text style={{ color: '#fff', fontSize: 24 }}>Test App - No Login</Text>
      <Text style={{ color: '#0ff', fontSize: 16, marginTop: 20 }}>If you see this, no login required!</Text>
    </View>
  );
}