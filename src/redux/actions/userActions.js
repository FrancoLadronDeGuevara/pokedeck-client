import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";

export const login = createAsyncThunk("login", async (data) => {
    const response = await clientAxios.post('/login', data);
    return response.data;
})

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    const response = await clientAxios.get(`/users`);
    return response.data;
})

export const getUser = createAsyncThunk("getUser", async () => {
    const response = await clientAxios.get(`/users/getUser`);
    return response.data;
});

export const editUser = createAsyncThunk("editUser", async (data) => {
    const response = await clientAxios.patch(`/users/edit/${data.id}`, data);
    return response.data;
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
    const response = await clientAxios.patch(`/users/update/${data.id}`, data);
    return response.data;
});


export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    try {
        const response = await clientAxios.delete(`/users/delete/${id}`);
        return response.data;
    } catch (error) {
        return isRejectedWithValue(error.response);
    }
});