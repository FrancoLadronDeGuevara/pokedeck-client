import { createSlice } from "@reduxjs/toolkit";
import { getUser, editUser, deleteUser, getAllUsers, updateUser, getUserDeck, getCoins } from "../actions/userActions";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isAuthenticated: false,
        loading: true,
        userDeck: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })

            .addCase(getUserDeck.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDeck.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
                state.userDeck = action.payload;
            })
            .addCase(getUserDeck.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            .addCase(getCoins.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCoins.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user.coins = action.payload;
            })
            .addCase(getCoins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            

            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
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
                    state.users = state.users.filter((element) => element.id !== id);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    },
})

export default userSlice.reducer;