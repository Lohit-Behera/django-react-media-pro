import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUpscale, fetchGetUpscale } from '@/features/UpscaleSlice'

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

    const disparch = useDispatch()
    const navigate = useNavigate()

    const [scale, setScale] = useState(2)
    const [hide, setHide] = useState(false)

    const userInfo = useSelector(state => state.user.userInfo)
    const upscale = useSelector(state => state.upscale.upscale)
    const getUpscale = useSelector(state => state.upscale.getUpscale)
    const upscaleStatus = useSelector(state => state.upscale.upscaleStatus)
    const getUpscaleStatus = useSelector(state => state.upscale.getUpscaleStatus)

    const original = getUpscale ? getUpscale.original : ''
    const upscaleImage = getUpscale ? getUpscale.result : ''

    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (upscaleStatus === 'succeeded') {
            disparch(fetchGetUpscale(upscale.id))
        }
    }, [upscaleStatus, disparch, upscale])


    const uploadHndler = (e) => {
        disparch(fetchUpscale({
            scaling: scale,
            image: e.target.files[0]
        }))
    }

    const scale2xHandler = () => {
        setScale(2)
        setHide(true)
    }

    const scale4xHandler = () => {
        setScale(4)
        setHide(true)
    }
    return (
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
                                    <p>Before uploading the image choose scaling</p>
                                    <div className={`${hide ? 'hidden' : 'block'}} flex space-x-2`} >
                                        <Button variant="outline" onClick={scale2xHandler}>2X Scale</Button>
                                        <Button variant="outline" onClick={scale4xHandler}>4X Scale</Button>
                                    </div>
                                </div>
                            )}
                            <Label className="text-lg" htmlFor="image">Upload Image</Label>
                            <Input
                                name="image"
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                className='w-full h-40 cursor-pointer'
                                onChange={(e) => { uploadHndler(e) }}
                            />
                        </div>
                    ) : upscaleStatus === 'loading' ? (
                        <Loader2 className="w-6 h-6 animate-spin items-center" />
                    ) : upscaleStatus === 'succeeded' ? (
                        <p>Image Uploaded</p>
                    ) : upscaleStatus === 'failed' ? (
                        <p>Something went wrong</p>
                    ) : null}
                </CardContent>
                <CardFooter>
                    <div className='flex flex-col w-full space-y-4'>
                        <p>Compare</p>
                        <div className='w-full h-auto'>
                            <img src="{original}" className="w-full" alt="" />
                            <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={upscaleImage} rightImageLabel='Bg Removed' sliderLineColor='#6d28d9' />
                        </div>
                        <Button className="w-full"><a href={upscaleImage} download="removeBg.png">Download</a></Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default UpscaleScreen