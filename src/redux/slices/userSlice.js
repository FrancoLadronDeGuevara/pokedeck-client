import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUser, updateUser, deleteUser } from "../actions/userActions";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        user: {},
        loading: false,
        searchData: [],
    },
    reducers: {
        searchUser: (state, action) => {
            state.searchData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = true;
                state.user = action.payload;

            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.map((element) =>
                    element.id === action.payload.id ? action.payload : element
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.list = state.list.filter((element) => element.id !== id);
                }
                console.log("delete action", action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = true;
                state.list = action.payload;
            });
    },
})

export const { searchUser } = userSlice.actions;

export default userSlice.reducer;