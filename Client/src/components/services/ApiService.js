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
    const res = await axiosInstance.get(`api//get-3chuong-theo-id-truyen/${id}`);
    return res;
}