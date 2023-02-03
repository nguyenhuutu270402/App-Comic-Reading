import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import XepHangScreen from '../screens/XepHangScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TiemKiemScreen from '../screens/TiemKiemScreen';

const Stack = createNativeStackNavigator();

const XepHangStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='XepHangScreen' component={XepHangScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TiemKiemScreen' component={TiemKiemScreen} />

        </Stack.Navigator>
    )
}

export default XepHangStack