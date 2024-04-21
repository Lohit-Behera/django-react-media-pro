import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContactUs = createAsyncThunk('contactus', async (user, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.put(
            '/api/contactus/',
            user,
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
})


const contactUsSlice = createSlice({
    name: 'contactus',
    initialState: {
        contactus: null,
        contactusStatus: 'idle',
        contactusError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactUs.pending, (state) => {
                state.contactusStatus = 'loading';
            })
            .addCase(fetchContactUs.fulfilled, (state, action) => {
                state.contactusStatus = 'succeeded';
                state.contactus = action.payload;
            })
            .addCase(fetchContactUs.rejected, (state, action) => {
                state.contactusStatus = 'failed';
                state.contactusError = action.payload;
            })
    }
})
export default contactUsSlice.reducer