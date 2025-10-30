import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    // Productos
    fetch(`${API_BASE_URL}/productos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));

    // Usuarios
    fetch(`${API_BASE_URL}/usuarios`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }, []);

  // Formatear fecha (para productos)
  const formatFecha = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return new Intl.DateTimeFormat("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  };

  // Eliminar usuario
  const handleEliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el usuario");
    }
  };

  // Eliminar producto
  const handleEliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar producto");
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="container">
      <h1>CDGames – Panel de Administración</h1>

      {/* USUARIOS */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 className="section-title">Usuarios</h2>
          <button className="btn" onClick={() => navigate("/crear-usuario")}>
            Crear usuario
          </button>
        </div>

        <table className="tbl tbl-usuarios">
          <thead>
            <tr>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar / Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="6">Sin usuarios</td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>{u.estado}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/editar-usuario/${u.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleEliminarUsuario(u.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PRODUCTOS */}
      <div className="panel">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 className="section-title">Productos</h2>
          <button className="btn" onClick={() => navigate("/crear-producto")}>
            Crear producto
          </button>
        </div>

        <table className="tbl tbl-productos">
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>Código</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Fecha creación</th>
              <th>Editar / Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="8">Sin productos</td>
              </tr>
            ) : (
              productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.codigo}</td>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>${Number(p.precio).toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>{formatFecha(p.fechaCreacion)}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/editar-producto/${p.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleEliminarProducto(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}