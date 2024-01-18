import { createSlice } from "@reduxjs/toolkit";
import { getUser, editUser, deleteUser, getAllUsers, updateUser, login } from "../actions/userActions";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isAuthenticated: false,
        users: [],
        user: {},
        loading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
            })

            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.error.message;
            })

            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
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

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
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