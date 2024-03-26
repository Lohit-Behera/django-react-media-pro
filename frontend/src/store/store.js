import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import ImageUploadSlice from "@/features/ImageUploadSlice";
import upscaleSlice from "@/features/UpscaleSlice";
import removeBgSlice from "@/features/RemoveBgSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        imageUpload: ImageUploadSlice,
        upscale: upscaleSlice,
        removeBg: removeBgSlice,
    },
});

export default store