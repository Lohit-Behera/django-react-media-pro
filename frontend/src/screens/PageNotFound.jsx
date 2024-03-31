import React from 'react'

import { TriangleAlert } from 'lucide-react'

function PageNotFound() {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-yellow-100 p-6 shadow-md shadow-amber-600">
                    <div className="rounded-full stroke-yellow-600 bg-yellow-200 p-4 shadow-lg shadow-amber-600">
                        <TriangleAlert size={84} color="#eab308" />
                    </div>
                </div>
                <h1 className="mt-5 text-3xl md:text-5xl font-bold">404 - Page not found</h1>
                <p className="mt-5 lg:text-lg">The page you are looking for doesn't exist or <br />has been removed.</p>
            </div>
        </div>
    )
}

export default PageNotFound