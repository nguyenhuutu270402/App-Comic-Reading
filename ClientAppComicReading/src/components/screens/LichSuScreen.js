import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, RefreshControl } from 'react-native'
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LichSuScreen = (props) => {
    const { navigation } = props;
    const { onGetListLichSuTheoIdNguoiDung, onDeleteLichSu } = useContext(ApiContext);
    const [listTruyen, setListtruyen] = useState([]);
    const [nguoiDung, setNguoiDung] = useState({});

    async function fetchData() {
        try {
            AsyncStorage.getItem('nguoidung')
                .then(async value => {
                    const myObject = JSON.parse(value);
                    if (myObject == null) {
                    } else {
                        setNguoiDung(myObject);
                        const response = await onGetListLichSuTheoIdNguoiDung(myObject.id);
                        setListtruyen(response.results);
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    const renderItem = ({ item }) => (

        <TouchableOpacity key={item.id} onPress={() => navigation.push('ChiTietScreen', { id: item.id })} style={styles.containerItemTruyen}>
            <View>
                <Image style={styles.imageTruyen} source={{ uri: item.imagelink }}></Image>
                <TouchableOpacity style={styles.boxXoaTruyen} onPress={() => deletLichSu(item.id)}>
                    <Text style={styles.textXoaTruyen}>Xóa</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.boxNameTruyen}>
                <Text numberOfLines={2} style={styles.textNameTruyen}>{item.tentruyen}</Text>
                <View style={styles.boxChapterTruyen}>
                    <Text style={styles.textChapterTruyen}>Đang đọc chap {item.sochuong}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    // reload
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        // Fetch your data here and then set refreshing to false
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const deletLichSu = async (idTruyen) => {
        try {
            await onDeleteLichSu(nguoiDung.id, idTruyen);
            fetchData();

        } catch (error) {
            fetchData();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Lịch sử</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="#222" />
                </TouchableOpacity>
                <View style={styles.boxHeaderShadow}></View>
            </View>
            <FlatList
                data={listTruyen}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                refreshControl={
                    < RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

        </View>

    );
}

export default LichSuScreen

const styles = StyleSheet.create({
    lineItemChuong: {
        width: '100%',
        height: 1.5,
        backgroundColor: 'grey',
        opacity: 0.2
        // elevation: 2,
    },
    pointRadioButton: {
        width: 16,
        height: 16,
        borderWidth: 1.5,
        borderRadius: 30,
        backgroundColor: 'tomato',
        borderColor: 'grey',

    },
    boxRadioButton: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 30,
        marginLeft: 10,
        // marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTenChuong: {
        // backgroundColor: 'red',
        width: '85%',
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        lineHeight: 23,
        // backgroundColor: 'red'
    },
    itemChuong: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
        marginHorizontal: 10,
    },
    textTheloai: {
        color: '#222',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '400',
        textAlignVertical: 'center',
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: 6,
        marginVertical: 10,
        padding: 6,
        borderColor: 'grey',
    },
    iconBack: {
        position: 'absolute',
        left: 10,
        top: 20,
    },
    textXoaTruyen: {
        color: 'tomato',
        fontWeight: '600',
    },
    boxXoaTruyen: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.6)',
        bottom: 0,
        width: '100%',
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textChapterTruyen: {
        color: '#222',
        fontSize: 13,
        fontWeight: '400',
        width: '100%',
    },
    boxChapterTruyen: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16,
        marginTop: 4,
    },
    textNameTruyen: {
        color: '#222',
        fontSize: 14,
        fontWeight: '500',
        width: '100%',
        textTransform: 'capitalize',
    },
    boxNameTruyen: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    imageTruyen: {
        width: '100%',
        aspectRatio: 0.68,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    containerItemTruyen: {
        width: '32.4%',
        marginHorizontal: 2,
        marginVertical: 8,
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
        // marginBottom: 3,
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
});