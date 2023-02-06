import { StyleSheet, Text, View, Image, Pressable, FlatList, ToastAndroid, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, Portal, Provider, Modal } from 'react-native-paper';
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
const ChiTietScreen = (props) => {
    const { navigation, route: { params: { id } } } = props;
    const { onGetOneTruyenById, onGetListChuongByIdTruyen,
        onGetListTheLoaiByIdTruyen, onGetListTacGiaByIdTruyen,
        onAddTheoDoi, onKiemTraTheoDoi, onDeleteTheoDoi,
        onAddDanhGia, onKiemTraDanhGia, onUpdateDanhGia } = useContext(ApiContext);

    const [kiemTraTheoDoi, setKiemTraTheoDoi] = useState(false);
    const [kiemTraDanhGia, setKiemTraDanhGia] = useState(false);
    const [oneTruyen, setOneTruyen] = useState({});
    const [listChuongByIdTruyen, setListChuongByIdTruyen] = useState([]);
    const [listTheLoaiByIdTruyen, setListTheLoaiByIdTruyen] = useState([]);
    const [listTacGiaByIdTruyen, setListTacGiaByIdTruyen] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);

    const [rating, setRating] = useState(0);
    async function fetchData() {
        try {
            const response1 = await onGetOneTruyenById(id);
            const response2 = await onGetListChuongByIdTruyen(id);
            const response3 = await onGetListTheLoaiByIdTruyen(id);
            const response4 = await onGetListTacGiaByIdTruyen(id);
            const response5 = await onKiemTraTheoDoi(4, id);
            const response6 = await onKiemTraDanhGia(4, id);

            setOneTruyen(response1.results);
            setListChuongByIdTruyen(response2.results);
            setListTheLoaiByIdTruyen(response3.results);
            setListTacGiaByIdTruyen(response4.results);
            setKiemTraTheoDoi(response5.results);
            setKiemTraDanhGia(response6.results);
            if (kiemTraDanhGia != false) {
                setRating(response6.danhgia.sosao);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id, kiemTraTheoDoi, kiemTraDanhGia]);

    const onFormatDate = (date) => {
        var d = new Date(date);
        if (d) {
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            var hours = d.getHours();
            var minutes = d.getMinutes();
            const dateString = 'Cập nhật lúc: ' + hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0") + ' ' + date.toString().padStart(2, "0") + '/' + month.toString().padStart(2, "0") + '/' + year;
            return dateString;
        }
    }

    const onFormatTinhTrang = (tinhtrang) => {
        if (tinhtrang && tinhtrang == 1) {
            return 'Đang tiến hành';
        } else if (tinhtrang && tinhtrang == 1) {
            return 'Hoàn thành';
        }
    }

    const onFormatLuotXem = (luotxem) => {
        if (luotxem) {
            return luotxem.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
    }

    const deleteTheoDoi = async () => {
        const response = await onDeleteTheoDoi(4, id);
        if (response.results) {
            setKiemTraTheoDoi(false);
            ToastAndroid.show('Bỏ theo dõi thành công', ToastAndroid.CENTER);
        }

    }

    const addTheoDoi = async () => {
        const response = await onAddTheoDoi(4, id);
        setKiemTraTheoDoi(true);
        ToastAndroid.show('Theo dõi thành công', ToastAndroid.CENTER);

    }
    const addDanhGia = async () => {
        if (kiemTraDanhGia == false) {
            const response = await onAddDanhGia(4, id, rating);
        } else if (kiemTraDanhGia != false) {
            const response = await onUpdateDanhGia(4, id, rating);
        }
        setIsShowModal(false);
        setKiemTraDanhGia(false);
        ToastAndroid.show('Đánh giá thành công', ToastAndroid.CENTER);
    }

    const onAlertDeleteTheoDoi = () =>
        Alert.alert(
            "Thông báo",
            "Bạn có chắc bỏ theo dõi không?",
            [
                {
                    text: "Không",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Có", onPress: () => deleteTheoDoi() }
            ]
        );

    const renderHeader = () => {
        return (
            <View>
                <View style={styles.boxIconTop}>
                    <Pressable style={styles.iconBack} onPress={() => navigation.pop()}>
                        <Ionicons name="return-down-back-outline" size={28} color="black" />
                    </Pressable>
                    <Pressable style={styles.iconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                        <EvilIcons name="search" size={34} color="black" />
                    </Pressable>
                </View>
                <View style={styles.boxThongTin}>
                    <Text style={styles.textTenTruyen}>{oneTruyen.tentruyen}</Text>
                    <Text style={styles.textCapNhat}>[{onFormatDate(oneTruyen.ngaycapnhat)}]</Text>
                    <Image style={styles.imgTruyen} source={{ uri: oneTruyen.imagelink }}></Image>
                </View>
                <View style={styles.boxTenKhac}>
                    <View style={styles.iconTenKhac}>
                        <FontAwesome style={styles.iconStyle} name="plus" size={16} color="#777" />
                        <Text style={styles.textTenKhac}>Tên khác</Text>
                    </View>
                    <Text style={styles.textAPITenKhac}>{oneTruyen.tenkhac}</Text>

                </View>
                <View style={styles.boxTenKhac}>
                    <View style={styles.iconTenKhac}>
                        <Ionicons style={styles.iconStyle} name="person" size={16} color="#777" />
                        <Text style={styles.textTenKhac}>Tác giả</Text>
                    </View>
                    <View style={styles.boxTacGia}>
                        {listTacGiaByIdTruyen.map((item, index) => (
                            <Pressable key={index} style={styles.itemTacGia} onPress={() => navigation.navigate('TimKiemScreen', { id: item.id })}>
                                <Text style={styles.textAPITenTacGia}>
                                    {item.tentacgia}
                                    {index === listTacGiaByIdTruyen.length - 1 ? '' : ' - '}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                </View>
                <View style={styles.boxTenKhac}>
                    <View style={styles.iconTenKhac}>
                        <Fontisto style={styles.iconStyle} name="wifi" size={12} color="#777" />
                        <Text style={styles.textTenKhac}>Tình trạng</Text>
                    </View>
                    <Text style={styles.textAPITenKhac}>{onFormatTinhTrang(oneTruyen.tinhtrang)}</Text>
                </View>
                <View style={styles.boxTenKhac}>
                    <View style={styles.iconTenKhac}>
                        <AntDesign style={styles.iconStyle} name="tags" size={16} color="#777" />
                        <Text style={styles.textTenKhac}>Thể loại</Text>
                    </View>
                    <View style={styles.boxTacGia}>
                        {listTheLoaiByIdTruyen.map((item, index) => (
                            <Pressable key={index} style={styles.itemTacGia} onPress={() => navigation.navigate('TimKiemScreen', { id: item.id })}>
                                <Text style={styles.textAPITenTacGia}>
                                    {item.tentheloai}
                                    {index === listTheLoaiByIdTruyen.length - 1 ? '' : ' - '}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
                <View style={styles.boxTenKhac}>
                    <View style={styles.iconTenKhac}>
                        <FontAwesome style={styles.iconStyle} name="eye" size={16} color="#777" />
                        <Text style={styles.textTenKhac}>Lượt Xem</Text>
                    </View>
                    <Text style={styles.textAPITenKhac}>{onFormatLuotXem(oneTruyen.tongluotxem)}</Text>
                </View>
                <View style={styles.boxXepHang}>
                    <Pressable onPress={() => setIsShowModal(true)}>
                        <Text style={styles.textDanhGiaXepHang}>Đánh giá: </Text>

                    </Pressable>
                    <Text style={styles.textDanhGia}>{oneTruyen.sosaotrungbinh}/5 - {oneTruyen.tongdanhgia} lượt đánh giá</Text>
                </View>
                <View style={styles.boxTheoDoi}>
                    {
                        kiemTraTheoDoi === true ?

                            <Pressable style={styles.btTheoDoi2} onPress={() => onAlertDeleteTheoDoi()}>
                                <Entypo name="heart" size={20} color="white" />
                                <Text style={styles.textTheoDoi}>Bỏ theo dõi</Text>
                            </Pressable>
                            :

                            <Pressable style={styles.btTheoDoi1} onPress={() => addTheoDoi()}>
                                <Entypo name="heart" size={20} color="white" />
                                <Text style={styles.textTheoDoi}>Theo dõi</Text>
                            </Pressable>
                    }


                    <View style={styles.boxAPITheoDoi}>
                        <Text style={styles.textAPITheoDoi}>{onFormatLuotXem(oneTruyen.tongtheodoi)}</Text>
                        <Text style={styles.textLuotTheoDoi}> Lượt theo dõi</Text>
                    </View>
                </View>
            </View>
        )
    }
    const renderItem = ({ item }) => (

        <Pressable key={item.id} >
            <Text>{item.tenchuong}</Text>
            <Text>//////</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>

            <FlatList style={styles.flatAllTruyen}
                data={listChuongByIdTruyen}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
            />

            <Modal animationType="fade" visible={isShowModal} onDismiss={() => setIsShowModal(false)}>
                <View style={styles.boxModal}>
                    <Text style={styles.textTopModalRate}>Đánh giá của bạn là {rating}★</Text>

                    <View style={styles.boxStart}>
                        {[1, 2, 3, 4, 5].map(value => {
                            return (
                                <View style={styles.modalRateItem} key={value}>
                                    <Pressable style={styles.boxItemStart}
                                        onPress={() => setRating(value)}
                                    >
                                        <Text style={{ fontSize: 50, color: value <= rating ? 'tomato' : 'gray' }}>★</Text>
                                    </Pressable>

                                </View>

                            );
                        })}
                    </View>
                    <Pressable onPress={() => addDanhGia()} style={styles.btModalRate}>
                        <Text style={styles.textSubmit}>Đánh giá</Text>
                    </Pressable>
                    <Pressable onPress={() => setIsShowModal(false)}>
                        <Text style={styles.texHuyModalRate}>Hủy</Text>
                    </Pressable>
                </View>
            </Modal>


        </View>

    );
}

export default ChiTietScreen

const styles = StyleSheet.create({

    textDanhGiaXepHang: {
        textAlign: 'right',
        color: '#1181b3',

    },
    boxXepHang: {
        flexDirection: 'row',
        width: '98%',
        justifyContent: 'flex-end',
        alignContent: 'center',
    },
    // 
    texHuyModalRate: {
        fontSize: 16,
        fontWeight: '600',
        color: 'grey',
        marginTop: 10,
        marginBottom: 20,
    },
    textSubmit: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',

    },
    btModalRate: {
        backgroundColor: '#63bf75',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 4,
    },
    boxItemStart: {

    },
    textTopModalRate: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    modalRateItem: {

    },
    boxStart: {
        flexDirection: 'row',
    },
    boxModal: {
        width: 300,
        backgroundColor: 'white',
        alignSelf: 'center',
        // justifyContent: 'center',
        borderRadius: 2,
        alignItems: 'center',
    },
    // 
    textLuotTheoDoi: {
        fontSize: 16,
        fontWeight: '400',
        color: '#777',
    },
    textAPITheoDoi: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    boxAPITheoDoi: {
        marginLeft: 16,
        flexDirection: 'row',
    },
    textTheoDoi: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
    },
    btTheoDoi2: {
        flexDirection: 'row',
        backgroundColor: 'tomato',
        height: 35,
        width: 110,
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    btTheoDoi1: {
        flexDirection: 'row',
        backgroundColor: '#63bf75',
        height: 35,
        width: 110,
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    boxTheoDoi: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textDanhGia: {
        // width: '98%',
        textAlign: 'right',
        color: '#777',

    },
    textAPITenTacGia: {
        fontSize: 16,
        fontWeight: '400',
        color: '#1181b3',
    },
    boxTacGia: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '65%'
    },
    iconStyle: {
        marginTop: 3,
    },
    textAPITenKhac: {
        fontSize: 16,
        fontWeight: '400',
        color: '#777',
        width: '65%',
    },
    textTenKhac: {
        marginLeft: 6,
        fontSize: 16,
        fontWeight: '400',
        color: '#777',
    },
    iconTenKhac: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '30%',

    },
    boxTenKhac: {
        marginHorizontal: 10,
        width: '100%',
        flexDirection: 'row',
        marginVertical: 6,
    },
    imgTruyen: {
        width: '50%',
        height: 250,
        marginVertical: 16,
    },
    textCapNhat: {
        fontSize: 14,
        fontWeight: '400',
        color: '#777',
        marginHorizontal: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    textTenTruyen: {
        fontSize: 21,
        fontWeight: '600',
        color: '#222',
        textTransform: 'uppercase',
        marginHorizontal: 10,
        textAlign: 'center',
    },
    boxThongTin: {
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 26,
    },
    iconSearch: {
        position: 'absolute',
        right: 0,
    },
    iconBack: {
    },
    boxIconTop: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 26,
    },
    container: {
        backgroundColor: 'white',
        height: '100%'
    }
})