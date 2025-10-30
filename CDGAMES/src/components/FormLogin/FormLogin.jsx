import './FormLogin.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = "http://localhost:8080/api";

export function FormLogin() {
    const { id } = useParams();
    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        rol: "",
        estado: "",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const cargarUsuario = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${id}`);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            console.log("Respuesta del backend:", data);

            const usuariosActivos = data.map(u => ({
                ...u,
                activo: p.activo === 'ACTIVO' || p.activo === 'INACTIVO',
            }));

            setUsuario(usuariosActivos);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuario();
    }, []);

    return (
        <div className='container-login'>
            <form className='formLogin'>
                <i className="fa-solid fa-circle-user"></i>
                <h3>Iniciar sesion</h3>
                <label htmlFor="username">Usuario</label>
                <input type="text" id="username" name="username" placeholder="Ingrese su usuario" required />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required />
                <div className="box-visible">
                    <input type="checkbox" id="visible" />
                    <label htmlFor="visible">Mostrar contraseña</label>
                </div>
                {loading ? (
                    <div className="loading">Cargando usuario...</div>
                ) : (
                    <div key={usuario.id}>
                        <Link to='/inventario'>
                            <button type="submit" id="submit">Iniciar sesion</button>
                        </Link>
                    </div>
                )}
                <button onClick={handleBack}>volver</button>
            </form>
        </div>
    );
}

export function FormRegister() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='container-login'>
            <form className='formLogin'>
                <i className="fa-solid fa-circle-user"></i>
                <h3>Registro de Usuario</h3>
                <label htmlFor="userRegister">Usuario</label>
                <input type="text" id="userRegister" name="userRegister" placeholder="Ingrese su usuario" required />
                <label htmlFor="emailRegister">Correo</label>
                <input type="text" id="emailRegister" name="emailRegister" placeholder="Ingrese su correo" required />
                <label htmlFor="userPass">Contraseña</label>
                <input type="password" id="userPass" name="userPass" placeholder="Ingrese su contraseña" required />
                <div className="box-visible">
                    <input type="checkbox" id="visiblePass" />
                    <label htmlFor="visiblePass">Mostrar contraseña</label>
                </div>
                <Link to='/inventario'>
                    <button type="submit" id="submitLogin" onClick="register()">Registrarse</button>
                </Link>
                <button onClick={handleBack}>volver</button>
            </form>
        </div>
    );
}