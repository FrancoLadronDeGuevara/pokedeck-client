import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";


export const getAllCards = createAsyncThunk("getAllCards", async () => {
    const response = await clientAxios.get(`/cards`, { withCredentials: true });
    return response.data;
})

export const getCard = createAsyncThunk("getCard", async () => {
    const response = await clientAxios.get(`/cards/getCard`, { withCredentials: true }) ;
    return response.data;
});


export const editCard = createAsyncThunk("editCard", async (data) => {
    const response = await clientAxios.patch(`/cards/edit/${data.id}`, data, { withCredentials: true });
    return response.data;
});


export const deleteCard = createAsyncThunk("deleteCard", async (id) => {
    const response = await clientAxios.delete(`/cards/delete/${id}`, { withCredentials: true });
    return response.data;
});