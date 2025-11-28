import './FormLogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AUTH_API_URL = "http://localhost:8080/auth/login";

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        console.error('Ha ocurrido un error al decodificar el token:', error);
        return null;
    }
}

export function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(AUTH_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Credenciales inválidas');
            }

            const data = await response.json();
            
            // Guardar el token en localStorage
            const token = data.token;
            localStorage.setItem('authToken', token);

            // Decodificar el token para obtener el rol
            const decodedToken = parseJwt(token);
            const userRole = decodedToken?.rol; // Asume que el rol está en el payload como "role"

            Swal.fire({
                title: 'Inicio de Sesión',
                text: 'Has iniciado sesión exitosamente. Redirigiendo...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });

            // Redirigir según el rol
            if (userRole === 'ADMINISTRADOR') {
                navigate('/inventario');
            } else {
                navigate('/inventario');
            }

        } catch (err) {
            setError(err.message || 'Ocurrió un error inesperado.');
            console.error('Error al iniciar sesión:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-login'>
            <form className='formLogin' onSubmit={handleLogin}>
                <i className="fa-solid fa-circle-user"></i>
                <h3>Iniciar sesion</h3>
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" placeholder="Ingrese su correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                {error && <p className="error-message">{error}</p>}

                <button type="submit" id="submit" disabled={loading}>
                    {loading ? 'Iniciando...' : 'Iniciar sesion'}
                </button>
                <button type="button" onClick={handleBack}>Volver al Inicio</button>
            </form>
        </div>
    );
}

export function FormRegister() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const payload = {
            nombre: nombre.trim(),
            email: email.trim(),
            password: password,
            rol: 'CLIENTE', // Rol por defecto para nuevos registros
            estado: 'ACTIVO' // Estado por defecto
        };

        try {
            const response = await fetch('http://localhost:8080/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'No se pudo completar el registro.');
            }

            await Swal.fire({
                title: '¡Registro Exitoso!',
                text: 'Tu cuenta ha sido creada. Ahora serás redirigido para iniciar sesión.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
            });

            navigate('/login');

        } catch (err) {
            setError(err.message);
            console.error('Error en el registro:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-login'>
            <form className='formLogin' onSubmit={handleRegister}>
                <i className="fa-solid fa-circle-user"></i>
                <h3>Registro de Usuario</h3>
                <label htmlFor="nombreRegister">Nombre Completo</label>
                <input type="text" id="nombreRegister" name="nombreRegister" placeholder="Ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <label htmlFor="emailRegister">Correo</label>
                <input type="email" id="emailRegister" name="emailRegister" placeholder="Ingrese su correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="passwordRegister">Contraseña</label>
                <input type="password" id="passwordRegister" name="passwordRegister" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required />
                
                {error && <p className="error-message">{error}</p>}

                <button type="submit" id="submitRegister" disabled={loading}>
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
                <button type="button" onClick={handleBack} disabled={loading}>
                    Volver al Inicio
                </button>
            </form>
        </div>
    );
}