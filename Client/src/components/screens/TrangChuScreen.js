import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

const TrangChuScreen = (props) => {
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Trang chủ</Text>
                <Pressable style={styles.boxIconSearch} onPress={() => navigation.navigate('TiemKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="#222" />
                </Pressable>
                <View style={styles.boxHeaderShadow}></View>
            </View>

        </View>

    );
}

export default TrangChuScreen;
const styles = StyleSheet.create({
    boxHeaderShadow: {
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 100 },
        shadowOpacity: 2,
        shadowRadius: 10,
        backgroundColor: 'white',
        padding: 1,
    },
    boxIconSearch: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    txtHeader: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        height: '100%',
        fontSize: 22,
        fontWeight: '700',
    },
    boxHeader: {
        width: '100%',
        position: 'relative',
        height: 60,
        marginTop: 16,
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
});