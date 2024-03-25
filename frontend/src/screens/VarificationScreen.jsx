import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function VarificationScreen() {
    const navigate = useNavigate()
    return (
        <div className='w-full flex justify-center items-center mt-10 md:mt-48'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Varification</CardTitle>
                    <CardDescription>We send you an email to varify your account</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="w-full" onClick={() => { navigate("/") }}>Home</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default VarificationScreen