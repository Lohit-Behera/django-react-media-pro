import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchConvert, fetchGetConvert } from '@/features/ConvertSlice'

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

function ConvertScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const convert = useSelector((state) => state.convert.convert)
    const getConvert = useSelector((state) => state.convert.getConvert)
    const convertStatus = useSelector((state) => state.convert.convertStatus)
    const getConvertStatus = useSelector((state) => state.convert.getConvertStatus)

    const formatedImage = getConvert ? getConvert.result : ''

    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (convertStatus === 'succeeded') {
            dispatch(fetchGetConvert(convert.id))
        }
    }, [convertStatus, dispatch, convert])

    const [hide, setHide] = useState(false)
    const [format, setFormat] = useState('png')
    console.log(format);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        console.log(file);
        if (file.type.startsWith('image/')) {
            dispatch(fetchConvert({
                format: format,
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
        dispatch(fetchConvert({
            format: format,
            image: e.target.files[0]
        }))
    }

    const jpegHandler = () => {
        setFormat('jpeg')
        setHide(true)
    }


    const pngHandler = () => {
        setFormat('png')
        setHide(true)
    }

    const pdfHandler = () => {
        setFormat('pdf')
        setHide(true)
    }

    const tiffHandler = () => {
        setFormat('tiff')
        setHide(true)
    }
    const icoHandler = () => {
        setFormat('ico')
        setHide(true)
    }

    const webpHandler = () => {
        setFormat('webp')
        setHide(true)
    }

    const bmpHandler = () => {
        setFormat('bmp')
        setHide(true)
    }


    return (
        <div className='w-full mx-auto flex justify-center'>
            <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto'>
                <CardHeader>
                    <CardTitle className="text-lg md:text-2xl text-center">Blur Background</CardTitle>
                </CardHeader>
                <CardContent>
                    {convertStatus === 'idle' ? (
                        <div className="h-full flex flex-col space-y-4 my-2 items-center">
                            {!hide && (
                                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                    <p>Before uploading the image choose format</p>
                                    <div className='flex space-x-2' >
                                        <Button variant="outline" onClick={jpegHandler}>jpeg</Button>
                                        <Button variant="outline" onClick={pngHandler}>png</Button>
                                        <Button variant="outline" onClick={pdfHandler}>pdf</Button>
                                        <Button variant="outline" onClick={tiffHandler}>tiff</Button>
                                        <Button variant="outline" onClick={icoHandler}>ico</Button>
                                        <Button variant="outline" onClick={webpHandler}>webp</Button>
                                        <Button variant="outline" onClick={bmpHandler}>bmp</Button>
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
                    ) : convertStatus === 'loading' ? (
                        <Loader2 className="w-14 h-14 animate-spin mx-auto" />
                    ) : convertStatus === 'succeeded' ? (
                        <p className='text-center text-lg' >Image Uploaded</p>
                    ) : convertStatus === 'failed' ? (
                        <p className='text-center text-lg'>Something went wrong</p>
                    ) : null}
                </CardContent>
                {getConvertStatus === 'succeeded' && (
                    <CardFooter>
                        <div className='flex flex-col w-full space-y-4'>
                            <p className='text-center'>Converted Image</p>
                            {format === 'pdf' || format === 'tiff' ? (
                                <h2 className='text-center'>pdf and tiff format not supported to show the image</h2>
                            ) : (
                                <div className='w-full h-auto'>
                                    <img src={formatedImage} alt="formatedImage" />
                                </div>
                            )}
                            <Button className="w-full"><a href={formatedImage} download="filtered.png">Download</a></Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default ConvertScreen