import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export function CarroCompra() {

  const [carrito, setCarrito] = useState([]);

  const cargarCarrito = () => {
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const normalized = cart.map(item => ({
      ...item,
      precio: Number(item.precio) || 0,
      cantidad: Number(item.cantidad) || 1,
      stock: Number(item.stock) || 0
    }));
    setCarrito(normalized);
  };

  useEffect(() => {
    cargarCarrito();
    const handler = () => cargarCarrito();
    window.addEventListener('storage', handler);
    window.addEventListener('carrito_actualizado', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('carrito_actualizado', handler);
    };
  }, []);

  const calcularTotal = () =>
    carrito.reduce((s, it) => s + (it.precio || 0) * (it.cantidad || 1), 0);

  const formatPeso = (num) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(num);

  const guardarYActualizar = (nuevoCarrito) => {
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
    window.dispatchEvent(new CustomEvent('carrito_actualizado'));
  };

  const vaciarCarrito = () => {

    localStorage.removeItem('carrito');
    setCarrito([]);
    window.dispatchEvent(new CustomEvent('carrito_actualizado'));
  };

  const eliminarItem = (id) => {
    const nuevo = carrito.filter(i => i.id !== id);
    guardarYActualizar(nuevo);
  };

  const cambiarCantidad = (id, cantidad) => {
    const nuevo = carrito.map(i => i.id === id ? { ...i, cantidad: cantidad } : i);
    guardarYActualizar(nuevo);
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      Swal({ title: 'Carro de compra vacío', text: 'El carrito está vacío.', icon: 'warning' });
      return;
    }

    const total = calcularTotal();
    Swal.fire({ title: 'Compra realizada', text: `Compra realizada. Total: ${formatPeso(total)}`, icon: 'success' });

    vaciarCarrito();
  };

  return (
    <section className="carrito">
      <h2>Tu carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul id="lista-carrito" style={{ listStyle: 'none', padding: 0 }}>
            {carrito.map(item => (
              <li key={item.id} className="carrito-item" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                <img src={item.imagenUrl} alt={item.nombre} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700 }}>{item.nombre}</div>
                  <div style={{ fontSize: 13 }}>Stock disponible: {item.stock}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => cambiarCantidad(item.id, Math.max(1, item.cantidad - 1))}>-</button>
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    onChange={(e) => cambiarCantidad(item.id, Math.max(1, Number(e.target.value) || 1))}
                    style={{ width: 56, textAlign: 'center' }}
                  />
                  <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
                </div>

                <div style={{ width: 120, textAlign: 'right' }}>
                  <div>{formatPeso(item.precio * item.cantidad)}</div>
                  <button onClick={() => eliminarItem(item.id)} style={{ marginTop: 6 }}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>

          <p id="total" style={{ fontWeight: 700 }}>Total: {formatPeso(calcularTotal())}</p>

          <div style={{ display: 'flex', gap: 12 }}>
            <button id="vaciar" onClick={vaciarCarrito}>Vaciar Carrito</button>
            <button id="comprar" onClick={finalizarCompra}>Finalizar Compra</button>
          </div>
        </>
      )}
    </section>
  );
}