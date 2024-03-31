import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDeleteImages = createAsyncThunk('delete/images', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            '/api/user/delete/',
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

export const fetchDeleteRawImages = createAsyncThunk('delete/rawimages', async (_, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.delete(
            '/api/user/deleteraw/',
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

const deleteImagesSlice = createSlice({
    name: 'delete/images',
    initialState: {
        delete: null,
        deleteStatus: 'idle',
        deleteError: null,

        deleteRaw: null,
        deleteRawStatus: 'idle',
        deleteRawError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeleteImages.pending, (state) => {
                state.deleteStatus = 'loading';
            })
            .addCase(fetchDeleteImages.fulfilled, (state, action) => {
                state.deleteStatus = 'succeeded';
                state.delete = action.payload;
            })
            .addCase(fetchDeleteImages.rejected, (state, action) => {
                state.deleteStatus = 'failed';
                state.deleteError = action.payload;
            })

            .addCase(fetchDeleteRawImages.pending, (state) => {
                state.deleteRawStatus = 'loading';
            })
            .addCase(fetchDeleteRawImages.fulfilled, (state, action) => {
                state.deleteRawStatus = 'succeeded';
                state.deleteRaw = action.payload;
            })
            .addCase(fetchDeleteRawImages.rejected, (state, action) => {
                state.deleteRawStatus = 'failed';
                state.deleteRawError = action.payload;
            })
    }
});
export default deleteImagesSlice.reducer