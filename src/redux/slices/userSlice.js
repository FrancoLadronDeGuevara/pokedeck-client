import { createSlice } from "@reduxjs/toolkit";
import { getUser, editUser, deleteUser, getAllUsers } from "../actions/userActions";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
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
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = true;
                state.users = action.payload;
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

            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.map(user => {
                    if (user.id === action.payload.id) {
                        return action.payload
                    }
                    return user;
                })
            })
            .addCase(editUser.rejected, (state, action) => {
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