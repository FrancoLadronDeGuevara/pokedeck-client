import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";

export const getAllUsers = createAsyncThunk("getAllUsers", async() => {
    try {
        const response = await clientAxios.get(`users/`);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response)
    }
})

export const getUser = createAsyncThunk("getUser", async () => {
    try {
        const response = await clientAxios.get(`users/getUser`);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});


export const editUser = createAsyncThunk("editUser", async (data) => {
    try {
        const response = await clientAxios.patch(`/users/edit/${data.id}`, data);
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