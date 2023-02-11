import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const TheoDoiScreen = (props) => {
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Theo dõi</Text>
                <Pressable style={styles.boxIconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="#222" />
                </Pressable>
                <View style={styles.boxHeaderShadow}></View>
            </View>

        </View>

    );
}

export default TheoDoiScreen

const styles = StyleSheet.create({
    boxHeaderShadow: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
        opacity: 0.1,
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
        marginTop: 6,
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
});