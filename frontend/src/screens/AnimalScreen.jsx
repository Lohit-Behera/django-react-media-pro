import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnimal, animalReset } from '@/features/AnimalSlice'

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
import { Input } from '@/components/ui/input'
import { Label } from "../components/ui/label"

function AnimalScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userInfo = useSelector((state) => state.user.userInfo)
    const animal = useSelector((state) => state.animal.animal)
    const animalStatus = useSelector((state) => state.animal.animalStatus)

    const prediction = animal ? animal.prediction : '';
    const original = animal ? animal.original : '';

    const [isDragOver, setIsDragOver] = useState(false);

    const is_verified = userInfo ? userInfo.is_verified : false

    useEffect(() => {
        if (!is_verified) {
            navigate('/login')
        }
    }, [userInfo, navigate])

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('image/')) {
            dispatch(fetchAnimal({
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
            dispatch(fetchAnimal({
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

    const resetHandler = () => {
        dispatch(animalReset())
    }

    return (
        <>
            {animalStatus === 'succeeded' && <CustomAlert title="Success" description="Image uploaded successfully" variant="success" setOpenProp />}
            {animalStatus === 'failed' && <CustomAlert title="Failed" description="Something went wrong" variant="destructive" setOpenProp />}
            {isDragOver && <CustomAlert title="Failed" description="Please select an image" variant="destructive" setOpenProp />}

            {animalStatus === 'failed' ? (
                <ServerError />
            ) : (
                <div className='w-full mx-auto flex justify-center items-center'>
                    <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                        <CardHeader>
                            <CardTitle className="text-lg md:text-2xl text-center">Predict Image of an Animal</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {animalStatus === 'idle' ? (
                                <div className="flex flex-col space-y-4 my-2 items-center ">
                                    <div className="flex flex-col text-center space-y-2 text-sm md:text-base">
                                        <p>It can only predict 40 types and it has a 90% accuracy and it only predicts one animal per image.
                                            Names of animals are Bear, Bee, Butterfly, Cat, Cheetah, Chicken, Chimpanzee, Cow, Crocodile, Deer, Dog, Dolphin, Eagle, Elephant, Fox, Goat, Goldfish, Horse, Jellyfish, Kangaroo, Koala, Lion, Octopus, Owl, Panda, Parrot, Penguin, Pig, Pigeon, Rabbit, Raccoon, Rhinoceros, Sheep, Spider, Squirrel, Starfish, Swan, Tiger, Whale and Zebra. </p>
                                    </div>
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
                            ) : animalStatus === 'loading' ? (
                                <GlobalLoader />
                            ) : null}
                        </CardContent>
                        <CardFooter>
                            {animalStatus === 'succeeded' && (
                                <div className='flex flex-col w-full space-y-4'>
                                    <h1 className='text-center text-2xl font-semibold'>it is a {prediction}</h1>
                                    <div className='w-full h-auto'>
                                        <img src={original} className="w-full" alt="Animal Image" />
                                    </div>
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

export default AnimalScreen