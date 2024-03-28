import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFilter = createAsyncThunk('filter/image', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/filterd/',
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

export const fetchGetFilter = createAsyncThunk('get/filter', async (id, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(
            `/api/image/filterd/${id}/`,
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

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filter: null,
        filterStatus: "idle",
        filterError: null,

        getfilter: null,
        getfilterStatus: "idle",
        getfilterError: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilter.pending, (state) => {
                state.filterStatus = "loading";
            })
            .addCase(fetchFilter.fulfilled, (state, action) => {
                state.filterStatus = "succeeded";
                state.filter = action.payload;
            })
            .addCase(fetchFilter.rejected, (state, action) => {
                state.filterStatus = "failed";
                state.filterError = action.error.message;
            })
            .addCase(fetchGetFilter.pending, (state) => {
                state.getfilterStatus = "loading";
            })
            .addCase(fetchGetFilter.fulfilled, (state, action) => {
                state.getfilterStatus = "succeeded";
                state.getfilter = action.payload;
            })
            .addCase(fetchGetFilter.rejected, (state, action) => {
                state.getfilterStatus = "failed";
                state.getfilterError = action.error.message;
            });
    }
});

export default filterSlice.reducer