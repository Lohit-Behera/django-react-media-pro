import React from 'react'

function Header() {
    return (
        <nav className="z-20 w-full sticky top-0  mb-1 backdrop-blur bg-purple-50/60 dark:bg-purple-950/60 shadow ">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-4 md:font-semibold text-purple-950 dark:text-purple-100">
                <div>
                    Home
                </div>
            </div>
        </nav>
    )
}

export default Header