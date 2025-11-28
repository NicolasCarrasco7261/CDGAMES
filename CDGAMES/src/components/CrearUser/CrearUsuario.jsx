// src/componentes/CrearUser/CrearUsuario.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CrearProd/CrearProductos.css"; // Reutiliza estilos

const API_BASE_URL = "http://localhost:8080/api";

export default function CrearUsuario() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        rol: "",
        estado: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const payload = {
            nombre: usuario.nombre.trim(),
            email: usuario.email.trim(),
            password: usuario.password,
            rol: usuario.rol,
            estado: usuario.estado,
        };

        try {
            const res = await fetch(`${API_BASE_URL}/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Error al crear el usuario");
            }

            navigate("/inventario"); // Regresa al inicio
        } catch (err) {
            setError(err.message || "No se pudo crear el usuario");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        const tieneContenido = Object.values(usuario).some((v) => v !== "");
        if (!tieneContenido || window.confirm("¿Cancelar creación de usuario?")) {
            navigate("/inventario");
        }
    };

    return (
        <div className="crear-producto-container">
            <div className="form-card">
                <h2>Crear Usuario</h2>

                {error && (
                    <div className="error-message">
                        {error}
                        <button onClick={() => setError(null)} className="error-close">
                            ×
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Fila 1: Nombre (más corto) */}
                    <div className="form-row">
                        <div className="form-group" style={{ maxWidth: "60%" }}>
                            <label htmlFor="nombre">
                                Nombre <span className="required">*</span>
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={usuario.nombre}
                                onChange={handleChange}
                                disabled={loading}
                                maxLength={100}
                                placeholder="Ej: Juanito Perez"
                                required
                            />
                        </div>
                    </div>

                    {/* Fila 2: Email / Contraseña */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">
                                Email <span className="required">*</span>
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={usuario.email}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="Ej: perez@cdgames.cl"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Contraseña <span className="required">*</span>
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={usuario.password}
                                onChange={handleChange}
                                disabled={loading}
                                placeholder="Mínimo 6 caracteres"
                                minLength={6}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                    </div>

                    {/* Fila 3: Rol / Estado */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="rol">
                                Rol <span className="required">*</span>
                            </label>
                            <select
                                id="rol"
                                name="rol"
                                value={usuario.rol}
                                onChange={handleChange}
                                disabled={loading}
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
                                value={usuario.estado}
                                onChange={handleChange}
                                disabled={loading}
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
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? "Guardando..." : "Crear Usuario"}
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            disabled={loading}
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
