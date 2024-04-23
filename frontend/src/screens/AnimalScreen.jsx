import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimal, animalReset } from "@/features/AnimalSlice";

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

function AnimalScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.userInfo);
  const animal = useSelector((state) => state.animal.animal);
  const animalStatus = useSelector((state) => state.animal.animalStatus);

  const prediction = animal ? animal.prediction : "";
  const original = animal ? animal.original : "";

  const [isDragOver, setIsDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const is_verified = userInfo ? userInfo.is_verified : false;

  useEffect(() => {
    if (!is_verified) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setIsDragging(false);
    if (file.type.startsWith("image/")) {
      dispatch(
        fetchAnimal({
          image: file,
        })
      );
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
        fetchAnimal({
          image: file,
        })
      );
    } else {
      setIsDragOver(true);
      const timer = setTimeout(() => {
        setIsDragOver(false);
      }, 3700);
      return () => clearTimeout(timer);
    }
  };

  const resetHandler = () => {
    dispatch(animalReset());
    setIsDragging(false);
  };

  return (
    <>
      {animalStatus === "succeeded" && (
        <CustomAlert
          title="Success"
          description="Image uploaded successfully"
          variant="success"
          setOpenProp
        />
      )}
      {animalStatus === "failed" && (
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

      {animalStatus === "failed" ? (
        <ServerError />
      ) : (
        <div className="w-full min-h-screen mx-auto flex justify-center items-center">
          <Card className="w-[95%] md:w-[80%] lg:w-[60%] mt-10">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl text-center">
                Predict Image of an Animal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 my-2 items-center ">
                <div className="flex flex-col text-center space-y-2 text-sm md:text-base">
                  <p>
                    It can only predict 40 types and it has a 90% accuracy and
                    it only predicts one animal per image. Names of animals are
                    Bear, Bee, Butterfly, Cat, Cheetah, Chicken, Chimpanzee,
                    Cow, Crocodile, Deer, Dog, Dolphin, Eagle, Elephant, Fox,
                    Goat, Goldfish, Horse, Jellyfish, Kangaroo, Koala, Lion,
                    Octopus, Owl, Panda, Parrot, Penguin, Pig, Pigeon, Rabbit,
                    Raccoon, Rhinoceros, Sheep, Spider, Squirrel, Starfish,
                    Swan, Tiger, Whale and Zebra.{" "}
                  </p>
                </div>
                {animalStatus === "idle" ? (
                  <>
                    <DragNDrop
                      handleDrop={handleDrop}
                      uploadHandler={uploadHandler}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  </>
                ) : animalStatus === "loading" ? (
                  <Loader />
                ) : null}
              </div>
            </CardContent>
            <CardFooter>
              {animalStatus === "succeeded" && (
                <div className="flex flex-col w-full space-y-4">
                  <h1 className="text-center text-2xl font-semibold">
                    it is a {prediction}
                  </h1>
                  <CustomImage scr={original} alt="image" />
                  <Button className="w-full" onClick={resetHandler}>
                    Another Image
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}

export default AnimalScreen;
