import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUpscale, fetchGetUpscale, resetUpscale } from '@/features/UpscaleSlice'

import CustomAlert from '@/components/CustomAlert'
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


function UpscaleScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [scale, setScale] = useState(2)
    const [hide, setHide] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false);

    const userInfo = useSelector(state => state.user.userInfo)
    const upscale = useSelector(state => state.upscale.upscale)
    const getUpscale = useSelector(state => state.upscale.getUpscale)
    const upscaleStatus = useSelector(state => state.upscale.upscaleStatus)
    const getUpscaleStatus = useSelector(state => state.upscale.getUpscaleStatus)

    const original = getUpscale ? getUpscale.original : ''
    const upscaleImage = getUpscale ? getUpscale.result : ''

    const is_verified = userInfo ? userInfo.is_verified : false

    useEffect(() => {
        if (!is_verified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (upscaleStatus === 'succeeded') {
            dispatch(fetchGetUpscale(upscale.id))
        }
    }, [upscaleStatus, dispatch, upscale])


    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchUpscale({
                scaling: scale,
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
            dispatch(fetchUpscale({
                scaling: scale,
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

    const scale2xHandler = () => {
        setScale(2)
        setHide(true)
    }

    const scale4xHandler = () => {
        setScale(4)
        setHide(true)
    }

    const resetHandler = () => {
        dispatch(resetUpscale())
        setHide(false)
        setScale('')
    }

    return (
        <>
            {upscaleStatus === 'succeeded' && <CustomAlert titel="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {upscaleStatus === 'failed' && <CustomAlert titel="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert titel="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            <div className='w-full mx-auto flex justify-center items-center'>
                <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Upscale Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {upscaleStatus === 'idle' ? (
                            <div className="flex flex-col space-y-2 my-2 items-center">
                                {!hide && (
                                    <div className="flex flex-col items-center space-y-2">
                                        <p className='text-center'>Before uploading the image choose scaling</p>
                                        <div className='grid grid-cols-2 gap-2' >
                                            <Button variant="outline" onClick={scale2xHandler}>2X Scale</Button>
                                            <Button variant="outline" onClick={scale4xHandler}>4X Scale</Button>
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
                        ) : upscaleStatus === 'loading' ? (
                            <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                        ) : upscaleStatus === 'succeeded' ? (
                            <p className='text-center text-lg' >Image Uploaded</p>
                        ) : upscaleStatus === 'failed' ? (
                            <p className='text-center text-lg'>Something went wrong</p>
                        ) : null}
                    </CardContent>
                    <CardFooter>
                        {getUpscaleStatus === 'succeeded' && (
                            <div className='flex flex-col w-full space-y-4'>
                                <p className='text-center'>Compare</p>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={upscaleImage} rightImageLabel='Upscaled' sliderLineColor='#6d28d9' />
                                </div>
                                <Button className="w-full"><a href={upscaleImage} download="removeBg.png">Download</a></Button>
                                <Button className="w-full" onClick={resetHandler}>Another Image</Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default UpscaleScreen