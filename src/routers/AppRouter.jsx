import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import StateManage from '../pages/StateManage'
import GuestRoute from './GuestRoute'
import NormalUserRoute from './NormalUserRoute'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/state-test' element={<StateManage />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />}></Route>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
          </Route>
        </Route>

        <Route path='/normal/*' element={<NormalUserRoute />}>
          <Route path='order' element={<>My Order</>}></Route>
          <Route path='cart' element={<>My Cart</>}></Route>
          <Route path='*' element={<>404 Not Found</>} ></Route>
        </Route>

        {/* Make a Route Protection for admin
          make a layout for admin
          make header and add logout 
          make 4 route /admin/dashboard 
          /admin/users
          /admin/categories
          /admin/products

          apply the route production in these routes
        */}

      </Routes>
    </BrowserRouter>
  )
}
// task
// in login page
// make 2 link 
// go back -> routes to homepage
// register -> routes to register
// make footer and add it in layout
// Footer - 2025 @ MyApp