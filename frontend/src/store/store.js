import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import ImageUploadSlice from "@/features/ImageUploadSlice";
import upscaleSlice from "@/features/UpscaleSlice";
import removeBgSlice from "@/features/RemoveBgSlice";
import BlurBgSlice from "@/features/BlurBgSlice";
import FilterSlice from "@/features/FilterSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        imageUpload: ImageUploadSlice,
        upscale: upscaleSlice,
        removeBg: removeBgSlice,
        blurBg: BlurBgSlice,
        filter: FilterSlice,
    },
});

export default store