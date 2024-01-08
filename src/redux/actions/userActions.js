import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";


export const createUser = createAsyncThunk("createUser", async (data) => {
    try {
        const response = await clientAxios.post('/users/create', data);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});


export const getUser = createAsyncThunk("getUser", async () => {
    try {
        const response = await clientAxios.get(`users/getUser`);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});


export const updateUser = createAsyncThunk("updateUser", async (data) => {
    try {
        const response = await clientAxios.put(`/users/edit/${data.id}`, data);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});


export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    try {
        const response = await clientAxios.delete(`/users/delete/${id}`);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});