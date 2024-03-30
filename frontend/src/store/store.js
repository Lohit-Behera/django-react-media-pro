import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import ImageUploadSlice from "@/features/ImageUploadSlice";
import upscaleSlice from "@/features/UpscaleSlice";
import removeBgSlice from "@/features/RemoveBgSlice";
import BlurBgSlice from "@/features/BlurBgSlice";
import FilterSlice from "@/features/FilterSlice";
import ConvertSlice from "@/features/ConvertSlice";
import DownScaleSlice from "@/features/DownScaleSlice";
import DeleteImagesSlice from "@/features/DeleteImagesSlice";
import AdminUsers from "@/features/AdminUsers";

const store = configureStore({
    reducer: {
        user: UserSlice,
        imageUpload: ImageUploadSlice,
        upscale: upscaleSlice,
        removeBg: removeBgSlice,
        blurBg: BlurBgSlice,
        filter: FilterSlice,
        convert: ConvertSlice,
        downScale: DownScaleSlice,
        deleteImages: DeleteImagesSlice,
        adminUsers: AdminUsers,
    },
});

export default store