import axiosInstance from "../../utilities/axios";

export const getTop10Truyen = async () => {
    const res = await axiosInstance.get("api/get-top10-truyen");
    return res;
}
export const getAllTruyen = async () => {
    const res = await axiosInstance.get("api/get-all-truyen");
    return res;
}
export const get3Chuong = async (id) => {
    const res = await axiosInstance.get(`api/get-3chuong-theo-id-truyen/${id}`);
    return res;
}
export const getListChuongByIdTruyen = async (id) => {
    const res = await axiosInstance.get(`api/get-list-chuong-theo-id-truyen/${id}`);
    return res;
}
export const getOneTruyenById = async (id) => {
    const res = await axiosInstance.get(`api/get-one-truyen-by-id/${id}`);
    return res;
}
export const getListTheLoaiByIdTruyen = async (id) => {
    const res = await axiosInstance.get(`api/get-list-the-loai-theo-id-truyen/${id}`);
    return res;
}
export const getListTacGiaByIdTruyen = async (id) => {
    const res = await axiosInstance.get(`api/get-list-tac-gia-theo-id-truyen/${id}`);
    return res;
}
export const addTheoDoi = async (idnguoidung, idtruyen) => {
    const data = { idnguoidung, idtruyen }
    const res = await axiosInstance.post(`api/add-theo-doi`, data);
    return res;
}
export const kiemTraTheoDoi = async (idnguoidung, idtruyen) => {
    const data = { idnguoidung, idtruyen }
    const res = await axiosInstance.post(`api/kiem-tra-theo-doi`, data);
    return res;
}

export const deleteTheoDoi = async (idnguoidung, idtruyen) => {
    const data = { idnguoidung, idtruyen }
    const res = await axiosInstance.post(`api/delete-theo-doi`, data);
    return res;
}
export const addDanhGia = async (idnguoidung, idtruyen, sosao) => {
    const data = { idnguoidung, idtruyen, sosao }
    const res = await axiosInstance.post(`api/add-danh-gia`, data);
    return res;
}
export const kiemTraDanhGia = async (idnguoidung, idtruyen) => {
    const data = { idnguoidung, idtruyen }
    const res = await axiosInstance.post(`api/kiem-tra-danh-gia`, data);
    return res;
}
export const updateDanhGia = async (idnguoidung, idtruyen, sosao) => {
    const data = { idnguoidung, idtruyen, sosao }
    const res = await axiosInstance.post(`api/update-danh-gia`, data);
    return res;
}

export const getListImageChuongByIdChuong = async (id) => {
    const res = await axiosInstance.get(`api/get-get-list-image-chuong-theo-id-chuong/${id}`);
    return res;
}