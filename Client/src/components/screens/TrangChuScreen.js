import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Animated, ScrollView, SectionList } from 'react-native'
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TrangChuScreen = (props) => {
    const { navigation } = props;
    const { onGetTop10Truyen, onGetAllTruyen } = useContext(ApiContext);
    const [top10Truyen, setTop10Truyen] = useState([]);
    const [allTruyen, setAllTruyen] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await onGetTop10Truyen();
            const response2 = await onGetAllTruyen();
            setAllTruyen(response2.results);
            setTop10Truyen(response.results);
        }

        fetchData();
    }, []);

    const onFormatDate = (createAt) => {
        var dateCurent = new Date();
        var d = new Date(createAt);
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
            var hours = d.getHours();
            const dateString = date + '/' + month + '/' + year;
            return dateString;
        }
    }
    const renderItemTop10Truyen = ({ item }) => {
        const { id, tentruyen, imagelink, chuongmoinhat, ngaycapnhat, tongtheodoi } = item;
        return (
            <Pressable onPress={() => navigation.navigate('ChiTietScreen', { id: id })} style={styles.containerItem}>
                <Image style={styles.imageTop10} source={{ uri: imagelink }}></Image>
                <View style={styles.boxNameTop10}>
                    <Text numberOfLines={1} style={styles.textNameTop10}>{tentruyen}</Text>
                    <View style={styles.boxChapterTop10}>
                        <Text style={styles.textChapterTop10}>Chapter {chuongmoinhat}</Text>
                        <View style={styles.boxDateTop10}>
                            <AntDesign name="clockcircleo" size={14} color="#DBDED5" />
                            <Text style={styles.textDateTop10}>{onFormatDate(ngaycapnhat)}</Text>
                        </View>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (


        <View style={styles.container}>
            {/* box ten trang va nut tim kiem */}
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Trang chủ</Text>
                <Pressable style={styles.boxIconSearch} onPress={() => navigation.navigate('TiemKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="#222" />
                </Pressable>
            </View>
            <View style={styles.boxHeaderShadow}></View>

            <ScrollView>
                {/* box top 10 truyen */}
                <View>
                    <Text style={styles.textTruyenDeCu}>Truyện đề cử</Text>
                    <FlatList style={styles.flatTop}
                        data={top10Truyen}
                        renderItem={renderItemTop10Truyen}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View>

                </View>
                <Text style={styles.textTruyenDeCu}>Truyện mới cập nhật</Text>
                <View style={styles.BoxTruyen}>
                    {allTruyen.map(item => (
                        <Pressable key={item.id} onPress={() => navigation.navigate('ChiTietScreen', { id: item.id })} style={styles.containerItemTruyen}>
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
                        </Pressable>
                    ))}
                </View>

            </ScrollView>

        </View>


    );
}

export default TrangChuScreen;
const styles = StyleSheet.create({
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
        // textAlign: 'center',
        // backgroundColor: 'red'
    },
    boxNameTruyen: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    imageTruyen: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    containerItemTruyen: {
        width: '32.2%',
        marginHorizontal: 2,
    },
    BoxTruyen: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor: 'red',
    },
    textDateTop10: {
        color: '#DBDED5',
        fontSize: 12,
    },
    boxDateTop10: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    textChapterTop10: {
        color: 'white',
        fontSize: 14,
        fontWeight: '400'
    },
    boxChapterTop10: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-end',
    },
    textNameTop10: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        width: 190,
        textAlign: 'center',
    },
    boxNameTop10: {
        position: 'absolute',
        backgroundColor: '#000000',
        opacity: 0.8,
        width: 202,
        bottom: 0,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    imageTop10: {
        width: 202,
        height: 250,
    },
    containerItem: {
        position: 'relative',
        marginHorizontal: 2,
    },
    flatTop: {
        width: '100%'
    },
    textTruyenDeCu: {
        color: 'tomato',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
        marginLeft: 4,
        marginBottom: 4,
    },
    boxHeaderShadow: {
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 100 },
        shadowOpacity: 2,
        shadowRadius: 10,
        backgroundColor: 'white',
        padding: 1,
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
        width: '100%'
    },
});