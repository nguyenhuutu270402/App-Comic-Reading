import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

import TrangChuStack from '../stacks/TrangChuStack';
import TheoDoiStack from '../stacks/TheoDoiStack';
import XepHangStack from '../stacks/XepHangStack';
import CaiDatStack from '../stacks/CaiDatStack';

const TabBarBottom = (props) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name == "TrangChuStack") {
                        return <Ionicons name="home-outline" size={24} color={color} />
                    } else if (route.name == "TheoDoiStack") {
                        return <Entypo name="heart-outlined" size={24} color={color} />
                    } else if (route.name == "XepHangStack") {
                        return <Feather name="bar-chart-2" size={24} color={color} />
                    } else if (route.name == "CaiDatStack") {
                        return <Ionicons name="settings-outline" size={24} color={color} />
                    }
                },
                tabBarLabel: ({ focused }) => {
                    if (route.name == "TrangChuStack" && focused) {
                        return <Text style={styles.text}>Trang chủ</Text>
                    } else if (route.name == "TheoDoiStack" && focused) {
                        return <Text style={styles.text}>Theo dõi</Text>
                    } else if (route.name == "XepHangStack" && focused) {
                        return <Text style={styles.text}>Xếp hạng</Text>
                    } else if (route.name == "CaiDatStack" && focused) {
                        return <Text style={styles.text}>Cài đặt</Text>
                    }
                    return null;
                },
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',

            })}>

            <Tab.Screen name="TrangChuStack" component={TrangChuStack} options={({ route }) => ({ tabBarStyle: { display: getRouteName(route) } })} />
            <Tab.Screen name="XepHangStack" component={XepHangStack} />
            <Tab.Screen name="TheoDoiStack" component={TheoDoiStack} />
            <Tab.Screen name="CaiDatStack" component={CaiDatStack} />

        </Tab.Navigator>
    )
}

const getRouteName = route => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log(routeName);
    if (routeName?.includes("TrangChuScreen") || routeName == undefined) {
        return "flex"
    }
    return "none"
}


export default TabBarBottom

const styles = StyleSheet.create({
    image: {

    },
    text: {
        color: 'tomato',
        // backgroundColor: '#9999',
        lineHeight: 16,
        fontSize: 13,
    }
})