import React, { useContext, createContext, useState } from 'react';
import { getTop10Truyen, get3Chuong, getAllTruyen } from '../services/ApiService';

export const ApiContext = createContext();
export const ApiContextProvider = (props) => {
    const { children } = props;

    // lấy top 10 truyện xem nhiều nhất
    const onGetTop10Truyen = async () => {
        try {
            const res = await getTop10Truyen();
            return res;
        } catch (error) {
            console.log('onGetTop10Truyen error: ', error);
        }
    }

    const onGetAllTruyen = async () => {
        try {
            const res = await getAllTruyen();
            return res;
        } catch (error) {
            console.log('onGetAllTruyen error: ', error);
        }
    }

    const onGet3Chuong = async (id) => {
        try {
            const res = await get3Chuong(id);
            return res;
        } catch (error) {
            console.log('onGet3Chuong error: ', error);
        }
    }




    return (
        <ApiContext.Provider
            value={{
                onGetTop10Truyen, onGet3Chuong, onGetAllTruyen
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}
