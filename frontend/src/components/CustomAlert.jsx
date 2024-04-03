import React from 'react'
import { useState, useEffect } from 'react'

import { TriangleAlert, CircleCheckBig } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


function CustomAlert({ title = '', description = '', variant = 'success', setOpenProp = false }) {
    const [open, setOpen] = useState(false)
    const [out, setOut] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        if (setOpenProp) {
            setOpen(setOpenProp)
        }
    }, [setOpenProp])

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOut(true)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [open])

    useEffect(() => {
        if (out) {
            const timer = setTimeout(() => {
                setHide(true)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [out])

    return (
        <div>
            <Alert variant={variant} className={`fixed inset-x-0 top-20 mx-auto p-4 z-50 pointer-events-none max-w-sm md:min-w-fit ${!out && 'animate-slide-in-from-top'} ${out && 'animate-slide-out-to-top'} ${hide && 'hidden'} `}>
                {variant === 'destructive' && <TriangleAlert className='mt-1' color="#ef4444" />}
                {variant === 'success' && <CircleCheckBig className='mt-1' color="#22c55e" />}
                <TriangleAlert color="#ef4444" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        </div>
    )
}

export default CustomAlert