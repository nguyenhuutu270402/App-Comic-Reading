import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';
import { Modal } from 'react-native-paper';

const XepHangScreen = (props) => {
    const { navigation } = props;
    const { onLayListTruyenTheoLoai } = useContext(ApiContext);
    const [listTruyen, setListtruyen] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);

    const listSwap = [
        {
            id: 1,
            swap: 'Từ trước đến nay',
        },
        {
            id: 2,
            swap: 'Theo ngày',
        },
        {
            id: 3,
            swap: 'Theo tuần',
        },
        {
            id: 4,
            swap: 'Theo tháng',
        },
        {
            id: 5,
            swap: 'Theo năm',
        },
    ]

    async function fetchData() {
        try {
            var qr = `
            GROUP BY truyen.id
            ORDER BY COUNT(DISTINCT luotxem.id) DESC`
            const response = await onLayListTruyenTheoLoai(qr);
            setListtruyen(response.results);
            setSelectedValue(1);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const onFormatLuotXem = (luotxem) => {
        if (luotxem) {
            return luotxem.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
            return '0';
        }
    }
    const getBackgroundColor = (index) => {
        if (index === 0) {
            return 'rgba(30,129,196,0.7)';
        } else if (index === 1) {
            return '#a4ce3c';
        } else if (index === 2) {
            return '#fbc908';
        } else {
            return '#d4d4d2';
        }
    }
    const renderItem = ({ item, index }) => (
        <TouchableOpacity key={item.id} onPress={() => navigation.push('ChiTietScreen', { id: item.id })} >
            <View style={[styles.containerItemTruyen, { backgroundColor: getBackgroundColor(index) }]}>
                <Image style={styles.imageTruyen} source={{ uri: item.imagelink }}></Image>
                <View style={styles.boxNameTruyen}>
                    <Text numberOfLines={1} style={styles.textNameTruyen}>{item.tentruyen}</Text>
                    <View style={styles.boxLuotXemTruyen}>
                        <Text style={styles.textLuotXemTruyen}><FontAwesome name="eye" size={15} color="#333" /> {onFormatLuotXem(item.tongluotxem)} Lượt xem</Text>
                    </View>
                    <Text numberOfLines={4} style={styles.textMoTaTruyen}>{item.mota}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
    const onSwapType = async (key) => {
        try {
            if (key == 1) {
                var qr = `
                GROUP BY truyen.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 2) {
                var qr = `where luotxem.ngayxem >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                GROUP BY truyen.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 3) {
                var qr = `where luotxem.ngayxem >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                GROUP BY truyen.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 4) {
                var qr = `where luotxem.ngayxem >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                GROUP BY truyen.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 5) {
                var qr = `where luotxem.ngayxem >= DATE_SUB(NOW(), INTERVAL 365 DAY)
                GROUP BY truyen.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            }

        } catch (error) {
            console.error(error);

        }
    }


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

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Xếp hạng</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => setIsShowModal(true)}>
                    <AntDesign name="swap" size={26} color="black" />
                </TouchableOpacity>
                <View style={styles.boxHeaderShadow}></View>
            </View>
            <FlatList
                data={listTruyen}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
                refreshControl={
                    < RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <Modal animationType="fade" visible={isShowModal} onDismiss={() => setIsShowModal(false)}>
                <View style={styles.modalChap}>
                    {listSwap.map(item => {
                        return (
                            <View key={item.id}>
                                <TouchableOpacity style={styles.itemChuong} onPress={() => onSwapType(item.id)}>

                                    <Text style={styles.textTenChuong}>{item.swap}</Text>
                                    <View style={styles.boxRadioButton}>
                                        {
                                            selectedValue === item.id ?
                                                <View style={styles.pointRadioButton} />
                                                :
                                                <View />
                                        }
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.lineItemChuong}></View>
                            </View>
                        );
                    })}

                </View>

            </Modal>
        </View>

    );
}

export default XepHangScreen

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    textTenChuong: {
        width: '85%',
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        lineHeight: 23,
    },
    itemChuong: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
        marginHorizontal: 10,
    },
    modalChap: {
        width: '90%',
        backgroundColor: 'white',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        minHeight: '30%'
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
    textDateTruyen: {
        color: 'white',
        fontSize: 11,
        textAlign: 'center',
        fontWeight: '500',
        height: '100%',
        textAlignVertical: 'center',
    },
    boxDateTruyen: {
        position: 'absolute',
        backgroundColor: 'tomato',
        top: 6,
        left: 6,
        borderRadius: 10,
        width: 75,
        height: 18,
    },
    textChapterTruyen: {
        color: '#222',
        fontSize: 13,
        fontWeight: '400',
        width: '100%',
    },
    textMoTaTruyen: {
    },
    boxLuotXemTruyen: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    textLuotXemTruyen: {
        color: 'white',
        fontSize: 13,
        borderRadius: 10,
        height: 20,
        backgroundColor: 'tomato',
        textAlignVertical: 'center',
        paddingHorizontal: 10,
        // backgroundColor: 'cyan'
    },
    textNameTruyen: {
        color: '#222',
        fontSize: 14,
        fontWeight: '500',
        width: '100%',
        textTransform: 'capitalize',
    },
    boxNameTruyen: {
        width: '67%',
        // backgroundColor: 'red',
        aspectRatio: 2,

    },
    imageTruyen: {
        width: '30%',
        aspectRatio: 0.9,
        borderRadius: 2,
        marginRight: '2.5%',
    },
    containerItemTruyen: {
        width: '95%',
        marginTop: 16,
        flexDirection: 'row',
        backgroundColor: 'rgba(212,212,210,1)',
        borderRadius: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5%',
    },
    textChuaDangNhap: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 16,
    },
    boxChuaDangNhap: {
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',
    },
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