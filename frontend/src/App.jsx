import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import Layout from './Layout'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import VarificationScreen from './screens/VarificationScreen'
import ProfileScreen from './screens/ProfileScreen'
import UpscaleScreen from './screens/UpscaleScreen'
import RemoveBgScreen from './screens/RemoveBgScreen'
import BlurBgScreen from './screens/BlurBgScreen'
import FilterScreen from './screens/FilterScreen'
import ConvertScreen from './screens/ConvertScreen'
import DownScaleScreen from './screens/DownScaleScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<HomeScreen />} />
      <Route path='login' element={<LoginScreen />} />
      <Route path='register' element={<RegisterScreen />} />
      <Route path='varification' element={<VarificationScreen />} />
      <Route path='profile' element={<ProfileScreen />} />
      <Route path='upscale' element={<UpscaleScreen />} />
      <Route path='removebg' element={<RemoveBgScreen />} />
      <Route path='blurbg' element={<BlurBgScreen />} />
      <Route path='filter' element={<FilterScreen />} />
      <Route path='convert' element={<ConvertScreen />} />
      <Route path='downscale' element={<DownScaleScreen />} />
    </Route>
  )
)

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
