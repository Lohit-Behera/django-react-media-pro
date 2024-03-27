import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { fetchRemoveBg, fetchGetRemoveBg } from '@/features/RemoveBgSlice'

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
    console.log(removeBgImage, original)

    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    useEffect(() => {
        if (removeBgStatus === 'succeeded') {
            dispatch(fetchGetRemoveBg(removeBg.id))
        }
    }, [removeBgStatus, dispatch, removeBg])

    const uploadHndler = (e) => {
        console.log(e.target.files[0])
        dispatch(fetchRemoveBg({
            image: e.target.files[0]
        }))
    }

    return (
        <div className='w-full mx-auto flex justify-center items-center'>
            <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Upscale Image</CardTitle>
                </CardHeader>
                <CardContent>
                    {removeBgStatus === 'idle' ? (
                        <div className="flex flex-col space-y-4 my-2 items-center">
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
                    ) : removeBgStatus === 'loading' ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : removeBgStatus === 'succeeded' ? (
                        <p>Image Uploaded</p>
                    ) : removeBgStatus === 'failed' ? (
                        <p>Something went wrong</p>
                    ) : null}
                </CardContent>
                <CardFooter>
                    {getRemoveBgStatus === 'succeeded' && (
                        <div className='flex flex-col w-full space-y-4'>
                            <p>Compare</p>
                            <div className='w-full h-auto'>
                                <img src="{original}" className="w-full" alt="" />
                                <ReactCompareImage leftImage={original} leftImageLabel='Original' rightImage={removeBgImage} rightImageLabel='Bg Removed' sliderLineColor='#6d28d9' />

                            </div>
                            <Button className="w-full"><a href={removeBgImage} download="removeBg.png">Download</a></Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}

export default RemoveBgScreen