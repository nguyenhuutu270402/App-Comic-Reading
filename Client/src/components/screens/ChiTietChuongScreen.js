import {
    StyleSheet, Text, View, Image, Pressable, FlatList, ToastAndroid, Alert, Dimensions,
    StatusBar, ScrollView, TextInput
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { Modal } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ChiTietChuongScreen = (props) => {
    const { navigation, route: { params: { id, index } } } = props;
    const currentIndex = index;
    const { onGetListImageChuongByIdChuong, onGetListChuongByIdTruyen, onGetOneChuongById,
        onAddTheoDoi, onKiemTraTheoDoi, onDeleteTheoDoi, onAddLuotXem, onGetTongBinhLuanByIdTruyen,
        onAddBinhLuan, onGetListBinhLuanByIdTruyen, onKiemTraLichSuXemChuong, onKiemTraLichSu } = useContext(ApiContext);
    const [listImage, setListImage] = useState([]);
    const dimensionsWidth = Dimensions.get('screen').width;
    const [listChuongByIdTruyen, setListChuongByIdTruyen] = useState([]);

    const [aspectRatio, setAspectRatio] = useState(0.1);
    const [isShowMore, setIsShowMore] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModal2, setIsShowModal2] = useState(false);
    const [oneChuong, setOneChuong] = useState({});
    const [kiemTraTheoDoi, setKiemTraTheoDoi] = useState(false);
    const [nguoidung, setNguoidung] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);
    const flatListRef = useRef(null);
    const [tongBinhLuan, setTongBinhLuan] = useState(0);
    const [listBinhLuan, setListBinhLuan] = useState([]);
    const [noiDungBinhLuan, setNoiDungBinhLuan] = useState('');


    async function fetchData() {
        try {
            const response1 = await onGetListImageChuongByIdChuong(id);
            const response2 = await onGetOneChuongById(id);
            setListImage(response1.results);
            setOneChuong(response2.results);

            AsyncStorage.getItem('nguoidung')
                .then(async value => {
                    const myObject = JSON.parse(value);
                    setNguoidung(myObject);
                    if (myObject == null) {
                        setIsLogin(false);
                        const response3 = await onGetListChuongByIdTruyen(response2.results.idtruyen, 0);
                        setListChuongByIdTruyen(response3.results);
                    } else {
                        setIsLogin(true);
                        const response4 = await onKiemTraTheoDoi(myObject.id, response2.results.idtruyen);
                        const response3 = await onGetListChuongByIdTruyen(response2.results.idtruyen, myObject.id);
                        setListChuongByIdTruyen(response3.results);
                        setKiemTraTheoDoi(response4.results);
                    }
                });


            const response4 = await onGetTongBinhLuanByIdTruyen(response2.results.idtruyen);
            setTongBinhLuan(response4.results);
            const response5 = await onGetListBinhLuanByIdTruyen(response2.results.idtruyen);
            setListBinhLuan(response5.results);

            // set up witdh cho ảnh
            var getMidImage = Math.round(response1.results.length / 2);
            Image.getSize(response1.results[getMidImage].imagelink, (Width, Height) => {
                setAspectRatio(Width / Height);
            }, (errorMsg) => {
                console.log(errorMsg);
            });
            setSelectedValue(id);
        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        scrollToItem();
    }, [isShowModal]);



    const renderHeader = () => {
        return (

            <View style={styles.boxIconTop}>
                <Pressable style={styles.iconBack} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="black" />
                </Pressable>
                <Text style={styles.textTop}>Chapter {oneChuong.sochuong}</Text>
                <Pressable style={styles.iconSearch} onPress={() => setIsShowModal(true)}>
                    <Ionicons name="list" size={28} color="black" />
                </Pressable>

            </View>
        )
    }

    const renderItem = ({ item }) => (
        <View style={styles.imageItem}>
            <Image
                source={{ uri: item.imagelink }}
                style={{
                    width: dimensionsWidth,
                    aspectRatio: aspectRatio,
                }}
                resizeMode="contain"
            />
        </View>

    );

    const renderItemModal = ({ item, index }) => (
        <View>

            <Pressable style={styles.itemChuong} key={item.id} onPress={() => { addLuotXem(item.id); navigation.replace('ChiTietChuongScreen', { id: item.id, index: index }) }}>

                <Text style={styles.textTenChuong} key={item.id}>{item.tenchuong}</Text>
                <View style={styles.boxRadioButton}>
                    {
                        selectedValue === item.id ?
                            <View style={styles.pointRadioButton} />
                            :
                            <View />
                    }
                </View>
            </Pressable>
            <View style={styles.lineItemChuong}></View>
        </View>

    );


    const renderItemModal2 = ({ item }) => (
        <View style={styles.itemModalBinhLuan}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.imageItemModalBinhLuan} />
            <View style={styles.boxTTBinhLuan}>
                <View style={styles.boxTenVaNgay}>
                    <Text numberOfLines={1} style={styles.textTenNguoiBinhLuan}>{item.tennguoidung}</Text>
                    <Text style={styles.textNgayBinhLuan}>{onFormatDate(item.ngaybinhluan)}</Text>
                </View>
                <Text style={styles.textNoiDungNBL}>{item.noidung}</Text>
            </View>
        </View>
    );

    const deleteTheoDoi = async () => {
        if (isLogin == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        }
        const response = await onDeleteTheoDoi(nguoidung.id, oneChuong.idtruyen);
        if (response.results) {
            setKiemTraTheoDoi(false);
            ToastAndroid.show('Bỏ theo dõi thành công', ToastAndroid.CENTER);
        }

    }

    const addTheoDoi = async () => {
        if (isLogin == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        }
        const response = await onAddTheoDoi(nguoidung.id, oneChuong.idtruyen);
        setKiemTraTheoDoi(true);
        ToastAndroid.show('Theo dõi thành công', ToastAndroid.CENTER);

    }

    const onBinhLuan = async () => {
        if (isLogin == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        } else if (nguoidung.tennguoidung == '' || nguoidung.avatar == null) {
            ToastAndroid.show('Cập nhật thông tin tài khoản để sử dụng chức năng này', ToastAndroid.CENTER);
            return;
        } else {
            setIsShowModal2(true);
        }
    }

    const addBinhLuan = async () => {
        if (noiDungBinhLuan.length > 0) {
            let date = new Date();
            moment.locale('vi');
            let formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
            await onAddBinhLuan(nguoidung.id, oneChuong.idtruyen, noiDungBinhLuan, formattedDate);
            setNoiDungBinhLuan('');
            ToastAndroid.show('Bình luận thành công', ToastAndroid.CENTER);
            // lay lai data binhluan
            const response4 = await onGetTongBinhLuanByIdTruyen(oneChuong.idtruyen);
            setTongBinhLuan(response4.results);
            const response5 = await onGetListBinhLuanByIdTruyen(oneChuong.idtruyen);
            setListBinhLuan(response5.results);
            return;
        } else {
            ToastAndroid.show('Chưa có dòng chữ nào :(', ToastAndroid.CENTER);

        }
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
        } else {
            await onKiemTraLichSu(nguoidung.id, oneChuong.idtruyen, idChuong, formattedDate);
            await onKiemTraLichSuXemChuong(nguoidung.id, idChuong);
            const response = await onAddLuotXem(nguoidung.id, idChuong, formattedDate);
        }
    }
    const scrollToItem = async () => {
        try {
            flatListRef.current.scrollToIndex({
                index: currentIndex,
                animated: true,
            });
        } catch (error) {
            console.log('error: ', error);

        }
    };
    const onFormatDate = (date) => {
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
    return (

        <View style={styles.container}>
            <StatusBar barStyle="default" hidden={true} />
            <FlatList
                data={listImage}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onScrollBeginDrag={() => setIsShowMore(false)}
            />

            <View>
                {
                    isShowMore === false ?
                        <Pressable style={styles.iconShow} onPress={() => setIsShowMore(true)}>
                            <AntDesign name="rightcircleo" size={24} color="tomato" />
                        </Pressable>
                        :
                        <View>
                            <View style={styles.boxMoreBottom}>
                                <View style={styles.boxMoreBottom}>
                                    {
                                        currentIndex === listChuongByIdTruyen.length - 1 ?
                                            <View />
                                            :
                                            <Pressable style={styles.truocMoreBottom} onPress={() => { addLuotXem(listChuongByIdTruyen[currentIndex + 1].id); navigation.replace('ChiTietChuongScreen', { id: listChuongByIdTruyen[currentIndex + 1].id, index: currentIndex + 1 }) }}>
                                                <AntDesign name="left" size={20} color="tomato" />
                                                <Text style={styles.texTruocMoreBottom}>Trước</Text>
                                            </Pressable>
                                    }
                                    {
                                        currentIndex === 0 ?
                                            <View />
                                            :
                                            <Pressable style={styles.truocMoreBottom} onPress={() => { addLuotXem(listChuongByIdTruyen[currentIndex - 1].id); navigation.replace('ChiTietChuongScreen', { id: listChuongByIdTruyen[currentIndex - 1].id, index: currentIndex - 1 }) }}>
                                                <Text style={styles.texTruocMoreBottom}>Sau</Text>
                                                <AntDesign name="right" size={20} color="tomato" />
                                            </Pressable>
                                    }
                                    {
                                        kiemTraTheoDoi === false ?
                                            <Pressable style={styles.truocMoreBottom} onPress={() => addTheoDoi()}>

                                                <AntDesign name="hearto" size={24} color="red" />
                                            </Pressable>
                                            :
                                            <Pressable style={styles.truocMoreBottom} onPress={() => onAlertDeleteTheoDoi()}>
                                                <AntDesign name="heart" size={24} color="red" />

                                            </Pressable>
                                    }

                                    <Pressable style={styles.truocMoreBottom} onPress={() => onBinhLuan()}>
                                        <FontAwesome name="commenting-o" size={24} color="tomato" />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.boxMoreTop}>
                                <Pressable style={styles.iconBack} onPress={() => navigation.pop()}>
                                    <AntDesign name="left" size={24} color="black" />
                                </Pressable>
                                <Text style={styles.textTop}>Chapter {oneChuong.sochuong}</Text>
                                <Pressable style={styles.iconSearch} onPress={() => setIsShowModal(true)}>
                                    <Ionicons name="list" size={28} color="black" />
                                </Pressable>
                            </View>
                        </View>
                }


            </View>

            <Modal animationType="fade" visible={isShowModal} onDismiss={() => setIsShowModal(false)}>
                <View style={styles.modalChap}>
                    <FlatList
                        ref={flatListRef}
                        data={listChuongByIdTruyen}
                        renderItem={renderItemModal}
                        keyExtractor={(item) => item.id}
                        getItemLayout={(listChuongByIdTruyen, index) => ({
                            length: 40,
                            offset: 40 * index,
                            index,
                        })}>
                    </FlatList>
                </View>
            </Modal>

            <Modal animationType="fade" visible={isShowModal2} onDismiss={() => setIsShowModal2(false)}>

                <View style={styles.modalBinhLuan}>
                    <View style={styles.boxTongBinhLuan}>
                        <Text style={styles.textTongBinhLuan}>{tongBinhLuan} bình luận</Text>
                        <Pressable style={styles.iconOutModalBL} onPress={() => setIsShowModal2(false)}>
                            <Feather name="x" size={24} color="#555" />

                        </Pressable>
                    </View>
                    <FlatList
                        data={listBinhLuan}
                        renderItem={renderItemModal2}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={styles.lineItemChuong} />
                    <View style={styles.boxInput}>

                        {
                            isLogin !== false ?
                                <Image
                                    source={{ uri: nguoidung.avatar }}
                                    style={styles.imageTaiKhoan} />
                                :
                                <View />
                        }

                        <TextInput
                            style={styles.textInputBinhLuan}
                            placeholder='Thêm bình luận'
                            cursorColor={'#777'}
                            placeholderTextColor={'#777'}
                            onChangeText={text => setNoiDungBinhLuan(text)}
                            value={noiDungBinhLuan}
                            multiline={true}
                            numberOfLines={4} />
                        <Pressable style={styles.iconSend} onPress={() => addBinhLuan()}>
                            <MaterialCommunityIcons name="send" size={24} color="tomato" />
                        </Pressable>
                    </View>

                </View>

            </Modal>

        </View>
    )
}

export default ChiTietChuongScreen

const styles = StyleSheet.create({
    textNoiDungNBL: {
        fontSize: 15,
        fontWeight: '400',
        color: '#222',
        width: '70%',
    },
    textNgayBinhLuan: {
        width: '30%',
        textAlign: 'right',
        fontSize: 12,
        fontWeight: '400',
        color: '#777',
        fontStyle: 'italic',
    },
    textTenNguoiBinhLuan: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        width: '60%',
    },
    boxTenVaNgay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
    },
    boxTTBinhLuan: {
        width: '100%',
        marginLeft: 20,
    },
    imageItemModalBinhLuan: {
        width: 50,
        height: 50,
        borderRadius: 30,
        resizeMode: 'cover',
    },
    itemModalBinhLuan: {
        marginHorizontal: 10,
        flexDirection: 'row',
        marginVertical: 16,
    },
    iconSend: {
        position: 'absolute',
        right: 0,
    },
    boxInput: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomEndRadius: 6,
        borderBottomStartRadius: 6,
        marginHorizontal: 10,
        alignItems: 'center',
        maxHeight: 120,
    },
    textInputBinhLuan: {
        marginRight: 20,
        marginLeft: 20,
        width: '73%',
        fontSize: 15,
        fontWeight: '400',
        color: '#222',
        lineHeight: 25,
    },
    imageTaiKhoan: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    iconOutModalBL: {
        position: 'absolute',
        right: 0,
    },
    textTongBinhLuan: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
        lineHeight: 23,
    },
    boxTongBinhLuan: {
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    modalBinhLuan: {
        backgroundColor: '#FFFAFA',
        width: '95%',
        maxHeight: '90%',
        alignSelf: 'center',
        minHeight: '50%',
        borderRadius: 6,

    },
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
        // alignSelf: 'center',
        // borderBottomWidth: 1,


    },
    modalChap: {
        width: '90%',
        backgroundColor: 'white',
        maxHeight: '80%',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        // paddingVertical: 10,
        minHeight: '30%'
    },
    iconShow: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 30,
        height: 30,
        elevation: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 300,

    },
    iconMoreBottom: {
        width: 70,
        opacity: 200
    },
    texTruocMoreBottom: {
        color: 'tomato',
    },
    truocMoreBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    boxMoreBottom: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#111',
        opacity: 0.8,
        height: 50,
        alignItems: 'center',
    },
    boxMoreTop: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        bottom: Dimensions.get('window').height - 60,
    },
    textTop: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    iconSearch: {
        marginRight: 20,
    },
    iconBack: {
        marginLeft: 20,
    },
    boxIconTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: 'white',
    },

    imageItem: {
        marginBottom: 16,
    },
    container: {
        position: 'relative',
        backgroundColor: 'white',
        height: '100%',
    },
})