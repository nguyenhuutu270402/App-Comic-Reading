import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, RefreshControl } from 'react-native'
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TheLoaiScreen = (props) => {
    const { navigation } = props;
    const { onGetListTheLoai } = useContext(ApiContext);
    const [listTheLoai, setListTheLoai] = useState([]);
    const [nguoiDung, setNguoiDung] = useState({});

    async function fetchData() {
        try {
            const response = await onGetListTheLoai();
            setListTheLoai(response.results);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    const renderItem = ({ item }) => (
        <Pressable key={item.id} style={styles.containerItem} onPress={() => navigation.navigate('TruyenTheoLoaiScreen', { tacgia: null, theloai: item })}>
            {
                item.tentheloai === 'Romance' | item.tentheloai === 'Comedy' | item.tentheloai === 'Manga' | item.tentheloai === 'Shounen' ?
                    <Text style={styles.textItem2}>{item.tentheloai}</Text>
                    :
                    <Text style={styles.textItem}>{item.tentheloai}</Text>
            }
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Thể loại</Text>
                <Pressable style={styles.boxIconSearch} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="#222" />
                </Pressable>
                <View style={styles.boxHeaderShadow}></View>
            </View>
            <View style={styles.containerList}>
                <FlatList
                    data={listTheLoai}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                />
            </View>

        </View>
    )
}

export default TheLoaiScreen

const styles = StyleSheet.create({
    textItem2: {
        color: 'tomato',
        fontSize: 16,
        fontWeight: '600'
    },
    containerItem2: {
        width: '42%',
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 16,
        borderColor: 'grey',
        borderRadius: 10,

    },
    textItem: {
        color: '#222',
        fontSize: 16,
        fontWeight: '600'
    },
    containerItem: {
        width: '42%',
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 16,
        borderColor: 'grey',
        borderRadius: 10,
    },
    boxHeaderShadow: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
        opacity: 0.1,
    },
    boxIconSearch: {
        position: 'absolute',
        left: 16,
        top: 20,
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
    containerList: {
        height: '92%',
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
})