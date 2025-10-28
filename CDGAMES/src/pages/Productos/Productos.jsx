import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { Cards } from '../../components/Cards/Cards.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';
export function Productos() {

    return (
        <>
            <div className="container">
                <Navbar />
            </div>
            <div>
                <Cards/>
            </div>
            <div>
                <Footer/>
            </div>           
        </>

    )
}