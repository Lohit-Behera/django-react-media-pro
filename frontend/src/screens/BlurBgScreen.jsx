import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchBlurBg, fetchGetBlurBg, reset } from '@/features/BlurBgSlice'

import CustomAlert from '@/components/CustomAlert';
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

function BlurBgScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const blurBg = useSelector((state) => state.blurBg.blurBg)
    const getBlurBg = useSelector((state) => state.blurBg.getBlurBg)
    const blurBgStatus = useSelector((state) => state.blurBg.blurBgStatus)
    const getBlurBgStatus = useSelector((state) => state.blurBg.getBlurBgStatus)

    const blurBgImage = getBlurBg ? getBlurBg.result : ''
    const original = getBlurBg ? getBlurBg.original : ''

    const is_verified = userInfo ? userInfo.is_verified : false

    useEffect(() => {
        if (!is_verified) {
            navigate('/login')
            console.log(userInfo);
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (blurBgStatus === 'succeeded') {
            dispatch(fetchGetBlurBg(blurBg.id))
        }
    }, [blurBgStatus, dispatch, blurBg])

    const [hide, setHide] = useState(false)
    const [hideBlur, setHideBlur] = useState(false)
    const [model, setModel] = useState('')
    const [blur, setBlur] = useState('')
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchBlurBg({
                image: file,
                model: model,
                blur: blur,
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
            dispatch(fetchBlurBg({
                image: file,
                model: model,
                blur: blur,
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

    const lastHandler = () => {
        setModel('last')
        setHide(true)
    }

    const lowHandler = () => {
        setBlur('low')
        setHideBlur(true)
    }

    const mediumlHandler = () => {
        setBlur('medium')
        setHideBlur(true)
    }

    const highHandler = () => {
        setBlur('high')
        setHideBlur(true)
    }

    const resetHandler = () => {
        dispatch(reset())
        setHide(false)
        setHideBlur(false)
        setModel('')
        setBlur('')
    }

    return (
        <>

            {blurBgStatus === 'succeeded' && <CustomAlert titel="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {blurBgStatus === 'failed' && <CustomAlert titel="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert titel="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            <div className='w-full mx-auto flex justify-center'>
                <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto'>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-2xl text-center">Blur Background</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {blurBgStatus === 'idle' ? (
                            <div className="h-full flex flex-col space-y-4 my-2 items-center">

                                {(!hide || !hideBlur) && (
                                    <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                        <p className='text-center'>Before uploading the image choose image type if both not work use other and select blur amount</p>
                                        <div className='grid grid-cols-3 gap-2' >
                                            <Button variant="outline" onClick={animeHandler}>Anime</Button>
                                            <Button variant="outline" onClick={generalHandler}>General</Button>
                                            <Button variant="outline" onClick={lastHandler}>Last</Button>
                                            <Button variant="outline" onClick={lowHandler}>Low Blur</Button>
                                            <Button variant="outline" onClick={mediumlHandler}>Medium Blur</Button>
                                            <Button variant="outline" onClick={highHandler}>High Blur</Button>
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
                        ) : blurBgStatus === 'loading' ? (
                            <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                        ) : blurBgStatus === 'succeeded' ? (
                            <p className='text-center text-lg' >Image Uploaded</p>
                        ) : blurBgStatus === 'failed' ? (
                            <p className='text-center text-lg'>Something went wrong</p>
                        ) : null}
                    </CardContent>
                    {getBlurBgStatus === 'succeeded' && (
                        <CardFooter>
                            <div className='flex flex-col w-full space-y-4'>
                                <p className='text-center'>Compare</p>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={blurBgImage} rightImageLabel='Bg Removed' sliderLineColor='#6d28d9' />

                                </div>
                                <Button className="w-full"><a href={blurBgImage} download="removeBg.png">Download</a></Button>
                                <Button className="w-full" onClick={resetHandler}>Another Image</Button>
                            </div>
                        </CardFooter>
                    )}
                </Card>
            </div>
        </>
    )
}

export default BlurBgScreen