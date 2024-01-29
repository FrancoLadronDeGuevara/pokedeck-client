import { createSlice } from "@reduxjs/toolkit";
import { getCard, editCard, deleteCard, getAllCards} from "../actions/cardActions";

const cardSlice = createSlice({
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
                state.cards = action.payload.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
            })
            .addCase(getAllCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
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
                state.error = action.payload;
            })

            .addCase(deleteCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.cards = state.cards.filter((card) => card.id !== id);
                }
            })
            .addCase(deleteCard.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload;
            });
    },
})


export default cardSlice.reducer;