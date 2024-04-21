import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserUpdate } from '@/features/UserSlice'
import CustomPassword from '@/components/CustomPassword'
//TODO fix database

import CustomAlert from '@/components/CustomAlert'
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function ProfileScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userInfo = useSelector((state) => state.user.userInfo)
    const userdetails = useSelector((state) => state.user.userdetails)
    const userUpdateStatus = useSelector((state) => state.user.userUpdateStatus)
    const userUpdateSucceeded = userUpdateStatus === 'succeeded'

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])


    const profile_image = userdetails ? userdetails.profile_image : ''
    const first_name = userdetails ? userdetails.first_name : ''
    const last_name = userdetails ? userdetails.last_name : ''
    const userEmail = userdetails ? userdetails.email : ''
    const is_verified = userdetails ? userdetails.is_verified : false

    const [firstName, setFirstName] = useState(first_name)
    const [lastName, setLastName] = useState(last_name)
    const [email, setEmail] = useState(userEmail)
    const [image, setImage] = useState(profile_image)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setIsDragging(false);
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

    const uploadHandler = (e) => {
        const file = e.target.files[0]
        if (file.type.startsWith('image/')) {
            setImage(file)
        } else {
            setIsDragOver(true)
            const timer = setTimeout(() => {
                setIsDragOver(false)
            }, 3700)
            return () => clearTimeout(timer)
        }
    }

    const submitHandler = () => {

        if (password !== confirmPassword) {
            setWrongPassword(true)
            const timer = setTimeout(() => {
                setWrongPassword(false)
            }, 3700)
            return () => clearTimeout(timer)
        } else {
            dispatch(fetchUserUpdate({
                id: userInfo.id,
                first_name: firstName,
                last_name: lastName,
                profile_image: image,
                email: email,
                password: password
            }))
        }
    }

    return (
        <>
            {isDragOver && <CustomAlert title="Failed" description="Please select an image" variant="destructive" setOpenProp />}
            {wrongPassword && <CustomAlert title="Failed" description="Password does not match" variant="destructive" setOpenProp />}
            {userUpdateSucceeded && <CustomAlert title="Success" description="Profile updated successfully" variant="success" setOpenProp />}

            <div className='w-full mx-auto flex justify-center items-center'>
                <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                    <CardHeader className='items-center'>
                        <CardTitle className="text-3xl">Profile</CardTitle>
                        <CardDescription>
                            <Avatar className="w-24 h-24 mt-4">
                                <AvatarImage src={profile_image} />
                                <AvatarFallback>Profile</AvatarFallback>
                            </Avatar>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='text-center'>
                        <ul>
                            <li>
                                <p>Name: {first_name} {last_name}</p>
                            </li>
                            <li>
                                <p>Email: {email}</p>
                            </li>
                            <li>
                                <p>Account Varified: {is_verified ? 'Yes' : "No"}</p>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <div className="flex-grow">
                            <p className='text-center text-3xl mb-4'>Update Profile</p>
                            <p className='text-center text-base my-4 mb-8'>if you dont want to change password or profile image just leave it blank</p>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input
                                            id="first-name"
                                            placeholder="First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input
                                            id="last-name"
                                            placeholder="Last Name"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className="grid gap-2">
                                <Label htmlFor="profile-image">Profile Image</Label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image-upload"
                                        accept="image/*"
                                        label="Upload Image"
                                        onChange={(e) => imageHnandler(e)}
                                        className='block w-full text-white
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-[#6d28d9] file:text-white
                                        hover:file:bg-[#6318d9]
                                        file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer'
                                    />
                                </div>
                                <CustomPassword id="password" label="Password" placeholder="Password" change={(e) => setPassword(e.target.value)} />
                                <CustomPassword id="confirm-password" label="Confirm Password" placeholder="Confirm Password" change={(e) => setConfirmPassword(e.target.value)} />
                                <Button
                                    onClick={submitHandler}
                                    className="w-full">
                                    Update
                                </Button>
                            </div>

                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default ProfileScreen