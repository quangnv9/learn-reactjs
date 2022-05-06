import userApi from 'api/userApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StorageKeys from 'constants/storage-key';

export const register = createAsyncThunk('user/register', async (payload) => {
    // call API
    const data = await userApi.register(payload);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return data.user;
});
export const login = createAsyncThunk('user/login', async (payload) => {
    // call API
    const data = await userApi.login(payload);
    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
    return data.user;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            // clear localstorage
            localStorage.removeItem(StorageKeys.USER);
            localStorage.removeItem(StorageKeys.TOKEN);

            state.currentUser = {};
        },
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
            console.log('Action: ', action);
        },
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
