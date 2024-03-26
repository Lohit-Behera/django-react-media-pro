import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchImageUpload = createAsyncThunk('image/upload', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            '/api/image/upload/',
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

const imageUploadSlice = createSlice({
    name: "image",
    initialState: {
        imageUpload: null,
        imageUploadStatus: "idle",
        imageUploadError: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchImageUpload.pending, (state) => {
                state.imageUploadStatus = "loading";
            })
            .addCase(fetchImageUpload.fulfilled, (state, action) => {
                state.imageUpload = action.payload;
                state.imageUploadStatus = "succeeded";
            })
            .addCase(fetchImageUpload.rejected, (state, action) => {
                state.imageUploadError = action.error.message;
                state.imageUploadStatus = "failed";
            })
    }
});

export default imageUploadSlice.reducer