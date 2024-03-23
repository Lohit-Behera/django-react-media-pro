import React from 'react'
import { Link } from 'react-router-dom';
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


function Header() {
    return (
        <nav className="z-20 w-full sticky top-0 mb-1 shadow ">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4 md:font-semibold">
                <div className="flex justify-between w-full py-3 md:py-3">
                    <div className='hidden md:block'>
                        <div>
                            <ul className="flex space-x-6">
                                <li>
                                    <img className='h-10 w-10 object-fill rounded-full' src={Logo} alt="" />
                                </li>
                                <li>
                                    <Link to="/"><Button variant="ghost">Home</Button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='block md:hidden mt-1'>
                        <Sheet>
                            <SheetTrigger><Menu color="#6d28d9" /></SheetTrigger>
                            <SheetContent side='left'>
                                <SheetHeader>
                                    <SheetTitle><img className='h-10 w-10 object-fill rounded-full mx-auto mb-4' src={Logo} alt="" /></SheetTitle>
                                    <SheetDescription>
                                        <ul>
                                            <li>
                                                <Link to="/"><Button variant="ghost">Home</Button></Link>
                                            </li>
                                        </ul>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className=''>
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header