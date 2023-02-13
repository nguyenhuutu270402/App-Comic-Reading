import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions, RefreshControl } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const TrangChuScreen = (props) => {
    const { navigation } = props;
    const { onGetTop10Truyen, onGetAllTruyen } = useContext(ApiContext);
    const [top10Truyen, setTop10Truyen] = useState([]);
    const [allTruyen, setAllTruyen] = useState([]);

    async function fetchData() {
        const response = await onGetTop10Truyen();
        const response2 = await onGetAllTruyen();
        setAllTruyen(response2.results);
        setTop10Truyen(response.results);
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

    const renderHeader = () => {
        return (
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
                <Text style={styles.textTruyenDeCu}>Truyện mới cập nhật</Text>
            </View>
        )
    }

    const renderItemTop10Truyen = ({ item }) => {
        const { id, tentruyen, imagelink, chuongmoinhat, ngaycapnhat } = item;
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

    const renderItemAllTruyen = ({ item }) => (

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
    );


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
            {/* box ten trang va nut tim kiem */}
            <View style={styles.boxHeader}>
                <Text style={styles.txtHeader}>Trang chủ</Text>
                <Pressable style={styles.boxIconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="#222" />
                </Pressable>
            </View>
            <View style={styles.boxHeaderShadow}></View>
            <FlatList style={styles.flatAllTruyen}
                data={allTruyen}
                renderItem={renderItemAllTruyen}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
                refreshControl={
                    < RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
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
        // height: '100%',
        aspectRatio: 0.68,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    containerItemTruyen: {
        width: '32.4%',
        marginHorizontal: 2,
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
        width: (Dimensions.get('window').width / 2) - 10,
        justifyContent: 'space-evenly'
    },
    textNameTop10: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        width: (Dimensions.get('window').width / 2) - 10,
        textAlign: 'center',
        textTransform: 'capitalize',

    },
    boxNameTop10: {
        position: 'absolute',
        backgroundColor: '#000000',
        opacity: 0.8,
        width: (Dimensions.get('window').width / 2) - 4,
        bottom: 0,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    imageTop10: {
        width: (Dimensions.get('window').width / 2) - 4,
        aspectRatio: 0.82,
    },
    containerItem: {
        position: 'relative',
        marginHorizontal: 2,
    },
    flatAllTruyen: {
        width: '100%',
        height: '100%',
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
        width: '100%'
    },
});