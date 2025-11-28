import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormLogin } from "../../components/FormLogin/FormLogin";

export function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        // Comprueba si ya existe un token de autenticación en localStorage.
        const token = localStorage.getItem('authToken');
        
        // Si el token existe, redirige al usuario al inventario.
        if (token) {
            navigate('/inventario');
        }
    }, [navigate]); // El efecto se ejecuta cuando el componente se monta.

    return (
        <>
            <FormLogin/>
        </>

    )
}