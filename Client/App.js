import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabBarBottom from './src/components/navigations/TabBarBottom';
export default function App() {
  return (
    <NavigationContainer>
      <TabBarBottom />
      <StatusBar style="dark" />
    </NavigationContainer>

  );
}

