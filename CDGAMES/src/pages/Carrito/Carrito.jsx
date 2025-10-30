import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';
import { CarroCompra } from '../../components/CarroCompra/CarroCompra.jsx';

export function Carrito() {

    return (
        <>
            <div className="container">
                <Navbar />
            </div>
            <div>
                <CarroCompra />
            </div>
            <div>
                <Footer />
            </div>
        </>

    )
}