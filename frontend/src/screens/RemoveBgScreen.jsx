import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchRemoveBg, fetchGetRemoveBg, resetRemoveBg } from '@/features/RemoveBgSlice'
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

function RemoveBgScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const removeBg = useSelector((state) => state.removeBg.removeBg)
    const getRemoveBg = useSelector((state) => state.removeBg.getRemoveBg)
    const removeBgStatus = useSelector((state) => state.removeBg.removeBgStatus)
    const getRemoveBgStatus = useSelector((state) => state.removeBg.getRemoveBgStatus)

    const removeBgImage = getRemoveBg ? getRemoveBg.result : ''
    const original = getRemoveBg ? getRemoveBg.original : ''

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
        if (removeBgStatus === 'succeeded') {
            dispatch(fetchGetRemoveBg(removeBg.id))
        }
    }, [removeBgStatus, dispatch, removeBg])

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchRemoveBg({
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
            dispatch(fetchRemoveBg({
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
        dispatch(resetRemoveBg())
        setHide(false)
        setModel('')
    }

    return (
        <>
            {removeBgStatus === 'succeeded' && <CustomAlert titel="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {removeBgStatus === 'failed' && <CustomAlert titel="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert titel="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            <div className='w-full mx-auto flex justify-center items-center'>
                <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                    <CardHeader>
                        <CardTitle className="text-lg md:text-2xl text-center">Remove Background</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {removeBgStatus === 'idle' ? (
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
                        ) : removeBgStatus === 'loading' ? (
                            <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                        ) : removeBgStatus === 'succeeded' ? (
                            <p className='text-center text-lg' >Image Uploaded</p>
                        ) : removeBgStatus === 'failed' ? (
                            <p className='text-center text-lg'>Something went wrong</p>
                        ) : null}
                    </CardContent>
                    <CardFooter>
                        {getRemoveBgStatus === 'succeeded' && (
                            <div className='flex flex-col w-full space-y-4'>
                                <p className='text-center'>Compare</p>
                                <div className='w-full h-auto'>
                                    <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={removeBgImage} rightImageLabel='Bg Removed' sliderLineColor='#6d28d9' />

                                </div>
                                <Button className="w-full"><a href={removeBgImage} download="removeBg.png">Download</a></Button>
                                <Button className="w-full" onClick={resetHandler}>Another Image</Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default RemoveBgScreen