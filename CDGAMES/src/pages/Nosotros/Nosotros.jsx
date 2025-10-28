import { Navbar } from '../../components/Navbar/Navbar.jsx';
import { Footer } from '../../components/Footer/Footer.jsx';
import { DescNosotros } from '../../components/DescNosotros/DescNosotros.jsx';


export function Nosotros() {

    return (
        <>
            <div className="container">
                <Navbar />
            </div>
            <div>
                <DescNosotros />
            </div>
            <div>
                <Footer />
            </div>
        </>

    )
}