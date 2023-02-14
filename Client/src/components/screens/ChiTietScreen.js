import { StyleSheet, Text, View, Image, Pressable, FlatList, ToastAndroid, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-native-paper';
import { ApiContext } from '../contexts/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import moment from 'moment';
const ChiTietScreen = (props) => {
    const { navigation, route: { params: { id } } } = props;
    const { onGetOneTruyenById, onGetListChuongByIdTruyen,
        onGetListTheLoaiByIdTruyen, onGetListTacGiaByIdTruyen,
        onAddTheoDoi, onKiemTraTheoDoi, onDeleteTheoDoi, onAddLuotXem,
        onAddDanhGia, onKiemTraDanhGia, onUpdateDanhGia, onKiemTraLichSuXemChuong, onKiemTraLichSu } = useContext(ApiContext);

    const [kiemTraTheoDoi, setKiemTraTheoDoi] = useState(false);
    const [kiemTraDanhGia, setKiemTraDanhGia] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowXemThem, setIsShowXemThem] = useState(false);
    const [rating, setRating] = useState(0);
    const [oneTruyen, setOneTruyen] = useState({});
    const [listChuongByIdTruyen, setListChuongByIdTruyen] = useState([]);
    const [listTheLoaiByIdTruyen, setListTheLoaiByIdTruyen] = useState([]);
    const [listTacGiaByIdTruyen, setListTacGiaByIdTruyen] = useState([]);
    const [nguoidung, setNguoidung] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);


    async function fetchData() {
        try {
            AsyncStorage.getItem('nguoidung')
                .then(async value => {
                    const myObject = JSON.parse(value);
                    setNguoidung(myObject);
                    if (myObject == null) {
                        setIsLogin(false);
                        const response2 = await onGetListChuongByIdTruyen(id, 0);
                        setListChuongByIdTruyen(response2.results);
                    } else {
                        setIsLogin(true);
                        const response2 = await onGetListChuongByIdTruyen(id, myObject.id);
                        setListChuongByIdTruyen(response2.results);
                        const response5 = await onKiemTraTheoDoi(myObject.id, id);
                        const response6 = await onKiemTraDanhGia(myObject.id, id);
                        setKiemTraTheoDoi(response5.results);
                        setKiemTraDanhGia(response6.results);
                        if (response6.results != false) {
                            setRating(response6.danhgia.sosao);
                        }
                    }
                });

            const response3 = await onGetListTheLoaiByIdTruyen(id);
            const response4 = await onGetListTacGiaByIdTruyen(id);
            setListTheLoaiByIdTruyen(response3.results);
            setListTacGiaByIdTruyen(response4.results);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id]);

    async function fetchData2() {
        try {
            const response1 = await onGetOneTruyenById(id);
            setOneTruyen(response1.results);
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        fetchData2();

    }, [isRefresh])

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

    const onFormatDate2 = (date) => {
        var dateCurent = new Date();
        var d = new Date(date);
        var timeFormat = new Date(dateCurent - d);
        if (d && timeFormat < 3600000 && timeFormat > 0) {
            var minute = (timeFormat / 60000).toFixed(0);
            return minute + ' phút trước';
        }
        else if (d && timeFormat < 86400000 && timeFormat > 0) {
            var hours = (timeFormat / 3600000).toFixed(0);
            return hours + ' giờ trước';
        } else if (d && timeFormat < 2592000000) {
            var date = (timeFormat / 86400000).toFixed(0);
            return date + ' ngày trước';
        }
        else if (d && timeFormat > 2592000000) {
            var date = d.getDate();
            var month = d.getMonth() + 1;
            var year = d.getFullYear();
            const dateString = date.toString().padStart(2, "0") + '/' + month.toString().padStart(2, "0") + '/' + year;
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
        } else {
            return '0';
        }
    }

    const deleteTheoDoi = async () => {
        if (isLogin == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        }
        const response = await onDeleteTheoDoi(nguoidung.id, id);
        if (response.results) {
            setKiemTraTheoDoi(false);
            ToastAndroid.show('Bỏ theo dõi thành công', ToastAndroid.CENTER);
            setIsRefresh(!isRefresh);

        }
    }

    const addTheoDoi = async () => {
        if (isLogin == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        }
        const response = await onAddTheoDoi(nguoidung.id, id);
        setKiemTraTheoDoi(true);
        ToastAndroid.show('Theo dõi thành công', ToastAndroid.CENTER);
        setIsRefresh(!isRefresh);

    }
    const addDanhGia = async () => {
        if (isLogin == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        }
        if (kiemTraDanhGia == false) {
            const response = await onAddDanhGia(nguoidung.id, id, rating);
        } else if (kiemTraDanhGia != false) {
            const response = await onUpdateDanhGia(nguoidung.id, id, rating);
        }
        setIsShowModal(false);
        setKiemTraDanhGia(true);
        setIsRefresh(!isRefresh);
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

    const addLuotXem = async (idChuong) => {
        let date = new Date();
        moment.locale('vi');
        let formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
        if (isLogin == false) {
            const response = await onAddLuotXem(1, idChuong, formattedDate);
            setIsRefresh(!isRefresh);
        } else {
            const response = await onAddLuotXem(nguoidung.id, idChuong, formattedDate);
            await onKiemTraLichSu(nguoidung.id, oneTruyen.id, idChuong, formattedDate);
            await onKiemTraLichSuXemChuong(nguoidung.id, idChuong);
            setIsRefresh(!isRefresh);
        }
    }

    const renderHeader = () => {
        return (
            <View>
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
                            <Pressable key={index} style={styles.itemTacGia} onPress={() => navigation.navigate('TruyenTheoLoaiScreen', { tacgia: item, theloai: null })}>
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
                            <Pressable key={index} style={styles.itemTacGia} onPress={() => navigation.navigate('TruyenTheoLoaiScreen', { tacgia: null, theloai: item })}>
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
                <Pressable style={styles.btDocTuDau} onPress={() => navigation.navigate('ChiTietChuongScreen', { id: listChuongByIdTruyen[listChuongByIdTruyen.length - 1].id, index: listChuongByIdTruyen.length - 1 })}>
                    <Text style={styles.textTheoDoi}>Đọc từ đầu</Text>
                </Pressable>
                <View style={styles.boxNoiDung}>
                    <View style={styles.boxIconNoiDung}>
                        <MaterialCommunityIcons name="content-save-outline" size={24} color="#1181b3" />
                        <Text style={styles.textIconNoiDung}>Nội dung</Text>
                    </View>
                    <View style={styles.lineNoiDung}></View>
                    <View>
                        {
                            isShowXemThem === false ?
                                <View>
                                    <Text style={styles.textAPINoiDung} numberOfLines={3}>{oneTruyen.mota}</Text>
                                    <Pressable onPress={() => setIsShowXemThem(true)}>
                                        <Text style={styles.textXemThemNoiDung}>Xem thêm</Text>
                                    </Pressable>
                                </View>
                                :
                                <View>
                                    <Text style={styles.textAPINoiDung}>{oneTruyen.mota}</Text>
                                    <Pressable onPress={() => setIsShowXemThem(false)}>
                                        <Text style={styles.textXemThemNoiDung}>Rút gọn</Text>
                                    </Pressable>
                                </View>
                        }
                    </View>
                    <View style={styles.boxIconNoiDung}>
                        <Ionicons name="list" size={24} color="#1181b3" />
                        <Text style={styles.textIconNoiDung}>Danh sách chương</Text>
                    </View>
                    <View style={styles.lineDanhSachChuong}></View>

                </View>

            </View>
        )
    }
    const renderItem = ({ item, index }) => (
        <Pressable key={item.id} onPress={() => { addLuotXem(item.id); navigation.navigate('ChiTietChuongScreen', { id: item.id, index: index }) }}>
            <View style={styles.boxChuongItem}>
                <View style={styles.boxTextChuongItem}>
                    {
                        item.idnguoidung_da_doc !== null ?
                            <Text style={styles.textTenChuongItem2}>Chapter {item.sochuong}</Text>
                            :
                            <Text style={styles.textTenChuongItem}>Chapter {item.sochuong}</Text>
                    }
                    <View style={styles.boxDateChuongItem}>
                        <AntDesign name="clockcircleo" size={10} color="#777" />
                        <Text style={styles.textDateChuongItem}> {onFormatDate2(item.ngaycapnhat)}</Text>
                    </View>
                </View>
                <View style={styles.boxTongLuotXemChuongItem}>
                    <FontAwesome name="eye" size={15} color="#777" />
                    <Text style={styles.textTongLuotXemChuongItem}> {onFormatLuotXem(item.tongsoluot)}</Text>
                </View>
            </View>

            <View>
                <Text numberOfLines={1} style={styles.lineChuongItem}>-  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.boxIconTop}>
                <Pressable style={styles.iconBack} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="black" />
                </Pressable>
                <Pressable style={styles.iconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                    <EvilIcons name="search" size={34} color="black" />
                </Pressable>
            </View>
            <FlatList style={styles.flatChuong}
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
    lineChuongItem: {
        color: '#777',
        fontWeight: '200',
        textAlign: 'center',
    },
    textTongLuotXemChuongItem: {
        fontSize: 14,
        color: '#777',
        fontWeight: '400',
    },
    boxTongLuotXemChuongItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textDateChuongItem: {
        fontSize: 12,
        color: '#777',
        fontWeight: '400',
    },
    boxDateChuongItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTenChuongItem2: {
        fontSize: 15,
        color: '#999',
        fontWeight: '400',
    },
    textTenChuongItem: {
        fontSize: 15,
        color: '#222',
        fontWeight: '400',
    },
    boxTextChuongItem: {

    },
    boxChuongItem: {
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lineDanhSachChuong: {
        width: '95%',
        height: 2,
        backgroundColor: '#1181b3',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    textXemThemNoiDung: {
        fontSize: 15,
        color: '#1181b3',
        fontWeight: '400',
        marginHorizontal: 10,
        marginBottom: 10,

    },
    textAPINoiDung: {
        fontSize: 15,
        color: '#333',
        fontWeight: '400',
        marginHorizontal: 10,
        marginTop: 6,
        lineHeight: 20,
    },
    lineNoiDung: {
        width: '95%',
        height: 2,
        backgroundColor: '#1181b3',
        marginHorizontal: 10,
    },
    textIconNoiDung: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#1181b3',
        fontWeight: '300',
    },
    boxIconNoiDung: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    boxNoiDung: {

    },
    btDocTuDau: {
        flexDirection: 'row',
        backgroundColor: '#f0ad4e',
        height: 35,
        width: 110,
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 10,
        borderRadius: 5,
        justifyContent: 'center',
        marginVertical: 10,
    },
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
        // height: 250,
        aspectRatio: 0.82,
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
        // backgroundColor: 'tomato',
    },
    container: {
        backgroundColor: 'white',
        height: '100%'
    }
})