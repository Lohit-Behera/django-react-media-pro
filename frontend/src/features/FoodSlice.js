import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFood = createAsyncThunk('food/image', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            '/api/image/food/',
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
})


const foodSlice = createSlice({
    name: 'food',
    initialState: {
        food: null,
        foodStatus: 'idle',
        foodError: null
    },
    reducers: {
        resetFood: (state) => {
            state.food = null;
            state.foodStatus = 'idle';
            state.foodError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFood.pending, (state) => {
                state.foodStatus = 'loading';
            })
            .addCase(fetchFood.fulfilled, (state, action) => {
                state.foodStatus = 'succeeded';
                state.food = action.payload;
            })
            .addCase(fetchFood.rejected, (state, action) => {
                state.foodStatus = 'failed';
                state.foodError = action.error.message;
            })
    }
})

export const { resetFood } = foodSlice.actions
export default foodSlice.reducer