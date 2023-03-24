import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import TabBarBottom from './src/components/navigations/TabBarBottom';
import BottomTabNavigator from './src/components/navigations/BottomTabNavigator';
import { ApiContextProvider } from './src/components/contexts/ApiContext';
export default function App() {
  return (
    <ApiContextProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          translucent={true}
        />
        <BottomTabNavigator />
      </NavigationContainer>
    </ApiContextProvider>
  );
}

