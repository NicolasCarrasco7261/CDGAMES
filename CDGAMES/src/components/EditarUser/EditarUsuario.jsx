import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../CrearProd/CrearProductos.css"; // reutiliza .form-card, .form-row, etc.

const API_BASE_URL = "http://localhost:8080/api";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    rol: "",
    estado: "",
  });

  // Cargar usuario
  useEffect(() => {
    let ignore = false;

    async function fetchUsuario() {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/usuarios/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el usuario");
        const data = await res.json();

        if (!ignore) {
          setForm({
            nombre: data?.nombre ?? "",
            email: data?.email ?? "",
            rol: data?.rol ?? "",
            estado: data?.estado ?? "",
          });
        }
      } catch (e) {
        if (!ignore) setError(e.message || "Error al cargar el usuario");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchUsuario();
    return () => { ignore = true; };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      id: Number(id),
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      rol: form.rol,
      estado: form.estado,
      // intencionalmente NO incluimos contraseña
    };

    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Error al guardar cambios");
      }

      navigate("/"); // volver sin banners
    } catch (e) {
      setError(e.message || "No se pudieron guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  // Cancelar sin confirm
  const handleCancel = () => navigate("/");

  return (
    <div className="crear-producto-container">
      <div className="form-card">
        <h2>Editar Usuario</h2>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        {loading ? (
          <div className="loading">Cargando usuario...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Fila 1: Nombre / Email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">
                  Nombre <span className="required">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  disabled={saving}
                  maxLength={100}
                  placeholder="Ej: Juanito Perez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Ej: usuario@cdgames.cl"
                  required
                />
              </div>
            </div>

            {/* Fila 2: Rol / Estado */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rol">
                  Rol <span className="required">*</span>
                </label>
                <select
                  id="rol"
                  name="rol"
                  value={form.rol}
                  onChange={handleChange}
                  disabled={saving}
                  required
                >
                  <option value="">Seleccione un rol</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                  <option value="VENDEDOR">VENDEDOR</option>
                  <option value="CLIENTE">CLIENTE</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="estado">
                  Estado <span className="required">*</span>
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  disabled={saving}
                  required
                >
                  <option value="">Seleccione estado</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select>
              </div>
            </div>

            {/* Acciones */}
            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                disabled={saving}
                onClick={handleCancel}
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
