import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Producto from "../pages/Producto"
import Carrito from "../pages/Carrito"
import RubroManufacturado from "../pages/RubroManufacturado"

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path= '/' element={<HomePage/>}/>
        <Route path='/Producto' element={<Producto/>}/>
        <Route path='/Carrito' element={<Carrito/>}/>
        <Route path='/RubroManufacturado' element={<RubroManufacturado/>}/>
        
       
    </Routes>
  )
}

export default AppRoutes