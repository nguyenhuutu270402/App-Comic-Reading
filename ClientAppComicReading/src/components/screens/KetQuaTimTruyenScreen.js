import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Pressable, TextInput, RefreshControl, Dimensions } from 'react-native'
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';
import { Modal } from 'react-native-paper';
const KetQuaTimTruyenScreen = (props) => {
    const { navigation, route: { params: { midleQuery } } } = props;
    const { onLayListTruyenTheoLoai } = useContext(ApiContext);
    const [listTruyen, setListtruyen] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);

    const listSwap = [
        {
            id: 1,
            swap: 'Ngày cập nhật',
        },
        {
            id: 2,
            swap: 'Theo tên',
        },
        {
            id: 3,
            swap: 'Lượt xem',
        },
        {
            id: 4,
            swap: 'Lượt theo dõi',
        },
        {
            id: 5,
            swap: 'Đánh giá',
        },
    ]

    async function fetchData() {
        try {
            var qr = midleQuery + ` ORDER BY MAX(chuong.ngaycapnhat) desc `;
            const response = await onLayListTruyenTheoLoai(qr);
            setListtruyen(response.results);

        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        fetchData();
    }, []);

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
    const renderItem = ({ item }) => (

        <TouchableOpacity key={item.id} onPress={() => navigation.push('ChiTietScreen', { id: item.id })} style={styles.containerItemTruyen}>
            <View>
                <Image style={styles.imageTruyen} source={{ uri: item.imagelink }}></Image>
                <View style={styles.boxDateTruyen}>
                    <Text style={styles.textDateTruyen}>{onFormatDate(item.ngaycapnhat)}</Text>
                </View>
            </View>
            <View style={styles.boxNameTruyen}>
                <Text numberOfLines={2} style={styles.textNameTruyen}>{item.tentruyen}</Text>
                <View style={styles.boxChapterTruyen}>
                    <Text style={styles.textChapterTruyen}>Chapter {item.chuongmoinhat}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const onSwapType = async (key) => {
        try {
            if (key == 1) {
                var qr = midleQuery + ` 
                    ORDER BY MAX(chuong.ngaycapnhat) desc `;
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 2) {
                var qr = midleQuery + ` 
                    ORDER BY truyen.tentruyen `;
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 3) {
                var qr = midleQuery + ` 
                    ORDER BY COUNT(DISTINCT luotxem.id) desc`;
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 4) {
                var qr = midleQuery + ` 
                    ORDER BY COUNT(DISTINCT theodoi.id) desc`;
                const response = await onLayListTruyenTheoLoai(qr);
                setListtruyen(response.results);
                setSelectedValue(key);
                setIsShowModal(false);
                return;
            } else if (key == 5) {
                var qr = midleQuery + ` 
                    ORDER BY AVG(danhgia.sosao) desc`;
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

    return (
        <View style={styles.container}>
            {/* box ten trang va nut tim kiem */}
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Tìm truyện</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => setIsShowModal(true)}>
                    <AntDesign name="swap" size={26} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBack} onPress={() => navigation.pop()}>
                    <AntDesign name="left" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.boxHeaderShadow}></View>
            <FlatList
                data={listTruyen}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
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
    )
}

export default KetQuaTimTruyenScreen

const styles = StyleSheet.create({
    textInputSearch: {
        width: '80%',
        height: '100%',
        fontSize: 15,
    },
    iconSend: {
        marginHorizontal: 10,
    },
    boxSearch: {
        width: '100%',
        height: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 6,
        paddingHorizontal: 50,

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
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        // paddingVertical: 10,
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
        right: 16,
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
        width: '100%'
    },
});
