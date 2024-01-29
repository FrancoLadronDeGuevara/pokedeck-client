import { createAsyncThunk } from "@reduxjs/toolkit";
import clientAxios from "../../utils/clientAxios";

export const getAllChests = createAsyncThunk("getAllChests", async () => {
    const response = await clientAxios.get(`/chests`, {withCredentials: true});
    return response.data
})