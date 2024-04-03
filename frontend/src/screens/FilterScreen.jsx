import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFilter, fetchGetFilter, resetFilter } from '@/features/FilterSlice'
import CustomAlert from '@/components/CustomAlert'
import ServerError from '@/components/ServerError'

import car from '../assets/car.jpg'
import GrayScaleCar from '../assets/GrayScaleCar.png'
import ColorVibranceCar from '../assets/ColorVibranceCar.png'
import EnhanceCar from '../assets/EnhanceCar.png'
import filteredCar from '../assets/filteredCar.png'


import ReactCompareImage from 'react-compare-image'
import { Loader2 } from "lucide-react"
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from "../components/ui/label"

function FilterScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const filter = useSelector((state) => state.filter.filter)
    const getfilter = useSelector((state) => state.filter.getfilter)
    const filterStatus = useSelector((state) => state.filter.filterStatus)
    const getfilterStatus = useSelector((state) => state.filter.getfilterStatus)

    const filteredImage = getfilter ? getfilter.result : ''
    const original = getfilter ? getfilter.original : ''

    const is_verified = userInfo ? userInfo.is_verified : false

    useEffect(() => {
        if (!is_verified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (filterStatus === 'succeeded') {
            dispatch(fetchGetFilter(filter.id))
        }
    }, [filterStatus, dispatch, filter])

    const [hide, setHide] = useState(false)
    const [filterName, setFilterName] = useState('')
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchFilter({
                filter_name: filterName,
                image: file
            }))
        } else {
            setIsDragOver(true);
            const timer = setTimeout(() => {
                setIsDragOver(false);
            }, 3700);
            return () => clearTimeout(timer);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const uploadHndler = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchFilter({
                filter_name: filterName,
                image: file
            }))
        } else {
            setIsDragOver(true);
            const timer = setTimeout(() => {
                setIsDragOver(false);
            }, 3700);
            return () => clearTimeout(timer);
        }
    }

    const grayscaleHandler = () => {
        setFilterName('grayscale')
        setHide(true)
    }

    const colorlHandler = () => {
        setFilterName('color')
        setHide(true)
    }

    const enhanceHandler = () => {
        setFilterName('detail')
        setHide(true)
    }

    const mixHandler = () => {
        setFilterName('mix')
        setHide(true)
    }

    const resetHandler = () => {
        dispatch(resetFilter())
        setHide(false)
        setFilterName('')
    }


    return (
        <>
            {filterStatus === 'succeeded' && <CustomAlert title="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {filterStatus === 'failed' && <CustomAlert title="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert title="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            {filterStatus === 'failed' ? (
                <ServerError />
            ) : (
                <div className='w-full space-y-10'>
                    <div className='w-full mx-auto flex justify-center'>
                        <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto'>
                            <CardHeader>
                                <CardTitle className="text-lg md:text-2xl text-center">Add Filters</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {filterStatus === 'idle' ? (
                                    <div className="h-full flex flex-col space-y-4 my-2 items-center">
                                        {!hide && (
                                            <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                                <p className='text-center'>Before uploading the image choose filter examples are shown below</p>
                                                <div className='grid grid-cols-2 md:grid-cols-4 gap-2' >
                                                    <Button variant="outline" onClick={grayscaleHandler}>GrayScale</Button>
                                                    <Button variant="outline" onClick={colorlHandler}>Color vibrance</Button>
                                                    <Button variant="outline" onClick={enhanceHandler}>Enhance</Button>
                                                    <Button variant="outline" onClick={mixHandler}>Mixed</Button>
                                                </div>
                                            </div>
                                        )}
                                        <Label className="text-base md:text-lg" htmlFor="image">Upload Image</Label>
                                        <Input
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            className='w-full dark:file:text-white cursor-pointer'
                                            onChange={(e) => { uploadHndler(e) }}
                                        />
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            className="w-full h-96 border-2 flex justify-center items-center rounded-md md:text-lg"
                                        >
                                            Drag and drop image here
                                        </div>
                                    </div>
                                ) : filterStatus === 'loading' ? (
                                    <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                                ) : filterStatus === 'succeeded' ? (
                                    <p className='text-center text-lg' >Image Uploaded</p>
                                ) : filterStatus === 'failed' ? (
                                    <p className='text-center text-lg'>Something went wrong</p>
                                ) : null}
                            </CardContent>
                            {getfilterStatus === 'succeeded' && (
                                <CardFooter>
                                    <div className='flex flex-col w-full space-y-4'>
                                        <p className='text-center'>Compare</p>
                                        <div className='w-full h-auto'>
                                            <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={filteredImage} rightImageLabel='Filtered' sliderLineColor='#6d28d9' />

                                        </div>
                                        <Button className="w-full"><a href={filteredImage} download="filtered.png">Download</a></Button>
                                        <Button className="w-full" onClick={resetHandler}>Another Image</Button>

                                    </div>
                                </CardFooter>
                            )}
                        </Card>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[98%] mx-auto'>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base md:text-lg text-center">GrayScale</CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={car} leftImageLabel='Original' rightImage={GrayScaleCar} rightImageLabel='GrayScale' sliderLineColor='#6d28d9' />

                                </div>
                            </CardContent>

                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base md:text-lg text-center">Color vibrance</CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={car} leftImageLabel='Original' rightImage={ColorVibranceCar} rightImageLabel='Color vibrance' sliderLineColor='#6d28d9' />

                                </div>
                            </CardContent>

                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base md:text-lg text-center">Enhance</CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={car} leftImageLabel='Original' rightImage={EnhanceCar} rightImageLabel='Enhance' sliderLineColor='#6d28d9' />

                                </div>
                            </CardContent>

                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base md:text-lg text-center">Mixed</CardTitle>
                                <CardDescription className='text-sm md:text-base'>Photo by Alex Amorales:
                                    <a
                                        className='hover:underline hover:text-[#6d28d9] duration-200'
                                        href="https://www.pexels.com/photo/black-audi-a-series-parked-near-brown-brick-house-909907/">
                                        Link
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={car} leftImageLabel='Original' rightImage={filteredCar} rightImageLabel='Mixed' sliderLineColor='#6d28d9' />

                                </div>
                            </CardContent>

                        </Card>

                    </div>
                </div>
            )}
        </>
    )
}

export default FilterScreen