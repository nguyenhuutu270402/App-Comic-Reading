import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ScrollView, Alert, ToastAndroid, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CaiDatScreen = (props) => {
    const { navigation } = props;
    const [nguoidung, setNguoidung] = useState({});
    const [isLogin, setIsLogin] = useState(false);

    async function fetchData() {
        try {
            AsyncStorage.getItem('nguoidung')
                .then(value => {
                    const myObject = JSON.parse(value);
                    setNguoidung(myObject);
                    if (myObject == null) {
                        setIsLogin(false);
                    } else {
                        setIsLogin(true);
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [isLogin])

    const onDangXuat = async () => {
        AsyncStorage.removeItem('nguoidung')
            .then(() => {
                console.log('Item was removed.');
            });
        setIsLogin(false);
        ToastAndroid.show('Đăng xuất thành công', ToastAndroid.CENTER);

    }

    const onAlertDangXuat = () =>
        Alert.alert(
            "Thông báo",
            "Bạn có chắc đăng xuất không?",
            [
                {
                    text: "Không",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Có", onPress: () => onDangXuat() }
            ]
        );
    const onLichSu = () => {
        if (isLogin == true) {
            navigation.navigate('LichSuScreen');
        } else {
            ToastAndroid.show('Chưa đăng nhập', ToastAndroid.CENTER);
            return;
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView>

                <View style={styles.boxHeader}>
                    <Text style={styles.txtHeader}>Danh mục</Text>
                    <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                        <Ionicons name="ios-search" size={28} color="#222" />
                    </TouchableOpacity>
                    <View style={styles.boxHeaderShadow}></View>
                </View>
                <View style={styles.boxTaiKhoan}>
                    <Text style={styles.textTaiKhoan}>Tài khoản</Text>
                    {
                        isLogin === false ?
                            <Text style={styles.textChuaDangNhap}>Chưa đăng nhập</Text>
                            :
                            <TouchableOpacity style={styles.boxImageTenEmail} onPress={() => navigation.replace('TaiKhoanScreen')}>
                                {
                                    nguoidung.avatar === null ?
                                        <Ionicons name="person-circle-outline" size={50} color="#3333FF" />
                                        :
                                        <Image
                                            source={{ uri: nguoidung.avatar }}
                                            style={styles.imageTaiKhoan} />
                                }

                                <View style={styles.boxTenEmail}>
                                    {
                                        nguoidung.tennguoidung === '' ?
                                            <Text style={styles.textName}>Cập nhật tên</Text>
                                            :
                                            <Text style={styles.textName}>{nguoidung.tennguoidung}</Text>
                                    }
                                    <Text style={styles.textEmail}>{nguoidung.email}</Text>
                                </View>
                            </TouchableOpacity>
                    }

                </View>
                <View style={styles.line} />
                <View style={styles.boxKhac}>
                    <Text style={styles.textTaiKhoan}>Khác</Text>
                    <View style={styles.boxListItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('TheLoaiScreen')}>
                            <View style={styles.boxItem}>
                                <MaterialIcons name="category" size={24} color="#339966" />
                                <Text style={styles.textItem}>Thể loại</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onLichSu()}>
                            <View style={styles.boxItem}>
                                <MaterialIcons name="history" size={24} color="#339966" />
                                <Text style={styles.textItem}>Lịch sử</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('TimTruyenScreen')}>
                            <View style={styles.boxItem}>
                                <MaterialIcons name="find-replace" size={24} color="#339966" />
                                <Text style={styles.textItem}>Tìm truyện</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            isLogin === true ?
                                <View>

                                    <TouchableOpacity onPress={() => navigation.navigate('DoiMatKhauScreen')}>
                                        <View style={styles.boxItem}>
                                            <MaterialCommunityIcons name="key-change" size={22} color="#3333FF" />
                                            <Text style={styles.textItem}>Đổi mật khẩu</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onAlertDangXuat()}>
                                        <View style={styles.boxItem}>
                                            <Feather name="log-out" size={24} color="#CC0000" />
                                            <Text style={styles.textItem}>Đăng xuất</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                :
                                <TouchableOpacity onPress={() => navigation.replace('DangNhapScreen')}>
                                    <View style={styles.boxItem}>
                                        <Feather name="log-in" size={24} color="#3333FF" />
                                        <Text style={styles.textItem}>Đăng nhập</Text>
                                    </View>
                                </TouchableOpacity>

                        }
                    </View>
                </View>
            </ScrollView>

        </View>

    );
}

export default CaiDatScreen
const styles = StyleSheet.create({
    textChuaDangNhap: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: '400',
        color: '#222',
        marginBottom: 20,
        marginTop: 10,
    },
    textItem: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '400',
        color: '#222',
    },
    boxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    boxListItem: {
        marginHorizontal: 20,
        marginVertical: 10,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'black',
        opacity: 0.2
    },
    textEmail: {
        fontSize: 14,
        fontWeight: '400',
        color: '#777'
    },
    textName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#222',
    },
    boxTenEmail: {
        marginLeft: 20,
    },
    imageTaiKhoan: {
        width: 50,
        height: 50,
        borderRadius: 30,
        resizeMode: 'center',
    },
    boxImageTenEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
    },
    textTaiKhoan: {
        fontSize: 16,
        fontWeight: '500',
        color: 'tomato',
        marginTop: 20,
        marginLeft: 20,
    },
    boxTaiKhoan: {

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