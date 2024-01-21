import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";


export const getAllCards = createAsyncThunk("getAllCards", async () => {
    const response = await clientAxios.get(`/cards`);
    return response.data;
})

export const getCard = createAsyncThunk("getCard", async () => {
    const response = await clientAxios.get(`/cards/getCard`);
    return response.data;
});


export const editCard = createAsyncThunk("editCard", async (data) => {
    const response = await clientAxios.patch(`/cards/edit/${data.id}`, data);
    return response.data;
});


export const deleteCard = createAsyncThunk("deleteCard", async (id) => {
    try {
        const response = await clientAxios.delete(`/cards/delete/${id}`);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});