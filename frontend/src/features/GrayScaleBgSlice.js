import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGrayScaleBg = createAsyncThunk('grayscale/bg', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/grayscalebg/',
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

export const fetchGetGrayScaleBg = createAsyncThunk('get/grayscalebg', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/image/grayscalebg/${id}/`,
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

const grayScaleBgSlice = createSlice({
    name: "grayScaleBg",
    initialState: {
        grayScaleBg: null,
        grayScaleBgStatus: "idle",
        grayScaleBgError: null,

        getGrayScaleBg: null,
        getGrayScaleBgStatus: "idle",
        getGrayScaleBgError: null,
    },
    reducers:{
        grayScaleBgReset: (state) => {
            state.grayScaleBg = null;
            state.grayScaleBgStatus = 'idle';
            state.grayScaleBgError = null;
            
            state.getGrayScaleBg = null;
            state.getGrayScaleBgStatus = 'idle';
            state.getGrayScaleBgError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGrayScaleBg.pending, (state) => {
                state.grayScaleBgStatus = "loading";
            })
            .addCase(fetchGrayScaleBg.fulfilled, (state, action) => {
                state.grayScaleBgStatus = "succeeded";
                state.grayScaleBg = action.payload;
            })
            .addCase(fetchGrayScaleBg.rejected, (state, action) => {
                state.grayScaleBgStatus = "failed";
                state.grayScaleBgError = action.payload;
            })
            .addCase(fetchGetGrayScaleBg.pending, (state) => {
                state.getGrayScaleBgStatus = "loading";
            })
            .addCase(fetchGetGrayScaleBg.fulfilled, (state, action) => {
                state.getGrayScaleBgStatus = "succeeded";
                state.getGrayScaleBg = action.payload;
            })
            .addCase(fetchGetGrayScaleBg.rejected, (state, action) => {
                state.getGrayScaleBgStatus = "failed";
                state.getGrayScaleBgError = action.payload;
            });
    }
});


export const { grayScaleBgReset } = grayScaleBgSlice.actions
export default grayScaleBgSlice.reducer