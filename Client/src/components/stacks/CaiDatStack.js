import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CaiDatScreen from '../screens/CaiDatScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TimKiemScreen from '../screens/TimKiemScreen';
import DangNhapScreen from '../screens/DangNhapScreen';
import DangKyScreen from '../screens/DangKyScreen';
import TaiKhoanScreen from '../screens/TaiKhoanScreen';
import LichSuScreen from '../screens/LichSuScreen';
import TheLoaiScreen from '../screens/TheLoaiScreen';
import TimTruyenScreen from '../screens/TimTruyenScreen';
import ChiTietChuongScreen from '../screens/ChiTietChuongScreen';

const Stack = createNativeStackNavigator();

const CaiDatStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='CaiDatScreen' component={CaiDatScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TimKiemScreen' component={TimKiemScreen} />
            <Stack.Screen name='DangNhapScreen' component={DangNhapScreen} />
            <Stack.Screen name='DangKyScreen' component={DangKyScreen} />
            <Stack.Screen name='TaiKhoanScreen' component={TaiKhoanScreen} />
            <Stack.Screen name='LichSuScreen' component={LichSuScreen} />
            <Stack.Screen name='TheLoaiScreen' component={TheLoaiScreen} />
            <Stack.Screen name='TimTruyenScreen' component={TimTruyenScreen} />
            <Stack.Screen name='ChiTietChuongScreen' component={ChiTietChuongScreen} />



        </Stack.Navigator>
    )
}

export default CaiDatStack