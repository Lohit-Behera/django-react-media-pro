import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
    const userInfo = useSelector((state) => state.user.userInfo)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
    }, [userInfo])

    const [firstName, setFirstName] = useState(userInfo.first_name || '')
    const [lastName, setLastName] = useState(userInfo.last_name || '')
    const [email, setEmail] = useState(userInfo.email || '')
    const [image, setImage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(firstName, lastName, email, password, confirmPassword);
    }

    return (
        <div className='w-full mx-auto flex justify-center items-center'>
            <Card className='w-[95%] md:w-[80%] lg:w-[60%] mt-10'>
                <CardHeader className='items-center'>
                    <CardTitle className="text-3xl">Profile</CardTitle>
                    <CardDescription>
                        <Avatar className="w-24 h-24 mt-4">
                            <AvatarImage src={userInfo.profile} />
                            <AvatarFallback>Profile</AvatarFallback>
                        </Avatar>
                    </CardDescription>
                </CardHeader>
                <CardContent className='text-center'>
                    <ul>
                        <li>
                            <p>Name: {userInfo.first_name} {userInfo.last_name}</p>
                        </li>
                        <li>
                            <p>Email: {userInfo.email}</p>
                        </li>
                        <li>
                            <p>Account Varified: {userInfo.is_verified ? 'Yes' : "No"}</p>
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <div className="flex-grow">
                        <p className='text-center text-3xl mb-4'>Update Profile</p>
                        <p className='text-center text-base my-4 mb-8'>if you dont want to change password or profile image just leave it blank</p>
                        <form onSubmit={() => submitHandler(e)}>
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
                                    <label htmlFor="profile-image">Profile Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        id="image-upload"
                                        label="Upload Image"
                                        onChange={(e) => setImage(e.target.value)}
                                        className='block w-full text-white
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-[#6d28d9] file:text-white
                                        hover:file:bg-[#6318d9]
                                        file:disabled:opacity-50 file:disabled:pointer-events-none cursor-pointer'
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <Button className="w-full">
                                    Update
                                </Button>
                            </div>
                        </form>

                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}

export default ProfileScreen