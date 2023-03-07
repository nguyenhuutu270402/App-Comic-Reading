import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView, Alert, ToastAndroid, Modal } from 'react-native'
import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const DoiMatKhauScreen = (props) => {
    const { navigation } = props;

    const [matKhauCu, setMatKhauCu] = useState('');
    const [matKhauMoi, setMatKhauMoi] = useState('');
    const [matKhauLai, setMatKhauLai] = useState('');
    const [secure1, setSecure1] = useState(true);
    const [secure2, setSecure2] = useState(true);
    const [secure3, setSecure3] = useState(true);
    const { onUpdatePasswordUser } = useContext(ApiContext);
    const [nguoidung, setNguoidung] = useState({});

    async function fetchData() {
        try {
            AsyncStorage.getItem('nguoidung')
                .then(value => {
                    const myObject = JSON.parse(value);
                    setNguoidung(myObject);
                });
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const onDoiMatKhau = async () => {

        if (matKhauCu !== nguoidung.matkhau) {
            ToastAndroid.show('Mật khẩu cũ không đúng', ToastAndroid.CENTER);
            return;
        }
        else if (matKhauMoi.indexOf(" ") !== -1) {
            ToastAndroid.show('Mật khẩu không được chứa dấu cách', ToastAndroid.CENTER);
            return;
        } else if (matKhauMoi.length < 6) {
            ToastAndroid.show('Mật khẩu phải có ít nhất 6 ký tự', ToastAndroid.CENTER);
            return;
        } else if (matKhauLai !== matKhauMoi) {
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.CENTER);
            return;
        } else {
            const response2 = await onUpdatePasswordUser(matKhauMoi, nguoidung.id);
            AsyncStorage.getItem('nguoidung')
                .then(value => {
                    let myObject = JSON.parse(value);
                    myObject.matkhau = matKhauMoi;
                    return AsyncStorage.setItem('nguoidung', JSON.stringify(myObject));
                });
            ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.CENTER);
            navigation.pop()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Đổi mật khẩu</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="#222" />
                </TouchableOpacity>
                <View style={styles.boxHeaderShadow}></View>
            </View>
            <ScrollView>
                <View style={styles.boxBody}>
                    <View style={styles.boxTextInput}>
                        <MaterialCommunityIcons style={styles.iconTextInput} name="key-outline" size={24} color="#339966" />
                        <TextInput
                            style={styles.textInputTen}
                            placeholder='Mật khẩu cũ'
                            cursorColor={'grey'}
                            placeholderTextColor={'grey'}
                            secureTextEntry={secure1}
                            onChangeText={text => setMatKhauCu(text)} />
                        {
                            secure1 === true ?
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setSecure1(false)}>
                                    <Entypo name="eye" size={24} color="grey" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setSecure1(true)}>
                                    <Entypo name="eye-with-line" size={24} color="grey" />
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.boxTextInput}>
                        <Feather style={styles.iconTextInput} name="lock" size={24} color="#339966" />
                        <TextInput
                            style={styles.textInputTen}
                            placeholder='Mật khẩu mới'
                            cursorColor={'grey'}
                            placeholderTextColor={'grey'}
                            secureTextEntry={secure2}
                            onChangeText={text => setMatKhauMoi(text)} />
                        {
                            secure2 === true ?
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setSecure2(false)}>
                                    <Entypo name="eye" size={24} color="grey" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setSecure2(true)}>
                                    <Entypo name="eye-with-line" size={24} color="grey" />
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={styles.boxTextInput}>
                        <Feather style={styles.iconTextInput} name="unlock" size={24} color="#339966" />
                        <TextInput
                            style={styles.textInputTen}
                            placeholder='Xác nhận mật khẩu'
                            cursorColor={'grey'}
                            placeholderTextColor={'grey'}
                            secureTextEntry={secure3}
                            onChangeText={text => setMatKhauLai(text)} />
                        {
                            secure3 === true ?
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setSecure3(false)}>
                                    <Entypo name="eye" size={24} color="grey" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setSecure3(true)}>
                                    <Entypo name="eye-with-line" size={24} color="grey" />
                                </TouchableOpacity>
                        }
                    </View>

                    <TouchableOpacity style={styles.btLuu} onPress={() => onDoiMatKhau()}>
                        <Text style={styles.textLuu}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View>
    )
}

export default DoiMatKhauScreen

const styles = StyleSheet.create({
    textLuu: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    btLuu: {
        width: '70%',
        height: 46,
        backgroundColor: '#339966',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 40,
    },
    iconShowPass: {
        position: 'absolute',
        right: 12,
        top: 12
    },
    boxTextInput: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    iconTextInput: {
        position: 'absolute',
        top: 12,
        left: 12,
    },
    textInputTen: {
        width: '90%',
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 50,
        fontSize: 16,
        fontWeight: '600',
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
        marginBottom: 30,
    },
    boxBody: {
        alignItems: 'center',
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
})