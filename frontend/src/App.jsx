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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<HomeScreen />} />
      <Route path='login' element={<LoginScreen />} />
      <Route path='register' element={<RegisterScreen />} />
      <Route path='varification' element={<VarificationScreen />} />
      <Route path='profile' element={<ProfileScreen />} />
      <Route path='upscale' element={<UpscaleScreen />} />
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
