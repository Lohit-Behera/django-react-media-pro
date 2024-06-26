import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUpscale,
  fetchGetUpscale,
  resetUpscale,
} from "@/features/UpscaleSlice";
import DragNDrop from "@/components/DragNDrop";
import ServerError from "@/components/ServerError";
import Loader from "@/components/Loader/Loader";
import CustomAlert from "@/components/CustomAlert";
import ImageCompare from "@/components/ImageCompare";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function UpscaleScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scale, setScale] = useState("2");
  const [isDragOver, setIsDragOver] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);
  const upscale = useSelector((state) => state.upscale.upscale);
  const getUpscale = useSelector((state) => state.upscale.getUpscale);
  const upscaleStatus = useSelector((state) => state.upscale.upscaleStatus);
  const getUpscaleStatus = useSelector(
    (state) => state.upscale.getUpscaleStatus
  );
  const upscaleError = useSelector((state) => state.upscale.upscaleError);
  const detailsError = upscaleError ? upscaleError.details : "";
  const errorMessage = upscaleError ? upscaleError.message : "";

  const original = getUpscale ? getUpscale.original : "";
  const upscaleImage = getUpscale ? getUpscale.result : "";
  const [isDragging, setIsDragging] = useState(false);
  const [disable, setDisable] = useState(false);

  const is_verified = userInfo ? userInfo.is_verified : false;

  useEffect(() => {
    if (!is_verified) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (upscaleStatus === "succeeded") {
      dispatch(fetchGetUpscale(upscale.id));
    }
  }, [upscaleStatus, dispatch, upscale]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      dispatch(
        fetchUpscale({
          scaling: scale,
          image: file,
        })
      );
      setDisable(true);
    } else {
      setIsDragOver(true);
      const timer = setTimeout(() => {
        setIsDragOver(false);
      }, 3700);
      return () => clearTimeout(timer);
    }
  };

  const uploadHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.type.startsWith("image/")) {
      dispatch(
        fetchUpscale({
          scaling: scale,
          image: file,
        })
      );
      setDisable(true);
    } else {
      setIsDragOver(true);
      const timer = setTimeout(() => {
        setIsDragOver(false);
      }, 3700);
      return () => clearTimeout(timer);
    }
  };

  const scale2xHandler = () => {
    setScale("2");
  };

  const scale4xHandler = () => {
    setScale("4");
  };

  const resetHandler = () => {
    dispatch(resetUpscale());
    setIsDragging(false);
    setScale("2");
    setDisable(false);
  };

  return (
    <>
      {upscaleStatus === "succeeded" && (
        <CustomAlert
          title="Success"
          description="Image uploaded successfully"
          variant="success"
          setOpenProp
        />
      )}

      {detailsError === "Image is too large" ? (
        <CustomAlert
          title="Failed"
          description="Image is too large"
          variant="destructive"
          setOpenProp
        />
      ) : upscaleStatus === "failed" ? (
        <CustomAlert
          title="Failed"
          description="Something went wrong"
          variant="destructive"
          setOpenProp
        />
      ) : null}

      {isDragOver && (
        <CustomAlert
          title="Failed"
          description="Please select an image"
          variant="destructive"
          setOpenProp
        />
      )}
      {upscaleStatus === "failed" && errorMessage === "Network Error" ? (
        <ServerError />
      ) : (
        <div className="w-full min-h-screen mx-auto flex justify-center items-center">
          <Card className="w-[95%] md:w-[80%] lg:w-[60%] mt-10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Upscale Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2 my-2 items-center">
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-center">
                    Before uploading the image choose scaling and Image should
                    be less than 2560 x 1440
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={scale === "2" ? "default" : "outline"}
                      disabled={disable}
                      onClick={scale2xHandler}
                    >
                      Scale 2X
                    </Button>
                    <Button
                      variant={scale === "4" ? "default" : "outline"}
                      disabled={disable}
                      onClick={scale4xHandler}
                    >
                      Scale 4X
                    </Button>
                  </div>
                </div>
                {upscaleStatus === "idle" ? (
                  <>
                    <DragNDrop
                      handleDrop={handleDrop}
                      uploadHandler={uploadHandler}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  </>
                ) : upscaleStatus === "loading" ? (
                  <Loader />
                ) : null}
              </div>
            </CardContent>
            <CardFooter>
              {getUpscaleStatus === "succeeded" ? (
                <div className="flex flex-col w-full space-y-4">
                  <p className="text-center text-lg mb-4 font-semibold">
                    Compare
                  </p>
                  <div className="w-full h-auto">
                    <ImageCompare
                      leftImg={original}
                      rightImg={upscaleImage}
                      leftLabel="Original"
                      rightLabel="Upscaled"
                      disabledLable={false}
                    />
                  </div>
                  <a href={upscaleImage} download className="w-full">
                    <Button className="w-full">Download</Button>
                  </a>
                  <Button className="w-full" onClick={resetHandler}>
                    Another Image
                  </Button>
                </div>
              ) : detailsError === "Image is too large" ? (
                <div className="flex flex-col w-full space-y-4">
                  <p className="text-center text-xl mb-10">
                    Image is too large
                  </p>
                  <Button className="w-full" onClick={resetHandler}>
                    Another Image
                  </Button>
                </div>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}

export default UpscaleScreen;
