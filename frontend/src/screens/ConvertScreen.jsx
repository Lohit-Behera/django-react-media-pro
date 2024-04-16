import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchConvert, fetchGetConvert, resetConvert } from '@/features/ConvertSlice'

import DragNDrop from '@/components/DragNDrop'
import GlobalLoader from '@/components/GlobalLoader'
import ServerError from '@/components/ServerError'
import CustomAlert from '@/components/CustomAlert'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function ConvertScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const convert = useSelector((state) => state.convert.convert)
    const getConvert = useSelector((state) => state.convert.getConvert)
    const convertStatus = useSelector((state) => state.convert.convertStatus)
    const getConvertStatus = useSelector((state) => state.convert.getConvertStatus)

    const changedImage = getConvert ? getConvert.result : ''

    const is_verified = userInfo ? userInfo.is_verified : false

    useEffect(() => {
        if (!is_verified) {
            navigate('/login')
            console.log(userInfo);
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (convertStatus === 'succeeded') {
            dispatch(fetchGetConvert(convert.id))
        }
    }, [convertStatus, dispatch, convert])

    const [format, setFormat] = useState('jpeg')
    const [isDragOver, setIsDragOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [loaded, setLoaded] = useState(0);
    const [disable, setDisable] = useState(false)

    const imagesStyle = {
        opacity: loaded === 1 ? 1 : 0,
        transition: 'opacity 1s 0.5s ease-in-out'
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setIsDragging(false);
        if (file.type.startsWith('image/')) {
            dispatch(fetchConvert({
                format: format,
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
            dispatch(fetchConvert({
                format: format,
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

    const jpegHandler = () => {
        setFormat('jpeg')
    }


    const pngHandler = () => {
        setFormat('png')
    }

    const pdfHandler = () => {
        setFormat('pdf')
    }

    const tiffHandler = () => {
        setFormat('tiff')
    }
    const icoHandler = () => {
        setFormat('ico')
    }

    const webpHandler = () => {
        setFormat('webp')
    }

    const bmpHandler = () => {
        setFormat('bmp')
    }


    const resetHandler = () => {
        dispatch(resetConvert())
        setIsDragging(false)
        setFormat('jpeg')
        setLoaded(0)
        setDisable(false)
    }

    return (
        <>
            {convertStatus === 'succeeded' && <CustomAlert title="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {convertStatus === 'failed' && <CustomAlert title="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert title="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            {convertStatus === 'failed' ? (
                <ServerError />
            ) : (
                <div className='w-full mx-auto flex justify-center'>
                    <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10 h-auto'>
                        <CardHeader>
                            <CardTitle className="text-lg md:text-2xl text-center">Change Format</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-full flex flex-col space-y-4 my-2 items-center">
                                <div className="flex flex-col items-center space-y-2 text-sm md:text-base">
                                    <p>Before uploading the image choose format pdf and tiff format not supported to show the image</p>
                                    <div className='grid grid-cols-3 md:grid-cols-7 gap-2' >
                                        <Button
                                            variant={format === 'jpeg' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={jpegHandler}
                                        >
                                            jpeg
                                        </Button>
                                        <Button
                                            variant={format === 'png' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={pngHandler}
                                        >
                                            png
                                        </Button>
                                        <Button
                                            variant={format === 'pdf' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={pdfHandler}
                                        >
                                            pdf
                                        </Button>
                                        <Button
                                            variant={format === 'tiff' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={tiffHandler}
                                        >
                                            tiff
                                        </Button>
                                        <Button
                                            variant={format === 'ico' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={icoHandler}
                                        >
                                            ico
                                        </Button>
                                        <Button
                                            variant={format === 'webp' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={webpHandler}
                                        >
                                            webp
                                        </Button>
                                        <Button
                                            variant={format === 'bmp' ? 'default' : 'outline'}
                                            disabled={disable}
                                            onClick={bmpHandler}
                                        >
                                            bmp
                                        </Button>
                                    </div>
                                </div>
                                {convertStatus === 'idle' ? (
                                    <>
                                        <DragNDrop handleDrop={handleDrop} uploadHandler={uploadHandler} isDragging={isDragging} setIsDragging={setIsDragging} />
                                    </>
                                ) : convertStatus === 'loading' ? (
                                    <GlobalLoader />
                                ) : null}
                            </div>
                        </CardContent>
                        {getConvertStatus === 'succeeded' && (
                            <CardFooter className='w-full flex flex-col space-y-4'>
                                <div
                                    className='w-full '
                                    style={{
                                        width: '100%',
                                        maxHeight: '100%',
                                        background: `${loaded === 1 ? 'none' : 'radial-gradient(circle, rgba(109,40,217,0.90) 0%, rgba(109,40,217,0.50) 40%, rgba(109,40,217,0.10) 85%)'}`,
                                        animation: `${loaded === 1 ? 'none' : 'pulse 2s infinite'}`
                                    }}>
                                    {loaded === 1 &&
                                        <p className='text-lg text-center mb-4'>Format Changed</p>
                                    }
                                    <div className='w-full h-auto min-h-96'>
                                        <img className='m-auto' src={changedImage} alt="changedImage" style={imagesStyle} onLoad={() => setLoaded(prev => prev + 1)} />
                                    </div>


                                </div>
                                {loaded === 1 ? (
                                    <>
                                        <a href={changedImage} download={`formatChanged.${format}`} className='w-full'>
                                            <Button className="w-full">
                                                Download
                                            </Button>
                                        </a>
                                        <Button className="w-full" onClick={resetHandler}>Another Image</Button>
                                    </>
                                ) : format === 'pdf' || format === 'tiff' ? (
                                    <>
                                        <a href={changedImage} download>
                                            <Button>
                                                Download
                                            </Button>
                                        </a>
                                        <Button className="w-full" onClick={resetHandler}>Another Image</Button>
                                    </>
                                ) : null}
                            </CardFooter>
                        )}
                    </Card>
                </div>
            )}
        </>
    )
}

export default ConvertScreen