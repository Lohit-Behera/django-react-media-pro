import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk('user/login', async (user, { rejectWithValue }) => {
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


export const fetchUserDetails = createAsyncThunk('user/details', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/user/details/${id}/`,
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

export const fetchUserUpdate = createAsyncThunk('user/update', async (user, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(
            `/api/user/update/${user.id}/`,
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

        userdetails: null,
        userdetailsStatus: "idle",
        userdetailsError: null,

        userUpdate: null,
        userUpdateStatus: "idle",
        userUpdateError: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userInfo");
            state.userInfo = null;
            state.userInfoStatus = "idle";
            state.userInfoError = null;
        },
        resetRegister: (state) => {
            state.register = null;
            state.regisrerStatus = "idle";
            state.registerError = null;
        }
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
            })

            .addCase(fetchUserDetails.pending, (state) => {
                state.userdetailsStatus = "loading";
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.userdetailsStatus = "succeeded";
                state.userdetails = action.payload;
            })
            .addCase(fetchUserDetails.rejected, (state, action) => {
                state.userdetailsStatus = "failed";
                state.userdetailsError = action.payload;
            })

            .addCase(fetchUserUpdate.pending, (state) => {
                state.userUpdateStatus = "loading";
            })
            .addCase(fetchUserUpdate.fulfilled, (state, action) => {
                state.userUpdateStatus = "succeeded";
                state.userUpdate = action.payload;
            })
            .addCase(fetchUserUpdate.rejected, (state, action) => {
                state.userUpdateStatus = "failed";
                state.userUpdateError = action.payload;
            });
    },
});


export const { logout, resetRegister } = userSlice.actions

export default userSlice.reducer