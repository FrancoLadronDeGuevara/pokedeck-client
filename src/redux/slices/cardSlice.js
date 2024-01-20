import { createSlice } from "@reduxjs/toolkit";
import { getCard, editCard, deleteCard, getAllCards} from "../actions/cardActions";

const userCard = createSlice({
    name: 'cards',
    initialState: {
        cards: [],
        card: {},
        loading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCards.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cards = action.payload;
            })
            .addCase(getAllCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCard.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.card = action.payload;
            })
            .addCase(getCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(editCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(editCard.fulfilled, (state, action) => {
                state.loading = false;
                state.cards = state.cards.map(card => {
                    if (card.id === action.payload.id) {
                        return action.payload
                    }
                    return card;
                })
            })
            .addCase(editCard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            .addCase(deleteCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.list = state.list.filter((element) => element.id !== id);
                }
                console.log("delete action", action.payload);
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.loading = true;
                state.list = action.payload;
            });
    },
})


export default userCard.reducer;