import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BinhLuanScreen = (props) => {
    const { navigation, route: { params: { idTruyen, nguoidung } } } = props;
    return (
        <View>
            <Text>BinhLuanScreen</Text>
        </View>
    )
}

export default BinhLuanScreen

const styles = StyleSheet.create({})