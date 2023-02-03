import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CaiDatScreen from '../screens/CaiDatScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TiemKiemScreen from '../screens/TiemKiemScreen';

const Stack = createNativeStackNavigator();

const CaiDatStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='CaiDatScreen' component={CaiDatScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TiemKiemScreen' component={TiemKiemScreen} />

        </Stack.Navigator>
    )
}

export default CaiDatStack