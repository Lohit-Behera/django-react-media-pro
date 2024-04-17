import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchLogin } from '@/features/UserSlice'

import CustomPassword from '@/components/CustomPassword'
import CustomAlert from '@/components/CustomAlert'
import { Button } from "../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

function LoginScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector((state) => state.user.userInfo)
    const userInfoStatus = useSelector((state) => state.user.userInfoStatus)

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo, navigate])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const loginHandler = () => {
        dispatch(fetchLogin({
            email: email,
            password: password
        }))
    }

    return (
        <>
            {userInfoStatus === "failed" && <CustomAlert title="Failed" description="Your email or password is incorrect or you don't have an account" variant="destructive" setOpenProp />}
            <div className="w-full flex justify-center items-center mt-10 md:mt-20">
                <Card className="mx-auto max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl">Login</CardTitle>
                        <CardDescription className='md:text-base'>
                            Enter your information to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label className='md:text-base' htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <CustomPassword id="password" label="Password" placeholder="Password" change={(e) => setPassword(e.target.value)} />
                            <Button onClick={loginHandler} className="w-full md:text-base'">
                                Login
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default LoginScreen