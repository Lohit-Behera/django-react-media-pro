import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRemoveBg = createAsyncThunk('remove/bg', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/removebg/',
            image,
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

export const fetchGetRemoveBg = createAsyncThunk('get/removebg', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/image/removebg/${id}/`,
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

const removeBgSlice = createSlice({
    name: "removeBg",
    initialState: {
        removeBg: null,
        removeBgStatus: "idle",
        removeBgError: null,

        getRemoveBg: null,
        getRemoveBgStatus: "idle",
        getRemoveBgError: null,
    },
    reducers:{
        resetRemoveBg: (state) => {
            state.removeBg = null
            state.removeBgStatus = "idle"
            state.removeBgError = null

            state.getRemoveBg = null
            state.getRemoveBgStatus = "idle"
            state.getRemoveBgError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRemoveBg.pending, (state) => {
                state.removeBgStatus = "loading";
            })
            .addCase(fetchRemoveBg.fulfilled, (state, action) => {
                state.removeBgStatus = "succeeded";
                state.removeBg = action.payload;
            })
            .addCase(fetchRemoveBg.rejected, (state, action) => {
                state.removeBgStatus = "failed";
                state.removeBgError = action.error.message;
            })
            .addCase(fetchGetRemoveBg.pending, (state) => {
                state.getRemoveBgStatus = "loading";
            })
            .addCase(fetchGetRemoveBg.fulfilled, (state, action) => {
                state.getRemoveBgStatus = "succeeded";
                state.getRemoveBg = action.payload;
            })
            .addCase(fetchGetRemoveBg.rejected, (state, action) => {
                state.getRemoveBgStatus = "failed";
                state.getRemoveBgError = action.error.message;
            });
    }
});

export const { resetRemoveBg } = removeBgSlice.actions
export default removeBgSlice.reducer