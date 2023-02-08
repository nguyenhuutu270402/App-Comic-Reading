import { StyleSheet, Text, View, Image, Pressable, FlatList, ToastAndroid, Alert, Dimensions, StatusBar, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { Modal, RadioButton } from 'react-native-paper';
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';



const ChiTietChuongScreen = (props) => {
    const { navigation, route: { params: { id, index } } } = props;
    const currentIndex = index;
    const { onGetListImageChuongByIdChuong, onGetListChuongByIdTruyen, onGetOneChuongById,
        onAddTheoDoi, onKiemTraTheoDoi, onDeleteTheoDoi, } = useContext(ApiContext);
    const [listImage, setListImage] = useState([]);
    const dimensionsWidth = Dimensions.get('screen').width;
    const [listChuongByIdTruyen, setListChuongByIdTruyen] = useState([]);

    const [aspectRatio, setAspectRatio] = useState(0.1);
    const [isShowMore, setIsShowMore] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [oneChuong, setOneChuong] = useState({});
    const [kiemTraTheoDoi, setKiemTraTheoDoi] = useState(false);


    const [selectedValue, setSelectedValue] = useState(1);



    async function fetchData() {
        try {
            const response1 = await onGetListImageChuongByIdChuong(id);
            const response2 = await onGetOneChuongById(id);
            setListImage(response1.results);
            setOneChuong(response2.results);
            const response3 = await onGetListChuongByIdTruyen(response2.results.idtruyen);
            setListChuongByIdTruyen(response3.results);
            const response4 = await onKiemTraTheoDoi(4, response2.results.idtruyen);
            setKiemTraTheoDoi(response4.results);

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
    }, [selectedValue, id]);
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
            {/* {getARatio()} */}
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

    const deleteTheoDoi = async () => {
        const response = await onDeleteTheoDoi(4, oneChuong.idtruyen);
        if (response.results) {
            setKiemTraTheoDoi(false);
            ToastAndroid.show('Bỏ theo dõi thành công', ToastAndroid.CENTER);
        }

    }

    const addTheoDoi = async () => {
        const response = await onAddTheoDoi(4, oneChuong.idtruyen);
        setKiemTraTheoDoi(true);
        ToastAndroid.show('Theo dõi thành công', ToastAndroid.CENTER);

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
                                            <Pressable style={styles.truocMoreBottom} onPress={() => navigation.replace('ChiTietChuongScreen', { id: listChuongByIdTruyen[currentIndex + 1].id, index: currentIndex + 1 })}>
                                                <AntDesign name="left" size={20} color="tomato" />
                                                <Text style={styles.texTruocMoreBottom}>Trước</Text>
                                            </Pressable>
                                    }
                                    {
                                        currentIndex === 0 ?
                                            <View />
                                            :
                                            <Pressable style={styles.truocMoreBottom} onPress={() => navigation.replace('ChiTietChuongScreen', { id: listChuongByIdTruyen[currentIndex - 1].id, index: currentIndex - 1 })}>
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

                                    <Pressable style={styles.truocMoreBottom}>
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
                    <ScrollView>
                        {listChuongByIdTruyen.map((item, index) => (
                            // <Pressable style={styles.itemChuong} key={item.id} onPress={() => navigation.push('ChiTietChuongScreen', { id: item.id, key: `ChiTietChuongScreen${item.id}` })}>

                            <Pressable style={styles.itemChuong} key={item.id} onPress={() => navigation.replace('ChiTietChuongScreen', { id: item.id, index: index })}>
                                <RadioButton
                                    value={item.id}
                                    status={selectedValue === item.id ? 'checked' : 'unchecked'}
                                    onPress={() => setSelectedValue(item.id)}
                                />
                                <Text style={styles.textTenChuong} key={item.id}>{item.tenchuong}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </Modal>

        </View>
    )
}

export default ChiTietChuongScreen

const styles = StyleSheet.create({
    textTenChuong: {
        // backgroundColor: 'red',
        width: '85%',
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
        lineHeight: 23,
    },
    itemChuong: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
    },
    modalChap: {
        width: '90%',
        backgroundColor: 'white',
        maxHeight: '80%',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 10,

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