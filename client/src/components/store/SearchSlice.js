import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    text: "",
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.text = action.payload;
        },
    },

});

export const { setSearchQuery } = searchSlice.actions;

// Additional action creator
export const searchQuery = (query) => (dispatch) => {
    dispatch(setSearchQuery(query));
};

export default searchSlice.reducer;
