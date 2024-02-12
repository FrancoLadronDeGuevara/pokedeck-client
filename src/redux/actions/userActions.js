import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";


export const getUser = createAsyncThunk("getUser", async () => {
    const response = await clientAxios.get(`/users/get-user`, { withCredentials: true });
    return response.data;
});

export const getUserDeck = createAsyncThunk("getUserDeck", async () => {
    const response = await clientAxios.get(`/users/user-deck`, { withCredentials: true });
    return response.data;
})

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    const response = await clientAxios.get(`/users`, { withCredentials: true });
    return response.data;
})

export const editUser = createAsyncThunk("editUser", async (data) => {
    const response = await clientAxios.patch(`/users/edit/${data.id}`, data, { withCredentials: true });
    return response.data;
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
    const response = await clientAxios.patch(`/users/update/${data.id}`, data, { withCredentials: true });
    return response.data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    const response = await clientAxios.delete(`/users/delete/${id}`);
    return response.data;
});

export const getCoins = createAsyncThunk("getCoins", async (data) => {
    const response = await clientAxios.patch(`/minigames/guessPokemonCoins`, data, { withCredentials: true });
    return response.data;
})

export const resetScore = createAsyncThunk("resetScore", async () => {
    const response = await clientAxios.get(`/minigames/resetScore` , { withCredentials : true});
    return response.data;
})