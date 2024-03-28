import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchConvert = createAsyncThunk('convert/image', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/convert/',
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

export const fetchGetConvert = createAsyncThunk('get/convert', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/image/convert/${id}/`,
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

const convertSlice = createSlice({
    name: "Convert",
    initialState: {
        convert: null,
        convertStatus: "idle",
        convertError: null,

        getConvert: null,
        getConvertStatus: "idle",
        getConvertError: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConvert.pending, (state) => {
                state.convertStatus = "loading";
            })
            .addCase(fetchConvert.fulfilled, (state, action) => {
                state.convertStatus = "succeeded";
                state.convert = action.payload;
            })
            .addCase(fetchConvert.rejected, (state, action) => {
                state.convertStatus = "failed";
                state.convertError = action.error.message;
            })
            .addCase(fetchGetConvert.pending, (state) => {
                state.getConvertStatus = "loading";
            })
            .addCase(fetchGetConvert.fulfilled, (state, action) => {
                state.getConvertStatus = "succeeded";
                state.getConvert = action.payload;
            })
            .addCase(fetchGetConvert.rejected, (state, action) => {
                state.getConvertStatus = "failed";
                state.getConvertError = action.error.message;
            });
    }
});

export default convertSlice.reducer