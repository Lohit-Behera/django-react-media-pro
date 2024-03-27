import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlurBg = createAsyncThunk('blur/bg', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/blurbg/',
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

export const fetchGetBlurBg = createAsyncThunk('get/blurbg', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/image/blurbg/${id}/`,
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

const blurBgSlice = createSlice({
    name: "removeBg",
    initialState: {
        blurBg: null,
        blurBgStatus: "idle",
        blurBgError: null,

        getBlurBg: null,
        getBlurBgStatus: "idle",
        getBlurBgError: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlurBg.pending, (state) => {
                state.blurBgStatus = "loading";
            })
            .addCase(fetchBlurBg.fulfilled, (state, action) => {
                state.blurBgStatus = "succeeded";
                state.blurBg = action.payload;
            })
            .addCase(fetchBlurBg.rejected, (state, action) => {
                state.blurBgStatus = "failed";
                state.blurBgError = action.error.message;
            })
            .addCase(fetchGetBlurBg.pending, (state) => {
                state.getBlurBgStatus = "loading";
            })
            .addCase(fetchGetBlurBg.fulfilled, (state, action) => {
                state.getBlurBgStatus = "succeeded";
                state.getBlurBg = action.payload;
            })
            .addCase(fetchGetBlurBg.rejected, (state, action) => {
                state.getBlurBgStatus = "failed";
                state.getBlurBgError = action.error.message;
            });
    }
});

export default blurBgSlice.reducer