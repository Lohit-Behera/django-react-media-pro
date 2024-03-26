import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import ImageUploadSlice from "@/features/ImageUploadSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        imageUpload: ImageUploadSlice,
    },
});

export default store