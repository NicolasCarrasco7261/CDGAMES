import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css'


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
                src={prod.imagen}
                className="card-img-top"
                alt={prod.imgDesc}
              />
              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="card-text">Precio: ${prod.precio}</p>
                <Link to="/carrito" className="btn btn-primary">Agregar al carrito</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

