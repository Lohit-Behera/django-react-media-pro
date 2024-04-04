import React from 'react'
import { TimerOff } from 'lucide-react'

function VerifyExpiredScreen() {
    return (
        <div>
            <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
                <div className="text-center">
                    <div className="inline-flex rounded-full bg-red-100 p-6 shadow-lg shadow-red-500 ">
                        <div className="rounded-full stroke-red-600 shadow-md shadow-red-500 bg-red-200 p-4">
                            <TimerOff size={84} color="#ef4444" />
                        </div>
                    </div>
                    <h1 className="mt-5 text-3xl md:text-5xl font-bold">Varification token expired or does not exist</h1>
                    <p className="mt-5 lg:text-lg">&nbsp;</p>
                </div>
            </div>
        </div>
    )
}

export default VerifyExpiredScreen