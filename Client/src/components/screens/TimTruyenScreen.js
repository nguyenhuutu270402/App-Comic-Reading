import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Pressable, TextInput, RefreshControl, Dimensions } from 'react-native'
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';



const TimTruyenScreen = (props) => {
    const { navigation } = props;
    const { onGetListTheLoai } = useContext(ApiContext);
    const [listTheLoai, setListTheLoai] = useState([]);
    const [listTenTheLoaiChon, setListTenTheLoaiChon] = useState([]);
    const [listTenTheLoaiKhongChon, setListTenTheLoaiKhongChon] = useState([]);

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


    const pickSelects = (tenTheLoaiSelected) => {

        if (listTenTheLoaiChon.includes(tenTheLoaiSelected) === false && listTenTheLoaiKhongChon.includes(tenTheLoaiSelected) === false) {
            setListTenTheLoaiChon(tenTheLoais => tenTheLoais.concat(tenTheLoaiSelected));
            return;
        } else if (listTenTheLoaiChon.includes(tenTheLoaiSelected) === true && listTenTheLoaiKhongChon.includes(tenTheLoaiSelected) === false) {
            setListTenTheLoaiChon(listTenTheLoaiChon.filter(tenTheLoai => tenTheLoai !== tenTheLoaiSelected));
            setListTenTheLoaiKhongChon(tenTheLoais => tenTheLoais.concat(tenTheLoaiSelected));
            return;
        }
        else if (listTenTheLoaiChon.includes(tenTheLoaiSelected) === true && listTenTheLoaiKhongChon.includes(tenTheLoaiSelected) === true) {
            console.log('cai qq j z');
            return;
        }
        else if (listTenTheLoaiChon.includes(tenTheLoaiSelected) === false && listTenTheLoaiKhongChon.includes(tenTheLoaiSelected) === true) {
            setListTenTheLoaiKhongChon(listTenTheLoaiKhongChon.filter(tenTheLoai => tenTheLoai !== tenTheLoaiSelected));
            return;
        }
    }

    const onTimTruyen = () => {
        var midleQuery =
            ` group by truyen.id 
        having GROUP_CONCAT(DISTINCT theloai.tentheloai SEPARATOR ',')  like '%%' `;
        if (listTenTheLoaiChon.length > 0) {
            for (let index = 0; index < listTenTheLoaiChon.length; index++) {
                const element = listTenTheLoaiChon[index];
                midleQuery = midleQuery + ` and GROUP_CONCAT(DISTINCT theloai.tentheloai SEPARATOR ',') like '%${element}%' `
            }
        }
        if (listTenTheLoaiKhongChon.length > 0) {
            for (let index = 0; index < listTenTheLoaiKhongChon.length; index++) {
                const element = listTenTheLoaiKhongChon[index];
                midleQuery = midleQuery + ` and GROUP_CONCAT(DISTINCT theloai.tentheloai SEPARATOR ',') not like '%${element}%' `
            }
        }
        navigation.navigate('KetQuaTimTruyenScreen', { midleQuery: midleQuery });
    }
    const renderHeader = () => {
        return (
            <View style={styles.containerHeader}>
                <View style={styles.containerHeaderItem}>
                    <View style={styles.boxCheckHeader} >
                        <Entypo name="check" size={20} color="#339966" />
                    </View>
                    <Text style={styles.textCheckHeader}>Tìm trong những thể loại này</Text>
                </View>
                <View style={styles.containerHeaderItem}>
                    <View style={styles.boxCheckHeader} >
                        <Ionicons name="close" size={20} color="red" />
                    </View>
                    <Text style={styles.textCheckHeader}>Loại trừ những thể loại này</Text>
                </View>
                <View style={styles.containerHeaderItem}>
                    <View style={styles.boxCheckHeader} >
                    </View>
                    <Text style={styles.textCheckHeader}>Có thể thuộc hoặc không thuộc thể loại này</Text>
                </View>
                <View style={styles.boxTimKiem}>
                    <TouchableOpacity style={styles.btTimKiem} onPress={() => onTimTruyen()}>
                        <Text style={styles.textTimkiem}>Tìm truyện</Text>
                    </TouchableOpacity >
                </View>

            </View>
        )
    }

    const renderItem = ({ item }) => (
        <Pressable key={item.id} style={styles.containerItem} onPress={() => pickSelects(item.tentheloai)}>
            <View style={styles.boxCheck}>
                {listTenTheLoaiChon.includes(item.tentheloai) &&
                    <Entypo name="check" size={20} color="#339966" />
                }
                {listTenTheLoaiKhongChon.includes(item.tentheloai) &&
                    <Ionicons name="close" size={20} color="red" />
                }
            </View>
            <Text style={styles.textItem}>{item.tentheloai}</Text>
        </Pressable>
    );
    return (
        <View style={styles.container}>
            <View style={styles.boxHeader} >
                <Text style={styles.txtHeader}>Tìm truyện</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="#222" />
                </TouchableOpacity>
                <View style={styles.boxHeaderShadow}></View>
            </View>

            <FlatList
                data={listTheLoai}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
            />



        </View>

    );
}

export default TimTruyenScreen

const styles = StyleSheet.create({
    textCheckHeader: {
        color: '#444',
        fontSize: 15,
    },
    boxCheckHeader: {
        borderWidth: 2,
        borderColor: 'grey',
        width: 25,
        height: 25,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerHeaderItem: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        maxWidth: '80%',
    },
    textTimkiem: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600'
    },
    btTimKiem: {
        width: 100,
        height: 40,
        backgroundColor: '#339966',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 6,
    },
    boxTimKiem: {
        width: '100%',
        alignItems: 'flex-end',
    },
    containerHeader: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    textItem: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
    iconCheck: {
        color: 'red',
        fontSize: 16,
        fontWeight: '800',
    },
    boxCheck: {
        borderWidth: 2,
        borderColor: 'grey',
        width: 25,
        height: 25,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '40%',
        marginHorizontal: 30,
        marginVertical: 10,
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
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
})