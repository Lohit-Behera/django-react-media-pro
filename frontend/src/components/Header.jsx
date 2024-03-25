import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/features/UserSlice';

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



function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const userInfo = useSelector((state) => state.user.userInfo)

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <nav className="z-20 w-full sticky top-0 mb-1 shadow ">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4 md:font-semibold">
                <div className="flex justify-between w-full py-3 md:py-3">
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
                                    <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
                                </li>
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
                                                <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
                                            </li>
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
                                            <AvatarImage src={userInfo.profile_image} />
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
    )
}

export default Header