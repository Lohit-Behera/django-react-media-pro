import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchRemoveBg } from '@/features/RemoveBgSlice'

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
    const removeBg = useSelector((state) => state.removeBg.removeBg) || {}
    const removeBgStatus = useSelector((state) => state.removeBg.removeBgStatus)


    useEffect(() => {
        if (!userInfo && !userInfo.is_varified) {
            navigate('/login')
        }
    }, [userInfo, navigate])


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
                    <CardTitle>Upscale Image</CardTitle>
                </CardHeader>
                <CardContent>
                    {removeBgStatus === 'idle' ? (
                        <div className="flex flex-col space-y-2 my-2">
                            <Label htmlFor="image">Upload Image</Label>
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
                    <p>Card Footer</p>
                    <Button className="w-full"><a href={removeBg.result} download="removeBg.png">Download</a></Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RemoveBgScreen