import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

export const signIn = createAsyncThunk("users/fetchLogin",
    async (params) => {
        const { data } = await Axios.post('/user/signin', params.form);
        localStorage.setItem('profile', JSON.stringify(data));
        params.navigate('/');
        return data
    }
)

export const signUp = createAsyncThunk("users/fetchRegister",
    async (params) => {
        const { data } = await Axios.post('/user/signup', params.form);
        localStorage.setItem('profile', JSON.stringify(data));
        params.navigate('/');
        return data
    }
)

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear()
            state.user = null
        },
        getMe: (state) => {
            state.user = JSON.parse(localStorage.getItem('profile')) || null
        },
    },
    extraReducers: {
        [signIn.pending]: (state) => {
            state.user = null
        },
        [signIn.fulfilled]: (state, { payload }) => {
            state.user = payload
        },
        
        [signIn.rejected]: (state, { payload }) => {
            state.user = null
        },
        [signUp.fulfilled]: (state, { payload }) => {
            state.user = payload
        }
    }
})

export const { logout, getMe } = userSlice.actions

export default userSlice.reducer
