import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGrayScaleBg, fetchGetGrayScaleBg, grayScaleBgReset } from '@/features/GrayScaleBgSlice'

import GlobalLoader from '@/components/GlobalLoader'
import ServerError from '@/components/ServerError'
import CustomAlert from '@/components/CustomAlert'
import DragNDrop from '@/components/DragNDrop'
import ImageCompare from '@/components/ImageCompare'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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

    const [model, setModel] = useState('general')
    const [isDragOver, setIsDragOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [disable, setDisable] = useState(false)

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
            dispatch(fetchGrayScaleBg({
                model: model,
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

    const animeHandler = () => {
        setModel('anime')
    }

    const generalHandler = () => {
        setModel('general')
    }

    const otherHandler = () => {
        setModel('last')
    }

    const resetHandler = () => {
        dispatch(grayScaleBgReset())
        setIsDragging(false)
        setModel('general')
        setDisable(false)
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
                            <div className="flex flex-col space-y-4 my-2 items-center ">
                                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                    <p>Before uploading the image choose the image type if both are not working use other</p>
                                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2' >
                                        <Button
                                            variant={model === 'anime' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={animeHandler}
                                        >
                                            Anime
                                        </Button>
                                        <Button
                                            variant={model === 'general' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={generalHandler}
                                        >
                                            General
                                        </Button>
                                        <Button
                                            variant={model === 'last' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={otherHandler}
                                        >
                                            Other
                                        </Button>
                                    </div>
                                </div>
                                {grayScaleBgStatus === 'idle' ? (
                                    <>
                                        <DragNDrop handleDrop={handleDrop} uploadHandler={uploadHandler} isDragging={isDragging} setIsDragging={setIsDragging} />
                                    </>
                                ) : grayScaleBgStatus === 'loading' ? (
                                    <GlobalLoader />
                                ) : null}
                            </div>
                        </CardContent>
                        <CardFooter>
                            {getGrayScaleBgStatus === 'succeeded' && (
                                <div className='flex flex-col w-full space-y-4'>
                                    <p className='text-center text-lg mb-4 font-semibold'>Compare</p>
                                    <div className='w-full h-auto'>
                                        <ImageCompare
                                            leftImg={original}
                                            rightImg={grayScaleBgImage}
                                            leftLabel='Original'
                                            rightLabel='Gray Scale Bg'
                                            disabledLable={false}
                                        />
                                    </div>
                                    <a href={grayScaleBgImage} download={`grayScaleBgImage.png`} className='w-full'>
                                        <Button className="w-full">
                                            Download
                                        </Button>
                                    </a>
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