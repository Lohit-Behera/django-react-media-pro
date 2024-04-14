import React from 'react'
import { useState } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';

function ImageCompare({ leftImg, rightImg, leftLabel = '', rightLabel = '', disabledLable, transparent = false }) {
    const [loaded, setLoaded] = useState(0);
    const [labelOpacity, setLabelOpacity] = useState(1);

    const labelStyle = {
        fontSize: '1.25rem',
        position: 'absolute',
        padding: '0.5rem',
        color: 'white',
        opacity: labelOpacity,
        border: '2px solid white',
        borderRadius: '.5rem',
        backdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(50%)',
        WebkitBackdropFilter: 'blur(0.25rem) saturate(180%) contrast(80%) brightness(50%)',
        transition: 'opacity 0.25s ease-in-out'
    };

    const imagesStyle = {
        opacity: loaded === 2 ? 1 : 0,
        transition: 'opacity 1s 0.5s ease-in-out'
    };
    const checkPattern = {
        backgroundColor: 'white',
        backgroundImage: `
              linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
        backgroundSize: `20px 20px`,
        backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
    }


    return (
        <div>
            <ReactCompareSlider
                style={{
                    width: '100%',
                    maxHeight: '100%',
                    background: `${loaded === 2 ? 'none' : 'radial-gradient(circle, rgba(109,40,217,0.90) 0%, rgba(109,40,217,0.50) 40%, rgba(109,40,217,0.10) 85%)'}`,
                    animation: `${loaded === 2 ? 'none' : 'pulse 2s infinite'}`
                }}
                handle={<ReactCompareSliderHandle style={{
                    color: '#6d28d9',
                }}
                    buttonStyle={{
                        width: '3rem',
                        height: '3rem',
                    }} />}
                onPointerDown={() => setLabelOpacity(0)} onPointerUp={() => setLabelOpacity(1)}
                itemOne={
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'start'
                    }}>
                        {!disabledLable && loaded === 2 && <div style={labelStyle}>
                            {leftLabel}
                        </div>}
                        <ReactCompareSliderImage src={leftImg} alt="Image one" style={imagesStyle} onLoad={() => setLoaded(prev => prev + 1)} />
                    </div>
                }
                itemTwo={
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'end'
                    }}>
                        {!disabledLable && loaded === 2 && <div style={labelStyle}>
                            {rightLabel}
                        </div>}
                        <ReactCompareSliderImage src={rightImg} alt="Image two" onLoad={() => setLoaded(prev => prev + 1)}
                            style={
                                transparent
                                    ? {
                                        ...imagesStyle,
                                        ...checkPattern
                                    }
                                    : imagesStyle
                            }
                        />
                    </div>}
            />
        </div>
    )
}

export default ImageCompare