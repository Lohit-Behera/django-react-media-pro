import React from 'react'
import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'

import car from '../assets/car.jpg'
import upscaleCar from '../assets/upscaleCar.png'
import bgremovedCar from '../assets/bgremovedCar.png'
import bgblurCar from '../assets/bgblurCar.png'
import grayscaleCar from '../assets/GrayScakeBgCar.png'
import filteredCar from '../assets/filteredCar.png'
import convertCar from '../assets/convertCar.png'
import downscaledCar from '../assets/downscaledCar.jpeg'

const ImageCompare = lazy(() => import('@/components/ImageCompare'))
import HomeScreenLoader from '@/components/HomeScreenLoader'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"


function HomeScreen() {
    return (
        <>
            <Suspense fallback={<HomeScreenLoader />}>
                <div className='w-[95%] mx-auto'>

                    <h1 className='text-3xl font-bold text-center'>Media Pro</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link to='upscale'
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                    >
                                        Upscale Image
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={upscaleCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Upscale on image up to 4X; it only exports the image in png format. Do not use very high-resolution images; it will make a very large image, and it is not worth it.</p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='removebg'>
                                        Backgroud Remove
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={bgremovedCar}
                                        leftLabel='After'
                                        rightLabel='Before'
                                        disabledLable={false}
                                        transparent={true}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Remove the background from an image, and it will only export in PNG format. There are three models available for removing backgrounds. Anime models use the anime background removal model; general models use the general background removal model; and other model, if both do not work, use other.  </p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='blurbg'>
                                        Add Blur to Background
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={bgblurCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Blur the background of an image, and it will only export in PNG format. It analyzes the image background, like background removal, and there are three parameters for adding blur to the background.</p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='grayscalebg'>
                                        Gray Scale Background
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={grayscaleCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Gray Scale the background from an image, and it will only export in PNG format. There are three models available like remove background. </p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='animal'>
                                        Predict Image of an Animal
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={grayscaleCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Upload the image and it will Predict the image of an animal but it can Predict only 40 animals</p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='filter'>
                                        Add Filters
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={filteredCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Add filters to an image, and it will only export in PNG format. There are four filters available.</p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='convert'>
                                        Change Format of Image
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={convertCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Change the format of an image to jpeg, png, pdf, tiff, ico, webp, or bmp.</p>
                            </CardFooter>
                        </Card>
                        <Card className=''>
                            <CardHeader>
                                <CardTitle className='text-center text-lg md:text-xl lg:text-2xl'>
                                    <Link
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        to='downscale'>
                                        DownScale Image
                                    </Link>
                                </CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/"
                                        target="_blank">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='rounded-lg'>
                                    <ImageCompare
                                        leftImg={car}
                                        rightImg={downscaledCar}
                                        leftLabel='Before'
                                        rightLabel='After'
                                        disabledLable={false}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='text-sm md:text-base'>
                                <p>Downscale an image up to 4X; it only exports in jpeg format.</p>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </Suspense>
        </>
    )
}

export default HomeScreen