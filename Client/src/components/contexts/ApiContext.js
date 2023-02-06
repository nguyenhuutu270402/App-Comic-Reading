import React, { useContext, createContext, useState } from 'react';
import {
    getTop10Truyen, get3Chuong, getAllTruyen, getListChuongByIdTruyen,
    getOneTruyenById, getListTheLoaiByIdTruyen, getListTacGiaByIdTruyen,
    addTheoDoi, kiemTraTheoDoi, deleteTheoDoi, addDanhGia, kiemTraDanhGia,
    updateDanhGia
} from '../services/ApiService';

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

    const onGetListChuongByIdTruyen = async (id) => {
        try {
            const res = await getListChuongByIdTruyen(id);
            return res;
        } catch (error) {
            console.log('onGetListChuongByIdTruyen error: ', error);
        }
    }

    const onGetOneTruyenById = async (id) => {
        try {
            const res = await getOneTruyenById(id);
            return res;
        } catch (error) {
            console.log('onGetOneTruyenById error: ', error);
        }
    }

    const onGetListTheLoaiByIdTruyen = async (id) => {
        try {
            const res = await getListTheLoaiByIdTruyen(id);
            return res;
        } catch (error) {
            console.log('onGetListTheLoaiByIdTruyen error: ', error);
        }
    }

    const onGetListTacGiaByIdTruyen = async (id) => {
        try {
            const res = await getListTacGiaByIdTruyen(id);
            return res;
        } catch (error) {
            console.log('onGetListTacGiaByIdTruyen error: ', error);
        }
    }

    const onAddTheoDoi = async (idnguoidung, idtruyen) => {
        try {
            const res = await addTheoDoi(idnguoidung, idtruyen);
            return res;
        } catch (error) {
            console.log('onAddTheoDoi error: ', error);
        }
    }

    const onKiemTraTheoDoi = async (idnguoidung, idtruyen) => {
        try {
            const res = await kiemTraTheoDoi(idnguoidung, idtruyen);
            return res;
        } catch (error) {
            console.log('onKiemTraTheoDoi error: ', error);
        }
    }

    const onDeleteTheoDoi = async (idnguoidung, idtruyen) => {
        try {
            const res = await deleteTheoDoi(idnguoidung, idtruyen);
            return res;
        } catch (error) {
            console.log('onDeleteTheoDoi error: ', error);
        }
    }

    const onAddDanhGia = async (idnguoidung, idtruyen, sosao) => {
        try {
            const res = await addDanhGia(idnguoidung, idtruyen, sosao);
            return res;
        } catch (error) {
            console.log('onAddDanhGia error: ', error);
        }
    }

    const onKiemTraDanhGia = async (idnguoidung, idtruyen) => {
        try {
            const res = await kiemTraDanhGia(idnguoidung, idtruyen);
            return res;
        } catch (error) {
            console.log('onKiemTraDanhGia error: ', error);
        }
    }

    const onUpdateDanhGia = async (idnguoidung, idtruyen, sosao) => {
        try {
            const res = await updateDanhGia(idnguoidung, idtruyen, sosao);
            return res;
        } catch (error) {
            console.log('onUpdateDanhGia error: ', error);
        }
    }

    return (
        <ApiContext.Provider
            value={{
                onGetTop10Truyen, onGet3Chuong, onGetAllTruyen, onGetListChuongByIdTruyen,
                onGetOneTruyenById, onGetListTheLoaiByIdTruyen, onGetListTacGiaByIdTruyen,
                onAddTheoDoi, onKiemTraTheoDoi, onDeleteTheoDoi, onAddDanhGia, onKiemTraDanhGia,
                onUpdateDanhGia
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}
