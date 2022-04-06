import userApi from 'api/userApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        // call API 
        const data = await userApi.register(payload);
        // save data to local storage
        localStorage.setItem('accsess_token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        return {}
    })
export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        // call API 
        const data = await userApi.login(payload);
        // save data to local storage
        localStorage.setItem('accsess_token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        return {}
    })

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: {},
        settings: {}
    },
    reducers: {},
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    }
})

const { reducer } = userSlice
export default reducer