import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchFilter, fetchGetFilter } from '@/features/FilterSlice'

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

    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
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

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file);
        if (file.type.startsWith('image/')) {
            dispatch(fetchFilter({
                filter_name: filterName,
                image: file
            }))
        } else {
            alert('Please drop an image file.');
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const uploadHndler = (e) => {
        e.preventDefault();
        dispatch(fetchFilter({
            filter_name: filterName,
            image: e.target.files[0]
        }))
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


    return (
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
                                    <p className='text-center'>Before uploading the image choose filter</p>
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
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default FilterScreen