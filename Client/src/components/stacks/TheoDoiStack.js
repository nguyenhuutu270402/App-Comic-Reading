import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TheoDoiScreen from '../screens/TheoDoiScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TiemKiemScreen from '../screens/TiemKiemScreen';

const Stack = createNativeStackNavigator();

const TheoDoiStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='TheoDoiScreen' component={TheoDoiScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TiemKiemScreen' component={TiemKiemScreen} />

        </Stack.Navigator>
    )
}

export default TheoDoiStack