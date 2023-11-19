import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Producto from "../pages/Producto"
import Carrito from "../pages/Carrito"
import RubroManufacturado from "../pages/RubroManufacturado"
import React from "react"


const Login = React.lazy(() => import('../pages/login/Login'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path= '/' element={<HomePage/>}/>
        <Route path='/Producto' element={<Producto/>}/>
        <Route path='/Carrito' element={<Carrito/>}/>
        <Route path='/RubroManufacturado' element={<PrivateRoute element ={<RubroManufacturado/>}/>}/>
        <Route element={<Login />} path="/login" />
        
        
       
       
        
       
    </Routes>
  )
}

export default AppRoutes