import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '@/features/UserSlice';
import { fetchDeleteImages, fetchDeleteRawImages } from '@/features/DeleteImagesSlice';

import CustomAlert from '@/components/CustomAlert';
import DarkModeToggle from './DarkModeToggle'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import Logo from '../assets/Logo.svg'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"




function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userInfo = useSelector((state) => state.user.userInfo)
    const userdetails = useSelector((state) => state.user.userdetails)
    const deleteStatus = useSelector((state) => state.deleteImages.deleteStatus)
    const deleteRawStatus = useSelector((state) => state.deleteImages.deleteRawStatus)

    const profileImage = userdetails ? userdetails.profile_image : ''
    const is_staff = userInfo ? userInfo.is_staff : false

    const [alert, setAlert] = useState(false)

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        setAlert(true)
    }

    const deleteImageHandler = () => {
        dispatch(fetchDeleteImages())
        dispatch(fetchDeleteRawImages())
    }

    return (
        <>
            {(deleteStatus === 'succeeded' && deleteRawStatus === 'succeeded') && (
                <CustomAlert title="Success" description="Images are deleted" variant="success" setOpenProp />
            )}

            {(deleteStatus === 'failed' || deleteRawStatus === 'failed') && (
                <CustomAlert title="Error" description="Something went wrong" variant="destructive" setOpenProp />
            )}

            {alert && <CustomAlert title="Success" description="Logged out successfully" variant="success" setOpenProp />}

            <nav className="z-20 w-full sticky top-0 mb-1 backdrop-blur bg-white/50 dark:bg-[#030712]/50 shadow  ">
                <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-4 md:font-semibold">
                    <div className="flex justify-between w-[95%] mx-auto py-3 md:py-3">
                        <div className='hidden md:block'>
                            <div>
                                <ul className="flex space-x-3">
                                    <li>
                                        <Link to="/">
                                            <Avatar>
                                                <AvatarImage src={Logo} />
                                                <AvatarFallback>MP</AvatarFallback>
                                            </Avatar>
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink to="/">
                                            {({ isActive, isPending, isTransitioning }) => (
                                                <Button
                                                    variant={isActive ? 'default' : 'ghost'}
                                                    disabled={isPending || isTransitioning}
                                                >
                                                    Home
                                                </Button>
                                            )}
                                        </NavLink>
                                    </li>
                                    {is_staff && (
                                        <>
                                            <li>
                                                <NavLink to="/users">
                                                    {({ isActive, isPending, isTransitioning }) => (
                                                        <Button
                                                            variant={isActive ? 'default' : 'ghost'}
                                                            disabled={isPending || isTransitioning}
                                                        >
                                                            Users
                                                        </Button>
                                                    )}
                                                </NavLink>
                                            </li>
                                            <li>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost">Delete unused Images</Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete unused Images.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={deleteImageHandler}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </li>
                                        </>
                                    )}
                                    {userInfo ? (
                                        <li>
                                            <Button variant="ghost" onClick={logoutHandler}>Log Out</Button>
                                        </li>
                                    ) : (
                                        <li>
                                            <NavLink to="/login">
                                                {({ isActive, isPending, isTransitioning }) => (
                                                    <Button
                                                        variant={isActive ? 'default' : 'ghost'}
                                                        disabled={isPending || isTransitioning}
                                                    >
                                                        Login
                                                    </Button>
                                                )}
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className='block md:hidden mt-1'>
                            <Sheet>
                                <SheetTrigger><Menu color="#6d28d9" /></SheetTrigger>
                                <SheetContent side='left'>
                                    <SheetHeader className="items-center">
                                        <SheetTitle>
                                            <Avatar>
                                                <AvatarImage src={Logo} />
                                                <AvatarFallback>MP</AvatarFallback>
                                            </Avatar>
                                        </SheetTitle>
                                        <SheetDescription>
                                            <ul className="space-y-4">
                                                <li>
                                                    <NavLink to="/">
                                                        {({ isActive, isPending, isTransitioning }) => (
                                                            <Button
                                                                variant={isActive ? 'default' : 'ghost'}
                                                                disabled={isPending || isTransitioning}
                                                            >
                                                                Home
                                                            </Button>
                                                        )}
                                                    </NavLink>
                                                </li>
                                                {is_staff && (
                                                    <>
                                                        <li>
                                                            <NavLink to="/users">
                                                                {({ isActive, isPending, isTransitioning }) => (
                                                                    <Button
                                                                        variant={isActive ? 'default' : 'ghost'}
                                                                        disabled={isPending || isTransitioning}
                                                                    >
                                                                        Users
                                                                    </Button>
                                                                )}
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <Button variant="ghost" onClick={deleteImageHandler}>Delete unused images</Button>
                                                        </li>
                                                    </>
                                                )}
                                                {userInfo ? (
                                                    <li>
                                                        <Button variant="ghost" onClick={logoutHandler}>Log Out</Button>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <Button variant="ghost" onClick={() => navigate("/login")}>Login</Button>
                                                    </li>
                                                )}
                                            </ul>
                                        </SheetDescription>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <div>
                            <ul className='flex'>
                                {userInfo &&
                                    <li className='mr-3'>
                                        <Link to="/profile">
                                            <Avatar>
                                                <AvatarImage src={profileImage} />
                                                <AvatarFallback>P</AvatarFallback>
                                            </Avatar>
                                        </Link>
                                    </li>}
                                <li className='mt-0.5'>
                                    <DarkModeToggle />
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header