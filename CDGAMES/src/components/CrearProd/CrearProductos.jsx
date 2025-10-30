import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearProductos.css';

const API_BASE_URL = 'http://localhost:8080/api';

export default function CrearProducto() {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',       // ← agregado
    categoria: ''
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingCategorias, setLoadingCategorias] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/categorias`)
      .then(response => {
        if (!response.ok) throw new Error('Error al cargar categorías');
        return response.json();
      })
      .then(data => {
        setCategorias(data);
        setLoadingCategorias(false);
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
        setError('No se pudieron cargar las categorías');
        setLoadingCategorias(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const productoParaEnviar = {
      codigo: producto.codigo.trim(),
      nombre: producto.nombre.trim(),
      descripcion: producto.descripcion.trim(),
      precio: parseFloat(producto.precio),
      stock: parseInt(producto.stock, 10),  // ← agregado
      categoria: { id: parseInt(producto.categoria, 10) }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoParaEnviar)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al crear el producto');
      }

      navigate('/', {
        state: { message: 'Producto creado exitosamente' }
      });

    } catch (err) {
      setError(err.message || 'No se pudo crear el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const tieneContenido = Object.values(producto).some(val => val !== '');
    if (!tieneContenido || window.confirm('¿Está seguro de cancelar? Se perderán los datos ingresados.')) {
      navigate('/');
    }
  };

  return (
    <div className="crear-producto-container">
      <div className="form-card">

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        {loadingCategorias ? (
          <div className="loading">Cargando categorías...</div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* Fila: Código + Stock */}
            <div className="form-row">
              <div className="form-group" style={{ maxWidth: '200px' }}>
                <label htmlFor="codigo">
                  Código <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={producto.codigo}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={20}
                  placeholder="Ej: NIN001"
                  required
                />
              </div>

              <div className="form-group" style={{ maxWidth: '200px' }}>
                <label htmlFor="stock">
                  Stock <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  value={producto.stock}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Ej: 10"
                  required
                />
              </div>
            </div>

            {/* Fila: Nombre + Precio */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">
                  Nombre del producto <span className="required">*</span>
                </label>
                <input
                  type="text" id="nombre" name="nombre" value={producto.nombre}
                  onChange={handleChange} disabled={loading} maxLength={100}
                  placeholder="Ej: The Legend of Zelda" required
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">
                  Precio <span className="required">*</span>
                </label>
                <div className="price-input">
                  <span className="currency">$</span>
                  <input
                    type="number" id="precio" name="precio" step="1" min="1"
                    value={producto.precio} onChange={handleChange} disabled={loading}
                    placeholder="1000" required
                  />
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="form-group">
              <label htmlFor="descripcion">
                Descripción <span className="required">*</span>
              </label>
              <textarea
                id="descripcion" name="descripcion" rows="4"
                value={producto.descripcion} onChange={handleChange} disabled={loading}
                maxLength={500} placeholder="Características principales del producto..."
                required
              />
              <small className="char-count">
                {producto.descripcion.length}/500 caracteres
              </small>
            </div>

            {/* Categoría */}
            <div className="form-group">
              <label htmlFor="categoria">
                Categoría <span className="required">*</span>
              </label>
              <select
                id="categoria" name="categoria" value={producto.categoria}
                onChange={handleChange} disabled={loading || categorias.length === 0}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              {categorias.length === 0 && !loadingCategorias && (
                <small className="error-text">No hay categorías disponibles</small>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Guardando...' : 'Crear Producto'}
              </button>
              <button type="button" onClick={handleCancel} disabled={loading} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

