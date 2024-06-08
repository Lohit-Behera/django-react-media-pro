import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFood, resetFood } from "@/features/FoodSlice";

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
  const food = useSelector((state) => state.food.food);
  const foodStatus = useSelector((state) => state.food.foodStatus);

  const prediction = food ? food.prediction : "";
  const original = food ? food.original : "";

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
        fetchFood({
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
        fetchFood({
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
    dispatch(resetFood());
    setIsDragging(false);
  };

  return (
    <>
      {foodStatus === "succeeded" && (
        <CustomAlert
          title="Success"
          description="Image uploaded successfully"
          variant="success"
          setOpenProp
        />
      )}
      {foodStatus === "failed" && (
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

      {foodStatus === "failed" ? (
        <ServerError />
      ) : (
        <div className="w-full min-h-screen mx-auto flex justify-center items-center">
          <Card className="w-[95%] md:w-[80%] lg:w-[60%] mt-10">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl text-center">
                Predict Name of an Food By Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 my-2 items-center ">
                <div className="flex flex-col text-center space-y-2 text-sm md:text-base">
                  <p>
                    It can only predict 101 types and it has a 80% accuracy and
                    it only predicts one food item per image. Names of food
                    items are 'Apple pie', 'Baby back ribs', 'Baklava', 'Beef
                    carpaccio', 'Beef tartare', 'Beet salad', 'Beignets',
                    'Bibimbap', 'Bread pudding', 'Breakfast burrito',
                    'Bruschetta', 'Caesar salad', 'Cannoli', 'Caprese salad',
                    'Carrot cake', 'Ceviche', 'Cheese plate', 'Cheesecake',
                    'Chicken curry','Chicken quesadilla', 'Chicken wings',
                    'Chocolate cake', 'Chocolate mousse', 'Churros', 'Clam
                    chowder', 'Club sandwich', 'Crab cakes', 'Creme brulee',
                    'Croque madame', 'Cup cakes', 'Deviled eggs', 'Donuts',
                    'Dumplings', 'Edamame', 'Eggs benedict', 'Escargots',
                    'Falafel', 'Filet mignon', 'Fish and chips', 'Foie gras',
                    'French fries', 'French onion soup', 'French toast', 'Fried
                    calamari', 'Fried rice', 'Frozen yogurt', 'Garlic bread',
                    'Gnocchi', 'Greek salad', 'Grilled cheese sandwich',
                    'Grilled salmon', 'Guacamole', 'Gyoza', 'Hamburger', 'Hot
                    and sour soup', 'Hot dog', 'Huevos rancheros', 'Hummus',
                    'Ice cream', 'Lasagna', 'Lobster bisque', 'Lobster roll
                    sandwich', 'Macaroni and cheese', 'Macarons', 'Miso soup',
                    'Mussels', 'Nachos', 'Omelette', 'Onion rings', 'Oysters',
                    'Pad thai', 'Paella', 'Pancakes', 'Panna cotta', 'Peking
                    duck', 'Pho', 'Pizza', 'Pork chop', 'Poutine', 'Prime rib',
                    'Pulled pork sandwich', 'Ramen', 'Ravioli', 'Red velvet
                    cake', 'Risotto', 'Samosa', 'Sashimi', 'Scallops', 'Seaweed
                    salad', 'Shrimp and grits', 'Spaghetti bolognese',
                    'Spaghetti carbonara', 'Spring rolls', 'Steak', 'Strawberry
                    shortcake', 'Sushi', 'Tacos', 'Takoyaki', 'Tiramisu', 'Tuna
                    tartare','Waffles'.{" "}
                  </p>
                </div>
                {foodStatus === "idle" ? (
                  <>
                    <DragNDrop
                      handleDrop={handleDrop}
                      uploadHandler={uploadHandler}
                      isDragging={isDragging}
                      setIsDragging={setIsDragging}
                    />
                  </>
                ) : foodStatus === "loading" ? (
                  <Loader />
                ) : null}
              </div>
            </CardContent>
            <CardFooter>
              {foodStatus === "succeeded" && (
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
