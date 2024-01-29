import { createSlice } from "@reduxjs/toolkit";
import { getAllChests } from "../actions/chestActions";

const chestSlice = createSlice({
    name: 'chests',
    initialState: {
        chests: [],
        chest: {},
        loading: false,
    },
    reducers: {
        
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getAllChests.pending, (state) =>{
            state.loading = true;
        })
        .addCase(getAllChests.fulfilled, (state, action) =>{
            state.loading = false;
            state.error = null;
            state.chests = action.payload;
        })
        .addCase(getAllChests.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default chestSlice.reducer;