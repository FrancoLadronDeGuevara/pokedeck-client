import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";

export const getAllChests = createAsyncThunk("getAllChests", async () => {
    const response = await clientAxios.get(`/chests`, {withCredentials: true});
    return response.data
})

export const editChest = createAsyncThunk("editChest", async (data) => {
    const response = await clientAxios.patch(`/chests/edit/${data.id}`, data, {withCredentials: true});
    return response.data;
})