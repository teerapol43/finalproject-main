import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
    user: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = 'login'; // Update the state property
            state.user = action.payload;
        },
        logout: (state) => {
            state.value = []
            state.user = []
            localStorage.clear()
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload; // Update the state property
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;
