import { TouchableOpacity, Text, StyleSheet } from 'react-native';


import React from 'react'

const TimTruyenScreen = (props) => {
    const { navigation } = props;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('TrangChuScreen')}
        >
            <Text>timtruyen   Go to trangchu</Text>
        </TouchableOpacity>
    );
}

export default TimTruyenScreen

const styles = StyleSheet.create({})