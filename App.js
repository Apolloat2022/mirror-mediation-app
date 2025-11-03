import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Observatory from './src/components/HomeScreen/Observatory';
import Library from './src/components/Library/Library';
import Journeys from './src/components/Journeys/Journeys';
import Meditation from './src/components/Meditation/Meditation';
import Journal from './src/components/Journal/Journal';
import SourceMaterial from './src/components/SourceMaterial/SourceMaterial';

import { colors } from './src/styles/Global';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.void} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            switch (route.name) {
              case 'Observatory':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Library':
                iconName = focused ? 'library' : 'library-outline';
                break;
              case 'Journeys':
                iconName = focused ? 'compass' : 'compass-outline';
                break;
              case 'Meditation':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'Journal':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Source':
                iconName = focused ? 'download' : 'download-outline';
                break;
              default:
                iconName = 'help-circle';
            }
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.quantum,
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: colors.void,
            borderTopColor: '#1A1A2E',
          },
          headerStyle: {
            backgroundColor: colors.void,
          },
          headerTintColor: colors.stardust,
        })}
      >
        <Tab.Screen name="Observatory" component={Observatory} />
        <Tab.Screen name="Library" component={Library} />
        <Tab.Screen name="Journeys" component={Journeys} />
        <Tab.Screen name="Meditation" component={Meditation} />
        <Tab.Screen name="Journal" component={Journal} />
        <Tab.Screen name="Source" component={SourceMaterial} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}