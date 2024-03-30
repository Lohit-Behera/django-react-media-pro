import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetAllUsers = createAsyncThunk('get/users', async (page, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/user/allusers/?page=${page}`,
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

})

export const fetchGiveAdmin = createAsyncThunk('give/admin', async (user, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/user/useredit/${user.id}/`,
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

})

const adminUserSlice = createSlice({
    name: 'admin/user',
    initialState: {
        allUsers: null,
        allUsersStatus: 'idle',
        allUsersError: null,
        admin: null,
        adminStatus: 'idle',
        adminError: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllUsers.pending, (state, action) => {
                state.allUsersStatus = 'loading';
            })
            .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
                state.allUsersStatus = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(fetchGetAllUsers.rejected, (state, action) => {
                state.allUsersStatus = 'failed';
                state.allUsersError = action.error.message;
            })
            .addCase(fetchGiveAdmin.pending, (state, action) => {
                state.adminStatus = 'loading';
            })
            .addCase(fetchGiveAdmin.fulfilled, (state, action) => {
                state.adminStatus = 'succeeded';
                state.admin = action.payload;
            })
            .addCase(fetchGiveAdmin.rejected, (state, action) => {
                state.adminStatus = 'failed';
                state.adminError = action.error.message;
            })
    }
})

export default adminUserSlice.reducer