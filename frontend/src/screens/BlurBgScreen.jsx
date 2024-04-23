import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchBlurBg, fetchGetBlurBg, reset } from "@/features/BlurBgSlice";

import Loader from "@/components/Loader/Loader";
import ServerError from "@/components/ServerError";
import CustomAlert from "@/components/CustomAlert";
import DragNDrop from "@/components/DragNDrop";
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

function BlurBgScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const blurBg = useSelector((state) => state.blurBg.blurBg);
  const getBlurBg = useSelector((state) => state.blurBg.getBlurBg);
  const blurBgStatus = useSelector((state) => state.blurBg.blurBgStatus);
  const getBlurBgStatus = useSelector((state) => state.blurBg.getBlurBgStatus);

  const blurBgImage = getBlurBg ? getBlurBg.result : "";
  const original = getBlurBg ? getBlurBg.original : "";

  const is_verified = userInfo ? userInfo.is_verified : false;

  useEffect(() => {
    if (!is_verified) {
      navigate("/login");
      console.log(userInfo);
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (blurBgStatus === "succeeded") {
      dispatch(fetchGetBlurBg(blurBg.id));
    }
  }, [blurBgStatus, dispatch, blurBg]);

  const [model, setModel] = useState("general");
  const [blur, setBlur] = useState("medium");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    if (file.type.startsWith("image/")) {
      dispatch(
        fetchBlurBg({
          image: file,
          model: model,
          blur: blur,
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
        fetchBlurBg({
          image: file,
          model: model,
          blur: blur,
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

  const animeHandler = () => {
    setModel("anime");
  };

  const generalHandler = () => {
    setModel("general");
  };

  const lastHandler = () => {
    setModel("last");
  };

  const lowHandler = () => {
    setBlur("low");
  };

  const mediumlHandler = () => {
    setBlur("medium");
  };

  const highHandler = () => {
    setBlur("high");
  };

  const resetHandler = () => {
    dispatch(reset());
    setIsDragging(false);
    setModel("general");
    setBlur("medium");
    setDisable(false);
  };

  return (
    <>
      {blurBgStatus === "succeeded" && (
        <CustomAlert
          title="Success"
          description="Image uploaded successfully"
          variant="success"
          setOpenProp
        />
      )}
      {blurBgStatus === "failed" && (
        <CustomAlert
          title="Failed"
          description="Something went wrong"
          variant="destructive"
          setOpenProp
        />
      )}
      {isDragOver && (
        <CustomAlert
          title="Failed"
          description="Please select an image"
          variant="destructive"
          setOpenProp
        />
      )}
      {blurBgStatus === "failed" ? (
        <ServerError />
      ) : (
        <div className="w-full min-h-screen mx-auto flex justify-center">
          <Card className="w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl text-center">
                Blur Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full flex flex-col my-2 space-y-4">
                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                  <p className="text-center">
                    Before uploading the image choose image type if both not
                    work use other and select blur amount
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={model === "anime" ? "default" : "outline"}
                      disabled={disable}
                      onClick={animeHandler}
                    >
                      Anime
                    </Button>
                    <Button
                      variant={model === "general" ? "default" : "outline"}
                      disabled={disable}
                      onClick={generalHandler}
                    >
                      General
                    </Button>
                    <Button
                      variant={model === "last" ? "default" : "outline"}
                      disabled={disable}
                      onClick={lastHandler}
                    >
                      Other
                    </Button>
                    <Button
                      variant={blur === "low" ? "default" : "outline"}
                      disabled={disable}
                      onClick={lowHandler}
                    >
                      Low Blur
                    </Button>
                    <Button
                      variant={blur === "medium" ? "default" : "outline"}
                      disabled={disable}
                      onClick={mediumlHandler}
                    >
                      Medium Blur
                    </Button>
                    <Button
                      variant={blur === "high" ? "default" : "outline"}
                      disabled={disable}
                      onClick={highHandler}
                    >
                      High Blur
                    </Button>
                  </div>
                </div>
                {blurBgStatus === "idle" ? (
                  <>
                    <DragNDrop
                      handleDrop={handleDrop}
                      uploadHandler={uploadHandler}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  </>
                ) : blurBgStatus === "loading" ? (
                  <Loader />
                ) : null}
              </div>
            </CardContent>
            {getBlurBgStatus === "succeeded" && (
              <CardFooter>
                <div className="flex flex-col w-full space-y-4">
                  <p className="text-center text-lg mb-4 font-semibold">
                    Compare
                  </p>
                  <div className="w-full h-auto">
                    <ImageCompare
                      leftImg={original}
                      rightImg={blurBgImage}
                      leftLabel="Original"
                      rightLabel="Blur Bg"
                      disabledLable={false}
                    />
                  </div>
                  <a
                    href={blurBgImage}
                    download={`blurBgImage.png`}
                    className="w-full"
                  >
                    <Button className="w-full">Download</Button>
                  </a>
                  <Button className="w-full" onClick={resetHandler}>
                    Another Image
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default BlurBgScreen;
