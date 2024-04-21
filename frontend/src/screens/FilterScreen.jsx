import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFilter, fetchGetFilter, resetFilter } from '@/features/FilterSlice'

import Loader from '@/components/Loader/Loader'
import CustomAlert from '@/components/CustomAlert'
import ServerError from '@/components/ServerError'

import landscapeone from '../assets/landscapeone.jpg'
import grayScaled from '../assets/grayScaled.jpeg'
import colorVibrance from '../assets/colorVibrance.jpeg'
import enhance from '../assets/enhance.jpeg'
import filtered from '../assets/filtered.jpeg'

import DragNDrop from '@/components/DragNDrop'
import ImageCompare from '@/components/ImageCompare'
import { Button } from '@/components/ui/button'
import {
    Glow,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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

    const [filterName, setFilterName] = useState('mix');
    const [isDragOver, setIsDragOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [disable, setDisable] = useState(false)

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchFilter({
                filter_name: filterName,
                image: file
            }))
            setDisable(true)
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
        if (file.type.startsWith('image/')) {
            dispatch(fetchFilter({
                filter_name: filterName,
                image: file
            }))
            setDisable(true)
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
    }

    const colorlHandler = () => {
        setFilterName('color')
    }

    const enhanceHandler = () => {
        setFilterName('detail')
    }

    const mixHandler = () => {
        setFilterName('mix')
    }

    const resetHandler = () => {
        dispatch(resetFilter())
        setIsDragging(false)
        setFilterName('mix')
        setDisable(false)
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
                                <div className="h-full flex flex-col space-y-4 my-2 items-center">
                                    <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                        <p className='text-center'>Before uploading the image choose filter examples are shown below</p>
                                        <div className='grid grid-cols-2 md:grid-cols-4 gap-' >
                                            <Button
                                                variant={filterName === 'grayscale' ? 'default' : 'outline'}
                                                disabled={disable}
                                                onClick={grayscaleHandler}
                                            >
                                                GrayScale
                                            </Button>
                                            <Button
                                                variant={filterName === 'color' ? 'default' : 'outline'}
                                                disabled={disable}
                                                onClick={colorlHandler}
                                            >
                                                Color vibrance
                                            </Button>
                                            <Button
                                                variant={filterName === 'detail' ? 'default' : 'outline'}
                                                disabled={disable}
                                                onClick={enhanceHandler}
                                            >
                                                Enhance
                                            </Button>
                                            <Button
                                                variant={filterName === 'mix' ? 'default' : 'outline'}
                                                disabled={disable}
                                                onClick={mixHandler}
                                            >
                                                Mixed
                                            </Button>
                                        </div>
                                    </div>
                                    {filterStatus === 'idle' ? (
                                        <>
                                            <DragNDrop handleDrop={handleDrop} uploadHandler={uploadHandler} isDragging={isDragging} setIsDragging={setIsDragging} />
                                        </>
                                    ) : filterStatus === 'loading' ? (
                                        <Loader />
                                    ) : null}
                                </div>
                            </CardContent>
                            {getfilterStatus === 'succeeded' && (
                                <CardFooter>
                                    <div className='flex flex-col w-full space-y-4'>
                                        <p className='text-center text-lg mb-4 font-semibold'>Compare</p>
                                        <div className='w-full h-auto'>
                                            <ImageCompare
                                                leftImg={original}
                                                rightImg={filteredImage}
                                                leftLabel='Original'
                                                rightLabel='Filtered'
                                                disabledLable={false}
                                            />
                                        </div>
                                        <a href={filteredImage} download={`formatChanged.png`} className='w-full'>
                                            <Button className="w-full">
                                                Download
                                            </Button>
                                        </a>
                                        <Button className="w-full" onClick={resetHandler}>Another Image</Button>

                                    </div>
                                </CardFooter>
                            )}
                        </Card>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] mx-auto'>
                        <Glow>
                            <Card className='h-full hover:scale-99 duration-300'>
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
                                        <ImageCompare
                                            leftImg={landscapeone}
                                            rightImg={grayScaled}
                                            leftLabel='Original'
                                            rightLabel='Filtered'
                                            disabledLable={false}
                                        />
                                    </div>
                                </CardContent>

                            </Card>
                        </Glow>
                        <Glow>
                            <Card className='h-full hover:scale-99 duration-300'>
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
                                        <ImageCompare
                                            leftImg={landscapeone}
                                            rightImg={colorVibrance}
                                            leftLabel='Original'
                                            rightLabel='Color vibrance'
                                            disabledLable={false}
                                        />
                                    </div>
                                </CardContent>

                            </Card>
                        </Glow>
                        <Glow>
                            <Card className='h-full hover:scale-99 duration-300'>
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
                                        <ImageCompare
                                            leftImg={landscapeone}
                                            rightImg={enhance}
                                            leftLabel='Original'
                                            rightLabel='Enhance'
                                            disabledLable={false}
                                        />
                                    </div>
                                </CardContent>

                            </Card>
                        </Glow>
                        <Glow>
                            <Card className='h-full hover:scale-99 duration-300'>
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
                                        <ImageCompare
                                            leftImg={landscapeone}
                                            rightImg={filtered}
                                            leftLabel='Original'
                                            rightLabel='Mixed'
                                            disabledLable={false}
                                        />
                                    </div>
                                </CardContent>

                            </Card>
                        </Glow>
                    </div>
                </div>
            )}
        </>
    )
}

export default FilterScreen