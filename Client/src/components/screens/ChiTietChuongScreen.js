import { StyleSheet, Text, View, Image, Pressable, FlatList, ToastAndroid, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import { ApiContext } from '../contexts/ApiContext';
import { Modal, List } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';



const ChiTietChuongScreen = (props) => {
    const { navigation, route: { params: { id } } } = props;
    const { onGetListImageChuongByIdChuong } = useContext(ApiContext);
    const [listImage, setListImage] = useState([]);

    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    useEffect(() => {
        async function fetchData() {
            const response1 = await onGetListImageChuongByIdChuong(1);
            setListImage(response1.results);
        }

        fetchData();
    }, []);

    const renderHeader = () => {
        return (
            <View>

            </View>
        )
    }
    const renderItem = ({ item }) => (
        <View>
            <Image
                source={{ uri: item.imagelink }}
                style={styles.imageItem}
                resizeMode="contain"
            />

        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={listImage}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
            <View style={styles.boxLink}></View>

        </View>
    )
}

export default ChiTietChuongScreen

const styles = StyleSheet.create({
    boxLink: {
        position: 'absolute',
        backgroundColor: 'red',
        width: 200,
        height: 30,
    },
    imageItem: {
        width: '100%',
        height: undefined,
        aspectRatio: 0.7,

    },
    container: {
        position: 'relative',
    },
})