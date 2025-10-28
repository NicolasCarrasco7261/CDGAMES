import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Productos } from './pages/Productos/Productos';
import { Nosotros } from './pages/Nosotros/Nosotros';
import { Contacto } from './pages/Contacto/Contacto';
import { Carrito } from './pages/Carrito/Carrito';
import { Login } from './pages/Login-register/Login';
import { Register } from './pages/Login-register/Register';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/productos" element={<Productos />}/>
        <Route path="/nosotros" element={<Nosotros />}/>
        <Route path="/contacto" element={<Contacto />}/>
        <Route path="/carrito" element={<Carrito />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  )
}

export default App
