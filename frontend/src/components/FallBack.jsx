import React from 'react'
import { Frown } from 'lucide-react'

function FallBack() {
    return (
        <div>
            <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
                <div className="text-center">
                    <div className="inline-flex rounded-full bg-red-100 p-6 shadow-md shadow-red-500">
                        <div className="rounded-full bg-red-200 shadow-lg shadow-red-500 p-4 ">
                            <Frown size={84} color="#ef4444" />
                        </div>
                    </div>
                    <h1 className="mt-5 text-3xl md:text-5xl font-bold">Something went wrong</h1>
                    <p className="mt-5 lg:text-lg">Oops something went wrong. Try to refresh this page or <br /> feel free to contact us if the problem presists.</p>
                </div>
            </div>
        </div>
    )
}

export default FallBack