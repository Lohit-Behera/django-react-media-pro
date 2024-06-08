import React from "react";
import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import audi from "../assets/audi.jpg";
import upscale from "../assets/upscale.jpeg";
import lamborghini from "../assets/lamborghini.jpg";
import removedBg from "../assets/removedBg.png";
import mercedes from "../assets/mercedes.jpg";
import bgBlur from "../assets/bgBlur.jpeg";
import yellowMercedes from "../assets/yellowMercedes.jpg";
import bgGrayScaled from "../assets/bgGrayScaled.jpeg";
import landscapeone from "../assets/landscapeone.jpg";
import parrot from "../assets/parrot.jpg";
import filtered from "../assets/filtered.jpeg";
import landscapeTwo from "../assets/landscapetwo.jpg";
import changed from "../assets/changed.webp";
import squirrel from "../assets/squirrel.jpg";
import DownScaled from "../assets/DownScaled.jpeg";
import pizza from "../assets/pizza.jpg";

const CustomImage = lazy(() => import("@/components/CustomImage"));
const ImageCompare = lazy(() => import("@/components/ImageCompare"));
import HomeScreenLoader from "@/components/HomeScreenLoader";

import {
  Glow,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import AuroraBackground from "@/components/AuroraBackground";

function HomeScreen() {
  return (
    <>
      <Suspense fallback={<HomeScreenLoader />}>
        <div className="w-[95%] mx-auto">
          <h1 className="text-3xl font-bold text-center">Media Pro</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      to="upscale"
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                    >
                      Upscale Image
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Alex Amorales:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={audi}
                      rightImg={upscale}
                      leftLabel="Before"
                      rightLabel="After"
                      disabledLable={false}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Upscale on image up to 4X; it only exports the image in png
                    format. Do not use very high-resolution images; it will make
                    a very large image, and it is not worth it.
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="removebg"
                    >
                      Background Remove
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Alex Qian:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/a-white-sports-car-on-the-road-4914160/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={lamborghini}
                      rightImg={removedBg}
                      leftLabel="After"
                      rightLabel="Before"
                      disabledLable={false}
                      transparent={true}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Remove the background from an image, and it will only export
                    in PNG format. There are three models available for removing
                    backgrounds. Anime models use the anime background removal
                    model; general models use the general background removal
                    model; and other model, if both do not work, use other. {" "}
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="blurbg"
                    >
                      Add Blur to Background
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Mike Bird:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/red-mercedes-benz-convertible-1335077/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={mercedes}
                      rightImg={bgBlur}
                      leftLabel="Before"
                      rightLabel="After"
                      disabledLable={false}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Blur the background of an image, and it will only export in
                    PNG format. It analyzes the image background, like
                    background removal, and there are three parameters for
                    adding blur to the background.
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="grayscalebg"
                    >
                      Gray Scale Background
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Mike Bird:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/yellow-mercedes-benz-beside-trees-2365572/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={yellowMercedes}
                      rightImg={bgGrayScaled}
                      leftLabel="Before"
                      rightLabel="After"
                      disabledLable={false}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Gray Scale the background from an image, and it will only
                    export in PNG format. There are three models available like
                    remove background.{" "}
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="animal"
                    >
                      Predict Name of an Animal By Image
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Sivakumar B:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/green-and-red-beak-bird-on-grey-branch-97533/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <CustomImage scr={parrot} alt={"parrot"} height={72} />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Upload the image and it will Predict the image of an animal
                    but it can Predict only 40 animals
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="food"
                    >
                      Predict Name of an Food By Image
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Eneida Nieves:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/baked-pizza-on-pizza-peel-in-oven-905847/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <CustomImage scr={pizza} alt={"pizza"} height={72} />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Upload the image and it will Predict name of food by image
                    but it can Predict only 101 Food items
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="filter"
                    >
                      Add Filters
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Ian Turnell:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/body-of-water-between-green-leaf-trees-709552/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={landscapeone}
                      rightImg={filtered}
                      leftLabel="Before"
                      rightLabel="After"
                      disabledLable={false}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Add filters to an image, and it will only export in PNG
                    format. There are four filters available.
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="convert"
                    >
                      Change Format of Image
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Pixabay:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/dock-under-cloudy-sky-in-front-of-mountain-206359/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={landscapeTwo}
                      rightImg={changed}
                      leftLabel="Before"
                      rightLabel="After"
                      disabledLable={false}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Change the format of an image to jpeg, png, pdf, tiff, ico,
                    webp, or bmp.
                  </p>
                </CardFooter>
              </Card>
            </Glow>
            <Glow>
              <Card className="h-full hover:scale-99 duration-300">
                <CardHeader>
                  <CardTitle className="text-center text-lg md:text-xl lg:text-2xl">
                    <Link
                      className="hover:underline hover:text-[#6d28d9] duration-200"
                      to="downscale"
                    >
                      DownScale Image
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    Photo by Pixabay:&nbsp;
                    <a
                      className="font-semibold hover:underline hover:text-[#6d28d9] duration-200"
                      href="https://www.pexels.com/photo/red-squirrel-on-brown-table-top-460775/"
                      target="_blank"
                    >
                      Link
                    </a>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg">
                    <ImageCompare
                      leftImg={squirrel}
                      rightImg={DownScaled}
                      leftLabel="Before"
                      rightLabel="After"
                      disabledLable={false}
                    />
                  </div>
                </CardContent>
                <CardFooter className="text-sm md:text-base">
                  <p>
                    Downscale an image up to 4X; it only exports in jpeg format.
                  </p>
                </CardFooter>
              </Card>
            </Glow>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default HomeScreen;
