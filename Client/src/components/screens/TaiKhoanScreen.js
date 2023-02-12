import { StyleSheet, Text, View, Pressable, SafeAreaView, Alert, Image } from 'react-native'
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../config';

const TaiKhoanScreen = (props) => {
    const [imageUri, setImageUri] = useState(null);
    const [imageUri2, setImageUri2] = useState(null);

    const [upLoading, setUpLoading] = useState(false);
    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                multiple: true,
            });
            const asset = result.assets[0];
            const source = { uri: asset.uri };
            console.log(source);
            setImageUri(source);
        } catch (error) {
            console.log(error);

        }

    }

    const uploadImage = async () => {
        setUpLoading(true);
        const respone = await fetch(imageUri.uri);
        const blob = await respone.blob();
        const filename = imageUri.uri.substring(imageUri.uri.lastIndexOf('/') + 1);
        var ref = firebase.storage().ref().child(filename).put(blob);

        try {
            await ref;
        } catch (error) {
            console.log(error);
        }
        setUpLoading(false);
        Alert.alert(
            'Đang tải...',
        );
        setImageUri(false);

        // day len xong lay duong link ve
        const storageRef = firebase.storage().ref();
        const downloadUrl = await storageRef.child(filename).getDownloadURL();
        console.log(downloadUrl);
        setImageUri2(downloadUrl);
    }

    const getImage = async () => {
        const storageRef = firebase.storage().ref();
        const downloadUrl = await storageRef.child('bglogin2.png').getDownloadURL();
        console.log(downloadUrl);
        setImageUri2(downloadUrl);
    }


    return (
        <View>
            <Pressable style={{ width: 300, height: 30, backgroundColor: 'cyan', marginTop: 50 }} onPress={() => pickImage()}>
                <Text>Chon anh</Text>
            </Pressable>
            {imageUri && <Image source={{ uri: imageUri.uri }} style={{ width: 300, height: 300 }} />}
            <Pressable style={{ width: 300, height: 30, backgroundColor: 'cyan' }} onPress={() => uploadImage()}>
                <Text>Upload anh</Text>
            </Pressable>
            <Pressable style={{ width: 300, height: 50, backgroundColor: 'red' }} onPress={() => getImage()}>
                <Text>layanh</Text>
            </Pressable>
            {imageUri2 && <Image source={{ uri: imageUri2 }} style={{ width: 300, height: 300 }} />}

        </View>
    )
}

export default TaiKhoanScreen

const styles = StyleSheet.create({})