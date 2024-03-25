import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
    
    console.log(user);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const { data } = await axios.post(
            '/api/user/login/',
            user,
            config
        );

        localStorage.setItem('userInfo', JSON.stringify(data));
        
        return data;
    } catch (error) {

        return rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

export const fetchRegister = createAsyncThunk('user/register', async (user, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const { data } = await axios.post(
            '/api/user/register/',
            user,
            config
        );

        return data;

    } catch (error) {

        return rejectWithValue(
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        );
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
        userInfoStatus: "idle",
        userInfoError: null,
        register: null,
        regisrerStatus: "idle",
        registerError: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userInfo");
            state.userInfo = null;
            state.userInfoStatus = "idle";
            state.userInfoError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.userInfoStatus = "loading";
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.userInfoStatus = "succeeded";
                state.userInfo = action.payload;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.userInfoStatus = "failed";
                state.userInfoError = action.payload;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.regisrerStatus = "loading";
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.regisrerStatus = "succeeded";
                state.register = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.regisrerStatus = "failed";
                state.registerError = action.payload;
            });
    },
});


export const { logout } = userSlice.actions

export default userSlice.reducer