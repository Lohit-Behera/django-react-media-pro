import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchRegister } from '@/features/UserSlice'
import { Loader2 } from "lucide-react"

import ServerError from '@/components/ServerError'
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

function RegisterScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const regisrerStatus = useSelector(state => state.user.regisrerStatus)

    useEffect(() => {
        if (regisrerStatus === 'succeeded') {
            navigate('/varification')
        }
    }, [regisrerStatus, navigate])

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [wrongPassword, setWrongPassword] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setWrongPassword(true)
            const timer = setTimeout(() => {
                setWrongPassword(false)
            }, 3700)
            return () => clearTimeout(timer)
        } else {
            dispatch(fetchRegister({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            }))
        }
    }

    return (
        <>
            {wrongPassword && <CustomAlert title="Failed" description="Password does not match" variant="destructive" setOpenProp />}

            {regisrerStatus === 'loading' ? (
                <Loader2 className="w-14 h-14 animate-spin mx-auto" />
            ) : regisrerStatus === 'failed' ? (
                <ServerError />
            ) : (
                <div className='mt-32'>
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">Sign Up</CardTitle>
                            <CardDescription>
                                Enter your information to create an account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={(e) => submitHandler(e)}>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="first-name">First name</Label>
                                            <Input
                                                id="first-name"
                                                placeholder="First Name"
                                                required
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="last-name">Last name</Label>
                                            <Input
                                                id="last-name"
                                                placeholder="Last Name"
                                                required
                                                onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            required
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                    <Button className="w-full">
                                        Create an account
                                    </Button>
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline">
                                        Sign in
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    )
}

export default RegisterScreen