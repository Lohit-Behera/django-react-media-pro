import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDownScale = createAsyncThunk('down/scale', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/downscale/',
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

export const fetchGetDownScale = createAsyncThunk('get/downscale', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/image/downscale/${id}/`,
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

const downScaleSlice = createSlice({
    name: "Convert",
    initialState: {
        downScale: null,
        downScaleStatus: "idle",
        downScaleError: null,

        getDownScale: null,
        getDownScaleStatus: "idle",
        getDownScaleError: null,
    },
    reducers:{
        resetDownScale: (state) => {
            state.downScale = null;
            state.downScaleStatus = "idle";
            state.downScaleError = null;
            
            state.getDownScale = null;
            state.getDownScaleStatus = "idle";
            state.getDownScaleError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDownScale.pending, (state) => {
                state.downScaleStatus = "loading";
            })
            .addCase(fetchDownScale.fulfilled, (state, action) => {
                state.downScaleStatus = "succeeded";
                state.downScale = action.payload;
            })
            .addCase(fetchDownScale.rejected, (state, action) => {
                state.downScaleStatus = "failed";
                state.downScaleError = action.payload;
            })
            .addCase(fetchGetDownScale.pending, (state) => {
                state.getDownScaleStatus = "loading";
            })
            .addCase(fetchGetDownScale.fulfilled, (state, action) => {
                state.getDownScaleStatus = "succeeded";
                state.getDownScale = action.payload;
            })
            .addCase(fetchGetDownScale.rejected, (state, action) => {
                state.getDownScaleStatus = "failed";
                state.getDownScaleError = action.payload;
            });
    }
});

export const { resetDownScale } = downScaleSlice.actions
export default downScaleSlice.reducer