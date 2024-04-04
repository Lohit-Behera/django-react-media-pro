import React from 'react'
import { LoaderCircle } from 'lucide-react'

function GlobalLoader() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <LoaderCircle className="animate-spin" size={84} color="#6428d9" strokeWidth={3} />
        </div>
    )
}

export default GlobalLoader