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

const removeBgSlice = createSlice({
    name: "removeBg",
    initialState: {
        removeBg: null,
        removeBgStatus: "idle",
        removeBgError: null,
    },
    reducers:{},
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
    }
});

export default removeBgSlice.reducer