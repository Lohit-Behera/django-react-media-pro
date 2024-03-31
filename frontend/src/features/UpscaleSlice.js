import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUpscale = createAsyncThunk('upscale/image', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/upscale/',
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

export const fetchGetUpscale = createAsyncThunk('getupscale/image', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(
            `/api/image/upscale/${id}`,
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

const upscaleSlice = createSlice({
    name: "image",
    initialState: {
        upscale: null,
        upscaleStatus: "idle",
        upscaleError: null,

        getUpscale: null,
        getUpscaleStatus: "idle",
        getUpscaleError: null,
    },
    reducers:{
        resetUpscale: (state) => {
            state.upscale = null;
            state.upscaleStatus = "idle";
            state.upscaleError = null;

            state.getUpscale = null;
            state.getUpscaleStatus = "idle";
            state.getUpscaleError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpscale.pending, (state) => {
                state.upscaleStatus = "loading";
            })
            .addCase(fetchUpscale.fulfilled, (state, action) => {
                state.upscaleStatus = "succeeded";
                state.upscale = action.payload;
            })
            .addCase(fetchUpscale.rejected, (state, action) => {
                state.upscaleStatus = "failed";
                state.upscaleError = action.error.message;
            })

            .addCase(fetchGetUpscale.pending, (state) => {
                state.getUpscaleStatus = "loading";
            })
            .addCase(fetchGetUpscale.fulfilled, (state, action) => {
                state.getUpscaleStatus = "succeeded";
                state.getUpscale = action.payload;
            })
            .addCase(fetchGetUpscale.rejected, (state, action) => {
                state.getUpscaleStatus = "failed";
                state.getUpscaleError = action.error.message;
            })
    }
});

export const { resetUpscale } = upscaleSlice.actions
export default upscaleSlice.reducer