import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export function Cards() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/productos');
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      const productosActivos = data.map(p => ({
        ...p,
        activo: p.activo === true || p.activo === 'true',
      }));

      setProductos(productosActivos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

   const agregaCarrito = (producto) => {
    try {
      const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

      const index = carritoActual.findIndex(item => item.id === producto.id);

      if (index >= 0) {
        carritoActual[index].cantidad = (carritoActual[index].cantidad || 1) + 1;
      } else {
        carritoActual.push({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagenUrl: producto.imagenUrl,
          stock: producto.stock,
          cantidad: 1
        });
      }

      localStorage.setItem('carrito', JSON.stringify(carritoActual));

      Swal.fire({title: 'Producto agregado', text: `${producto.nombre} agregado al carrito`, icon: 'success'});
      console.log('Carrito actual:', carritoActual);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    }
  };

  const productosActuales = productos.filter(p => p.activo).slice(0, 30);

  return (
    <>
      <div className='container-card'>
        {productosActuales.length === 0 ? (
          <h2>No hay productos disponibles.</h2>
        ) : (
          productosActuales.map((prod) => (
            <div className="card" key={prod.id}>
              <img
                src={prod.imagenUrl}
                className="card-img-top"
                alt="img-producto"
              />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="card-text">Precio: ${prod.precio}</p>
                <button className="btn btn-primary" onClick={() => agregaCarrito(prod)}>Agregar al carrito</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

