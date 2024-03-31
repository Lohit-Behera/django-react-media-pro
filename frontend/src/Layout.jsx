import React from 'react'
import { Outlet } from 'react-router-dom'

import { ErrorBoundary } from "react-error-boundary";

import Header from './components/Header'
import Footer from './components/Footer'
import FallBack from './components/FallBack';

function Layout() {
    return (
        <>
            <Header />
            <ErrorBoundary FallbackComponent={FallBack}>
                <Outlet />
            </ErrorBoundary>
            <Footer />
        </>
    )
}

export default Layout