import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabBarBottom from './src/components/navigations/TabBarBottom';
import { ApiContextProvider } from './src/components/contexts/ApiContext';
export default function App() {
  return (
    <ApiContextProvider>
      <NavigationContainer>
        <TabBarBottom />
        <StatusBar style="dark" />
      </NavigationContainer>
    </ApiContextProvider>
  );
}

