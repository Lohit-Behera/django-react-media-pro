import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnimal = createAsyncThunk('animal/image', async (image, { rejectWithValue, getState }) => {
    try {
        const { user: { userInfo } = {} } = getState();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(
            '/api/image/animal/',
            image,
            config
        );
        return data;
    } catch (error) {
        return rejectWithValue(
            error.response && error.response.data
            ? error.response.data
            : error
        );
    }
})


const animalSlice = createSlice({
    name: 'animal',
    initialState: {
        animal: null,
        animalStatus: 'idle',
        animalError: null
    },
    reducers: {
        animalReset: (state) => {
            state.animal = null;
            state.animalStatus = 'idle';
            state.animalError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimal.pending, (state) => {
                state.animalStatus = 'loading';
            })
            .addCase(fetchAnimal.fulfilled, (state, action) => {
                state.animalStatus = 'succeeded';
                state.animal = action.payload;
            })
            .addCase(fetchAnimal.rejected, (state, action) => {
                state.animalStatus = 'failed';
                state.animalError = action.payload;
            })
    }
})

export const { animalReset } = animalSlice.actions
export default animalSlice.reducer