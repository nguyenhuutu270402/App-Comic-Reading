import React, { useContext, createContext, useState } from 'react';
import {
    getTop10Truyen, get3Chuong, getAllTruyen, getListChuongByIdTruyen,
    getOneTruyenById, getListTheLoaiByIdTruyen, getListTacGiaByIdTruyen,
    addTheoDoi, kiemTraTheoDoi, deleteTheoDoi, addDanhGia, kiemTraDanhGia,
    updateDanhGia, getListImageChuongByIdChuong, getOneChuongById, loginUser,
    addUser, checkRegister, addLuotXem, addBinhLuan, getListBinhLuanByIdTruyen,
    getTongBinhLuanByIdTruyen, layListTruyenTheoLoai, updateUser, updatePasswordUser,
    kiemTraLichSu, kiemTraLichSuXemChuong, getListLichSuTheoIdNguoiDung, getListTheLoai,
    deleteLichSu
} from '../services/ApiService';

export const ApiContext = createContext();
export const ApiContextProvider = (props) => {
    const { children } = props;

    const onGetListLichSuTheoIdNguoiDung = async (id) => {
        try {
            const res = await getListLichSuTheoIdNguoiDung(id);
            return res;
        } catch (error) {
            console.log('onGetListLichSuTheoIdNguoiDung error: ', error);
        }
    }
    const onGetListTheLoai = async () => {
        try {
            const res = await getListTheLoai();
            return res;
        } catch (error) {
            console.log('onGetListTheLoai error: ', error);
        }
    }

    const onKiemTraLichSuXemChuong = async (idnguoidung, idchuong) => {
        try {
            const res = await kiemTraLichSuXemChuong(idnguoidung, idchuong);
            return res;
        } catch (error) {
            console.log('onKiemTraLichSuXemChuong error: ', error);
        }
    }

    const onKiemTraLichSu = async (idnguoidung, idtruyen, idchuong, ngayxemgannhat) => {
        try {
            const res = await kiemTraLichSu(idnguoidung, idtruyen, idchuong, ngayxemgannhat);
            return res;
        } catch (error) {
            console.log('onKiemTraLichSu error: ', error);
        }
    }

    const onUpdateUser = async (tennguoidung, avatar, id) => {
        try {
            const res = await updateUser(tennguoidung, avatar, id);
            return res;
        } catch (error) {
            console.log('onUpdateUser error: ', error);
        }
    }

    const onUpdatePasswordUser = async (matkhau, id) => {
        try {
            const res = await updatePasswordUser(matkhau, id);
            return res;
        } catch (error) {
            console.log('onUpdatePasswordUser error: ', error);
        }
    }

    const onLayListTruyenTheoLoai = async (lastquery) => {
        try {
            const res = await layListTruyenTheoLoai(lastquery);
            return res;
        } catch (error) {
            console.log('onLayListTruyenTheoLoai error: ', error);
        }
    }

    const onAddBinhLuan = async (idnguoidung, idtruyen, noidung, ngaybinhluan) => {
        try {
            const res = await addBinhLuan(idnguoidung, idtruyen, noidung, ngaybinhluan);
            return res;
        } catch (error) {
            console.log('onAddBinhLuan error: ', error);
        }
    }

    const onGetTongBinhLuanByIdTruyen = async (id) => {
        try {
            const res = await getTongBinhLuanByIdTruyen(id);
            return res;
        } catch (error) {
            console.log('onGetTongBinhLuanByIdTruyen error: ', error);
        }
    }

    const onGetListBinhLuanByIdTruyen = async (id) => {
        try {
            const res = await getListBinhLuanByIdTruyen(id);
            return res;
        } catch (error) {
            console.log('onGetListBinhLuanByIdTruyen error: ', error);
        }
    }

    const onLoginUser = async (email, matkhau) => {
        try {
            const res = await loginUser(email, matkhau);
            return res;
        } catch (error) {
            console.log('onLoginUser error: ', error);
        }
    }

    const onAddUser = async (email, matkhau) => {
        try {
            const res = await addUser(email, matkhau);
            return res;
        } catch (error) {
            console.log('onAddUser error: ', error);
        }
    }

    const onCheckRegister = async (email) => {
        try {
            const res = await checkRegister(email);
            return res;
        } catch (error) {
            console.log('checkRegister error: ', error);
        }
    }
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

    const onGetListChuongByIdTruyen = async (idTruyen, idNguoiDung) => {
        try {
            const res = await getListChuongByIdTruyen(idTruyen, idNguoiDung);
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

    const onDeleteLichSu = async (idnguoidung, idtruyen) => {
        try {
            const res = await deleteLichSu(idnguoidung, idtruyen);
            return res;
        } catch (error) {
            console.log('onDeleteLichSu error: ', error);
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

    const onAddLuotXem = async (idnguoidung, idchuong, ngayxem) => {
        try {
            const res = await addLuotXem(idnguoidung, idchuong, ngayxem);
            return res;
        } catch (error) {
            console.log('onAddLuotXem error: ', error);
        }
    }

    const onGetListImageChuongByIdChuong = async (id) => {
        try {
            const res = await getListImageChuongByIdChuong(id);
            return res;
        } catch (error) {
            console.log('onGetListImageChuongByIdChuong error: ', error);
        }
    }

    const onGetOneChuongById = async (id) => {
        try {
            const res = await getOneChuongById(id);
            return res;
        } catch (error) {
            console.log('onGetOneChuongById error: ', error);
        }
    }

    return (
        <ApiContext.Provider
            value={{
                onGetTop10Truyen, onGet3Chuong, onGetAllTruyen, onGetListChuongByIdTruyen,
                onGetOneTruyenById, onGetListTheLoaiByIdTruyen, onGetListTacGiaByIdTruyen,
                onAddTheoDoi, onKiemTraTheoDoi, onDeleteTheoDoi, onAddDanhGia, onKiemTraDanhGia,
                onUpdateDanhGia, onGetListImageChuongByIdChuong, onGetOneChuongById, onLoginUser,
                onAddUser, onCheckRegister, onAddLuotXem, onAddBinhLuan, onGetListBinhLuanByIdTruyen,
                onGetTongBinhLuanByIdTruyen, onLayListTruyenTheoLoai, onUpdateUser, onUpdatePasswordUser,
                onKiemTraLichSuXemChuong, onKiemTraLichSu, onGetListTheLoai, onGetListLichSuTheoIdNguoiDung,
                onDeleteLichSu
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}
