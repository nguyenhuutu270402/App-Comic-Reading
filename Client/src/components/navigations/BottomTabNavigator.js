import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrangChuStack from '../stacks/TrangChuStack';
import TheoDoiStack from '../stacks/TheoDoiStack';
import XepHangStack from '../stacks/XepHangStack';
import CaiDatStack from '../stacks/CaiDatStack';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Trang Chủ') {
                        iconName = focused ? 'ios-home' : 'ios-home-outline';
                    } else if (route.name === 'Theo Dõi') {
                        iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                    } else if (route.name === 'Xếp Hạng') {
                        iconName = focused ? 'ios-trophy' : 'ios-trophy-outline';
                    } else if (route.name === 'Cài Đặt') {
                        iconName = focused ? 'ios-settings' : 'ios-settings-outline';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                // tabBarLabel: () => null,
            })}
        >
            <Tab.Screen name="Trang Chủ" component={TrangChuStack} options={({ route }) => ({ tabBarStyle: { display: getRouteName(route) } })} />
            <Tab.Screen name="Theo Dõi" component={TheoDoiStack} />
            <Tab.Screen name="Xếp Hạng" component={XepHangStack} />
            <Tab.Screen name="Cài Đặt" component={CaiDatStack} />
        </Tab.Navigator>
    );
}
const getRouteName = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
    if (routeName?.includes("TrangChuScreen") || routeName == undefined) {
        return "flex"
    }
    return "none"
}

export default BottomTabNavigator;
