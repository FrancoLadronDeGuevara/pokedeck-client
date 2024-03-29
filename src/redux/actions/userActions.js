import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";


export const getUser = createAsyncThunk("getUser", async () => {
    const response = await clientAxios.get(`/users/get-user`);
    return response.data;
});

export const getUserDeck = createAsyncThunk("getUserDeck", async () => {
    const response = await clientAxios.get(`/users/user-deck`);
    return response.data;
})

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    const response = await clientAxios.get(`/users`);
    return response.data;
})

export const editUser = createAsyncThunk("editUser", async (data) => {
    const response = await clientAxios.patch(`/users/edit/${data.id}`, data);
    return response.data;
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
    const response = await clientAxios.patch(`/users/update/${data.id}`, data);
    return response.data;
});

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
    const response = await clientAxios.delete(`/users/delete/${id}`);
    return response.data;
});

export const getCoins = createAsyncThunk("getCoins", async (data) => {
    const response = await clientAxios.patch(`/minigames/guessPokemonCoins`, data);
    return response.data;
})

export const getFlapHaunterCoins = createAsyncThunk("getFlapHaunterCoins", async (data) => {
    const response = await clientAxios.patch(`/minigames/flap-haunter-coins`, data);
    return response.data;
})

export const spinWheel = createAsyncThunk("spinWheel", async () => {
    const response = await clientAxios.patch(`/minigames/spin-wheel`);
    return response.data;
})

export const resetScore = createAsyncThunk("resetScore", async () => {
    const response = await clientAxios.get(`/minigames/resetScore`);
    return response.data;
})

export const sellCard = createAsyncThunk("sellCard", async (data) => {
    const response = await clientAxios.post(`/cards/sell-card`, data);
    return response.data;
})