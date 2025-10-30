import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Productos } from './pages/Productos/Productos';
import { Nosotros } from './pages/Nosotros/Nosotros';
import { Contacto } from './pages/Contacto/Contacto';
import { Carrito } from './pages/Carrito/Carrito';
import { Login } from './pages/Login-register/Login';
import { Register } from './pages/Login-register/Register';
import Inventario from './pages/Inventario/Inventario';
import CrearProducto from './components/CrearProd/CrearProductos';
import CrearUsuario from './components/CrearUser/CrearUsuario';
import EditarProducto from './components/EditarProd/EditarProd';
import EditarUsuario from './components/EditarUser/EditarUsuario';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
      </Routes>
    </Router>
  )
}

export default App
