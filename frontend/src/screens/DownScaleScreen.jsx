import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchDownScale, fetchGetDownScale } from '@/features/DownScaleSlice'

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

function DownScaleScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const downScale = useSelector((state) => state.downScale.downScale)
    const getDownScale = useSelector((state) => state.downScale.getDownScale)
    const downScaleStatus = useSelector((state) => state.downScale.downScaleStatus)
    const getDownScaleStatus = useSelector((state) => state.downScale.getDownScaleStatus)

    const downScaleImage = getDownScale ? getDownScale.result : ''

    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (downScaleStatus === 'succeeded') {
            dispatch(fetchGetDownScale(downScale.id))
        }
    }, [downScaleStatus, dispatch, downScale])

    const [hide, setHide] = useState(false)
    const [scale, setScale] = useState('2')

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file);
        if (file.type.startsWith('image/')) {
            dispatch(fetchDownScale({
                scale: scale,
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
        dispatch(fetchDownScale({
            scale: scale,
            image: e.target.files[0]
        }))
    }

    const downScale2x = () => {
        setScale('2')
        setHide(true)
    }

    const downScale4x = () => {
        setScale('4')
        setHide(true)
    }


    return (
        <div className='w-full mx-auto flex justify-center'>
            <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto'>
                <CardHeader>
                    <CardTitle className="text-lg md:text-2xl text-center">DownScale Image</CardTitle>
                </CardHeader>
                <CardContent>
                    {downScaleStatus === 'idle' ? (
                        <div className="h-full flex flex-col space-y-4 my-2 items-center">
                            {!hide && (
                                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                    <p>Before uploading the image choose scale</p>
                                    <div className='grid grid-cols-2 gap-2' >
                                        <Button variant="outline" onClick={downScale2x}>DownScale 2X</Button>
                                        <Button variant="outline" onClick={downScale4x}>DownScale 4X</Button>
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
                    ) : downScaleStatus === 'loading' ? (
                        <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                    ) : downScaleStatus === 'succeeded' ? (
                        <p className='text-center text-lg' >Image Uploaded</p>
                    ) : downScaleStatus === 'failed' ? (
                        <p className='text-center text-lg'>Something went wrong</p>
                    ) : null}
                </CardContent>
                {getDownScaleStatus === 'succeeded' && (
                    <CardFooter>
                        <div className='flex flex-col w-full space-y-4'>
                            <p className='text-center'>DownScale Image</p>
                            <div className='w-full h-auto flex justify-center '>
                                <img src={downScaleImage} alt="downScaleImage" />
                            </div>
                            <Button className="w-full"><a href={downScaleImage} download="filtered.png">Download</a></Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default DownScaleScreen