import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function Cards() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

      Swal.fire({ title: 'Producto agregado', text: `${producto.nombre} agregado al carrito`, icon: 'success' });
      console.log('Carrito actual:', carritoActual);
    } catch (err) {
      console.error('Error al agregar al carrito:', err);
    }
  };

  const productosActivosLimitados = useMemo(() => {
    return productos.filter(p => p.activo).slice(0, 30);
  }, [productos]);

  const productosFiltrados = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return productosActivosLimitados;

    return productosActivosLimitados.filter(p => {
      const nombre = (p.nombre || '').toLowerCase();
      return nombre.includes(q);
    });
  }, [productosActivosLimitados, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form role="search-producto" onSubmit={handleSearchSubmit} className="search-form">
        <input
          className="input-search-producto"
          type="search"
          placeholder="Ingrese un producto a buscar"
          aria-label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      <div className='container-card'>
        {productosFiltrados.length === 0 ? (
          <h2>{searchTerm ? `No se encuentraron productos con el término de búsqueda "${searchTerm}".` : 'No hay productos disponibles.'}</h2>
        ) : (
          productosFiltrados.map((prod) => (
            <div className="card" key={prod.id}>
              <img
                src={prod.imagenUrl}
                className="card-img-top"
                alt={prod.nombre || 'img-producto'}
              />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="card-text">Precio: ${prod.precio}</p>
                <button className="btn-card" onClick={() => agregaCarrito(prod)}>Agregar al carrito</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
