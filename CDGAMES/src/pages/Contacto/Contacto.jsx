import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';
import { FormContact } from '../../components/FormContact/FormContact.jsx';

export function Contacto() {

    return (
        <>
            <div className="container">
                <Navbar />
            </div>
            <div>
                <FormContact />
            </div>
            <div>
                <Footer />
            </div>
        </>

    )
}