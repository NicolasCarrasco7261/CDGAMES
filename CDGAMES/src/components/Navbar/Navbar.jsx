import { Link } from "react-router-dom";
import './Navbar.css'


export function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">CD GAMES</Link>
                    <form role="search">
                        <input className="form-control me-2" type="search" placeholder="Ingrese un producto a buscar" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal"
                        aria-controls="menuPrincipal" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menuPrincipal">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/productos">Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/nosotros">Nosotros</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contacto">Contacto</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/carrito">Carrito
                                    <i className="fa-solid fa-cart-shopping" to="/carrito"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div>
                <section className="login-links">
                    <div className="login">
                        <Link to="/login">
                            <button className="btn-login" id="btnLogin">
                                Iniciar Sesion
                            </button>
                        </Link>

                        <Link to="/register">
                        <button className="btn-login" id="btnRegister">
                            Registrarse
                        </button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}