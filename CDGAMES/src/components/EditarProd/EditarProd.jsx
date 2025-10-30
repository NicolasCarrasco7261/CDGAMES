import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CrearProd/CrearProductos.css";

const API_BASE_URL = "http://localhost:8080/api";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // mismos campos que en Crear (sin categoría)
  const [form, setForm] = useState({
    codigo: "",
    stock: "",
    nombre: "",
    precio: "",
    descripcion: ""
  });

  useEffect(() => {
    let ignore = false;

    async function fetchProducto() {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/productos/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el producto");
        const data = await res.json();

        if (!ignore) {
          setForm({
            codigo: data.codigo ?? "",
            stock: data.stock ?? "",
            nombre: data.nombre ?? "",
            precio: data.precio ?? "",
            descripcion: data.descripcion ?? ""
          });
        }
      } catch (e) {
        if (!ignore) setError(e.message || "Error al cargar el producto");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchProducto();
    return () => { ignore = true; };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      id: Number(id),
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock, 10)
    };

    try {
      const res = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al guardar cambios");
      }

      navigate("/"); // sin banners
    } catch (e) {
      setError(e.message || "No se pudieron guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  // ⬇️ Sin confirmación
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="crear-producto-container">
      <div className="form-card">
        <h2>Editar Producto</h2>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Cargando producto...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Fila 0: Código / Stock */}
            <div className="form-row">
              <div className="form-group" style={{ maxWidth: 380 }}>
                <label htmlFor="codigo">
                  Código <span className="required">*</span>
                </label>
                <input
                  id="codigo"
                  name="codigo"
                  type="text"
                  value={form.codigo}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Ej: NIN001"
                  required
                />
              </div>

              <div className="form-group" style={{ maxWidth: 220 }}>
                <label htmlFor="stock">
                  Stock <span className="required">*</span>
                </label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Fila 1: Nombre / Precio */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">
                  Nombre del producto <span className="required">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={saving}
                  maxLength={100}
                  placeholder="Ej: The Legend of Zelda"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">
                  Precio <span className="required">*</span>
                </label>
                <div className="price-input">
                  <span className="currency">$</span>
                  <input
                    id="precio"
                    name="precio"
                    type="number"
                    step="1"
                    min="1"
                    value={form.precio}
                    onChange={handleChange}
                    disabled={saving}
                    placeholder="1000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Fila 2: Descripción */}
            <div className="form-group">
              <label htmlFor="descripcion">
                Descripción <span className="required">*</span>
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                rows="4"
                value={form.descripcion}
                onChange={handleChange}
                disabled={saving}
                maxLength={500}
                placeholder="Características principales del producto..."
                required
              />
              <small className="char-count">
                {form.descripcion.length}/500 caracteres
              </small>
            </div>

            {/* Acciones */}
            <div className="form-actions">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
