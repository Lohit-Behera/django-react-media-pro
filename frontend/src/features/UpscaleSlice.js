import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUpscale = createAsyncThunk('upscale/image', async (id, { rejectWithValue, getState }) => {
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
    },
    reducers:{},
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
    }
});

export default upscaleSlice.reducer