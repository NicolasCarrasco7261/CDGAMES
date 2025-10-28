import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { Carrusel } from '../../components/Carrusel/Carrusel.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';

export function Home(){
    
    return(
        <>
            <div className="container">
                <Navbar/>
            </div>
            <div>
                <Carrusel/>
            </div>
            <h2>
                Productos Destacados
            </h2>
            <div>
                <Footer/>
            </div>
        </>
        
    )
}