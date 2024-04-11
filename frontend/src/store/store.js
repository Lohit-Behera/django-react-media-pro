import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/features/UserSlice";
import upscaleSlice from "@/features/UpscaleSlice";
import removeBgSlice from "@/features/RemoveBgSlice";
import BlurBgSlice from "@/features/BlurBgSlice";
import FilterSlice from "@/features/FilterSlice";
import ConvertSlice from "@/features/ConvertSlice";
import DownScaleSlice from "@/features/DownScaleSlice";
import DeleteImagesSlice from "@/features/DeleteImagesSlice";
import AdminUsers from "@/features/AdminUsers";
import GrayScaleBgSlice from "@/features/GrayScaleBgSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        upscale: upscaleSlice,
        removeBg: removeBgSlice,
        blurBg: BlurBgSlice,
        grayScaleBg: GrayScaleBgSlice,
        filter: FilterSlice,
        convert: ConvertSlice,
        downScale: DownScaleSlice,
        deleteImages: DeleteImagesSlice,
        adminUsers: AdminUsers,

    },
});

export default store