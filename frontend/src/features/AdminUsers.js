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

export const fetchRemoveAdmin = createAsyncThunk('remove/admin', async (user, { rejectWithValue, getState }) => {
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

export const fetchDeleteUser = createAsyncThunk('delete/user', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(
            `/api/user/userdelete/${id}/`,
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
        adminError: null,

        removeAdmin: null,
        removeAdminStatus: 'idle',
        removeAdminError: null,

        deleteUser: null,
        deleteUserStatus: 'idle',
        deleteUserError: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetAllUsers.pending, (state) => {
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

            .addCase(fetchGiveAdmin.pending, (state) => {
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

            .addCase(fetchRemoveAdmin.pending, (state) => {
                state.removeAdminStatus = 'loading';
            })
            .addCase(fetchRemoveAdmin.fulfilled, (state, action) => {
                state.removeAdminStatus = 'succeeded';
                state.removeAdmin = action.payload;
            })
            .addCase(fetchRemoveAdmin.rejected, (state, action) => {
                state.removeAdminStatus = 'failed';
                state.removeAdminError = action.error.message;
            })

            .addCase(fetchDeleteUser.pending, (state) => {
                state.deleteUserStatus = 'loading';
            })
            .addCase(fetchDeleteUser.fulfilled, (state, action) => {
                state.deleteUserStatus = 'succeeded';
                state.deleteUser = action.payload;
            })
            .addCase(fetchDeleteUser.rejected, (state, action) => {
                state.deleteUserStatus = 'failed';
                state.deleteUserError = action.error.message;
            })
    }
})

export default adminUserSlice.reducer