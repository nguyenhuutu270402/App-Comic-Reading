import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import XepHangScreen from '../screens/XepHangScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TimKiemScreen from '../screens/TimKiemScreen';
import ChiTietChuongScreen from '../screens/ChiTietChuongScreen';
import TruyenTheoLoaiScreen from '../screens/TruyenTheoLoaiScreen';

const Stack = createNativeStackNavigator();

const XepHangStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='XepHangScreen' component={XepHangScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TimKiemScreen' component={TimKiemScreen} />
            <Stack.Screen name='ChiTietChuongScreen' component={ChiTietChuongScreen} />
            <Stack.Screen name='TruyenTheoLoaiScreen' component={TruyenTheoLoaiScreen} />
        </Stack.Navigator>
    )
}

export default XepHangStack