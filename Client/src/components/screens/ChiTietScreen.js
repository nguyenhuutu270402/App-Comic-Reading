import { TouchableOpacity, Text, StyleSheet } from 'react-native';


import React from 'react'

const ChiTietScreen = (props) => {
    const { navigation } = props;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('TimTruyenScreen')}
        >
            <Text>ChitietGo to TimTruyen</Text>
        </TouchableOpacity>
    );
}

export default ChiTietScreen

const styles = StyleSheet.create({})