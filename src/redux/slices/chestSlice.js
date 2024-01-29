import { createSlice } from "@reduxjs/toolkit";
import { editChest, getAllChests } from "../actions/chestActions";

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

        .addCase(editChest.pending, (state) => {
            state.loading = true;
        })
        .addCase(editChest.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.chests = state.chests.map(chest => {
                if (chest.id === action.payload.id) {
                    return action.payload
                }
                return chest;
            })
        })
        .addCase(editChest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})

export default chestSlice.reducer;