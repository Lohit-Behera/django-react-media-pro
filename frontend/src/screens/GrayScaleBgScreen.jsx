import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGrayScaleBg, fetchGetGrayScaleBg, grayScaleBgReset } from '@/features/GrayScaleBgSlice'

import GlobalLoader from '@/components/GlobalLoader'
import ServerError from '@/components/ServerError'
import CustomAlert from '@/components/CustomAlert'

import ReactCompareImage from 'react-compare-image'
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

function GrayScaleBgScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const grayScaleBg = useSelector((state) => state.grayScaleBg.grayScaleBg)
    const getGrayScaleBg = useSelector((state) => state.grayScaleBg.getGrayScaleBg)
    const grayScaleBgStatus = useSelector((state) => state.grayScaleBg.grayScaleBgStatus)
    const getGrayScaleBgStatus = useSelector((state) => state.grayScaleBg.getGrayScaleBgStatus)

    const grayScaleBgImage = getGrayScaleBg ? getGrayScaleBg.result : ''
    const original = getGrayScaleBg ? getGrayScaleBg.original : ''

    const [hide, setHide] = useState(false)
    const [model, setModel] = useState('')
    const [isDragOver, setIsDragOver] = useState(false);

    const is_verified = userInfo ? userInfo.is_verified : false

    useEffect(() => {
        if (!is_verified) {
            navigate('/login')
        }
    }, [userInfo, navigate])


    useEffect(() => {
        if (grayScaleBgStatus === 'succeeded') {
            dispatch(fetchGetGrayScaleBg(grayScaleBg.id))
        }
    }, [grayScaleBgStatus, dispatch, grayScaleBg])

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchGrayScaleBg({
                model: model,
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
            dispatch(fetchGrayScaleBg({
                model: model,
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

    const animeHandler = () => {
        setModel('anime')
        setHide(true)
    }

    const generalHandler = () => {
        setModel('general')
        setHide(true)
    }

    const otherHandler = () => {
        setModel('last')
        setHide(true)
    }

    const resetHandler = () => {
        dispatch(grayScaleBgReset())
        setHide(false)
        setModel('')
    }

    return (
        <>
            {grayScaleBgStatus === 'succeeded' && <CustomAlert title="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {grayScaleBgStatus === 'failed' && <CustomAlert title="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert title="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            {grayScaleBgStatus === 'failed' ? (
                <ServerError />
            ) : (
                <div className='w-full mx-auto flex justify-center items-center'>
                    <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                        <CardHeader>
                            <CardTitle className="text-lg md:text-2xl text-center">Gray Scale Background</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {grayScaleBgStatus === 'idle' ? (
                                <div className="flex flex-col space-y-4 my-2 items-center ">
                                    {!hide && (
                                        <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                            <p>Before uploading the image choose the image type if both are not working use other</p>
                                            <div className='grid grid-cols-2 md:grid-cols-3 gap-2' >
                                                <Button variant="outline" onClick={animeHandler}>Anime</Button>
                                                <Button variant="outline" onClick={generalHandler}>General</Button>
                                                <Button variant="outline" onClick={otherHandler}>Other</Button>

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
                                        className="w-full h-44 md:h-96 border-2 flex justify-center items-center rounded-md text-sm md:text-lg"
                                    >
                                        Drag and drop the image here
                                    </div>
                                </div>
                            ) : grayScaleBgStatus === 'loading' ? (
                                <GlobalLoader />
                            ) : null}
                        </CardContent>
                        <CardFooter>
                            {getGrayScaleBgStatus === 'succeeded' && (
                                <div className='flex flex-col w-full space-y-4'>
                                    <p className='text-center'>Compare</p>
                                    <div className='w-full h-auto'>
                                        <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={grayScaleBgImage} rightImageLabel='Bg Removed' sliderLineColor='#6d28d9' />

                                    </div>
                                    <Button className="w-full"><a href={grayScaleBgImage} download="removeBg.png">Download</a></Button>
                                    <Button className="w-full" onClick={resetHandler}>Another Image</Button>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    )
}

export default GrayScaleBgScreen