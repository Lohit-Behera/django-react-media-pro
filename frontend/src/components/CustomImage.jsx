import React from 'react'
import { useState } from 'react';
import { Button } from '@/components/ui/button'

function CustomImage({ scr, alt, btn = false, reset, height = 96 }) {
    const [loaded, setLoaded] = useState(0);

    const imagesStyle = {
        opacity: loaded === 1 ? 1 : 0,
        transition: 'opacity 1s 0.5s ease-in-out'
    };
    return (
        <div className='w-full flex flex-col space-y-4'>
            <div className={`w-full h-auto min-h-${height}`}
                style={{
                    width: '100%',
                    maxHeight: '100%',
                    background: `${loaded === 1 ? 'none' : 'radial-gradient(circle, rgba(109,40,217,0.90) 0%, rgba(109,40,217,0.50) 40%, rgba(109,40,217,0.10) 85%)'}`,
                    animation: `${loaded === 1 ? 'none' : 'pulse 2s infinite'}`
                }}
            >
                <img src={scr} className="w-full" style={imagesStyle} alt={alt} onLoad={() => setLoaded(prev => prev + 1)} />
            </div>
            {btn && loaded === 1 && (
                <>
                    <a href={scr} download className='w-full'>
                        <Button className="w-full">
                            Download
                        </Button>
                    </a>
                    <Button className="w-full" onClick={reset}>Another Image</Button>
                </>
            )}
        </div>
    )
}

export default CustomImage