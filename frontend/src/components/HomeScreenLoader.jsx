import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card"

function HomeScreenLoader() {
    return (
        <div className='w-[95%] mx-auto animate-pulse'>
            <h1 className='h-5 md:h-6 lg:h-7 w-40 mx-auto bg-[#6d28d9] rounded'></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-10'>
                <Card>
                    <CardHeader className='space-y-4'>
                        <CardTitle className='h-5 md:h-6 lg:h-7 w-32 lg:w-36 mx-auto bg-[#6d28d9] rounded'></CardTitle>
                        <CardDescription className='h-3 md:h-4 lg:h-5 w-52 bg-[#6d28d9] rounded'></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='h-[330px] bg-[#6d28d9] rounded'></div>
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className='space-y-4'>
                        <CardTitle className='h-5 md:h-6 lg:h-7 w-32 lg:w-36 mx-auto bg-[#6d28d9] rounded'></CardTitle>
                        <CardDescription className='h-3 md:h-4 lg:h-5 w-52 bg-[#6d28d9] rounded'></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='h-[330px] bg-[#6d28d9] rounded'></div>
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader className='space-y-4'>
                        <CardTitle className='h-5 md:h-6 lg:h-7 w-32 lg:w-36 mx-auto bg-[#6d28d9] rounded'></CardTitle>
                        <CardDescription className='h-3 md:h-4 lg:h-5 w-52 bg-[#6d28d9] rounded'></CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='h-[330px] bg-[#6d28d9] rounded'></div>
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                        <div className='h-3 lg:h-4 w-full bg-[#6d28d9] rounded'></div>
                    </CardFooter>
                </Card>

            </div>
        </div>
    )
}

export default HomeScreenLoader