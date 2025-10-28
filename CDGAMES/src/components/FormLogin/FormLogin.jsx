import './FormLogin.css';
import { useNavigate } from 'react-router-dom';

export function FormLogin() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

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
                <button type="submit" id="submit" onClick="login()">Iniciar sesion</button>
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
                <button type="submit" id="submitRegister" onClick="register()">Registrarse</button>
                <button onClick={handleBack}>volver</button>
            </form>
        </div>
    );
}