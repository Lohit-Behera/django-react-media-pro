import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDownScale,
  fetchGetDownScale,
  resetDownScale,
} from "@/features/DownScaleSlice";

import CustomImage from "@/components/CustomImage";
import DragNDrop from "@/components/DragNDrop";
import Loader from "@/components/Loader/Loader";
import ServerError from "@/components/ServerError";
import CustomAlert from "@/components/CustomAlert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function DownScaleScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const downScale = useSelector((state) => state.downScale.downScale);
  const getDownScale = useSelector((state) => state.downScale.getDownScale);
  const downScaleStatus = useSelector(
    (state) => state.downScale.downScaleStatus
  );
  const getDownScaleStatus = useSelector(
    (state) => state.downScale.getDownScaleStatus
  );

  const downScaleImage = getDownScale ? getDownScale.result : "";

  const is_verified = userInfo ? userInfo.is_verified : false;

  useEffect(() => {
    if (!is_verified) {
      navigate("/login");
      console.log(userInfo);
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (downScaleStatus === "succeeded") {
      dispatch(fetchGetDownScale(downScale.id));
    }
  }, [downScaleStatus, dispatch, downScale]);

  const [scale, setScale] = useState("2");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
      dispatch(
        fetchDownScale({
          scale: scale,
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
        fetchDownScale({
          scale: scale,
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

  const downScale2x = () => {
    setScale("2");
  };

  const downScale4x = () => {
    setScale("4");
  };

  const resetHandler = () => {
    dispatch(resetDownScale());
    setIsDragging(false);
    setScale("2");
    setDisable(false);
  };

  return (
    <>
      {downScaleStatus === "succeeded" && (
        <CustomAlert
          title="Success"
          description="Image uploaded successfully"
          variant="success"
          setOpenProp
        />
      )}
      {downScaleStatus === "failed" && (
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

      {downScaleStatus === "failed" ? (
        <ServerError />
      ) : (
        <div className="w-full min-h-screen mx-auto flex justify-center">
          <Card className="w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl text-center">
                DownScale Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full flex flex-col space-y-4 my-2 items-center">
                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                  <p>Before uploading the image choose scale</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={scale === "2" ? "default" : "outline"}
                      disabled={disable}
                      onClick={downScale2x}
                    >
                      DownScale 2X
                    </Button>
                    <Button
                      variant={scale === "4" ? "default" : "outline"}
                      disabled={disable}
                      onClick={downScale4x}
                    >
                      DownScale 4X
                    </Button>
                  </div>
                </div>
                {downScaleStatus === "idle" ? (
                  <>
                    <DragNDrop
                      handleDrop={handleDrop}
                      uploadHandler={uploadHandler}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  </>
                ) : downScaleStatus === "loading" ? (
                  <Loader />
                ) : null}
              </div>
            </CardContent>
            {getDownScaleStatus === "succeeded" && (
              <CardFooter>
                <CustomImage
                  scr={downScaleImage}
                  alt="downscaled image"
                  btn={true}
                  reset={resetHandler}
                />
              </CardFooter>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default DownScaleScreen;
