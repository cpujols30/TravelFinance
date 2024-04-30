import Navbar from '../../routes/Navbar.jsx';
import Linechart from './childs/LineChart.jsx';
import TablaUsers from './childs/TablaUser.jsx';
import TablaProveedores from './childs/TablaProve.jsx';
import Footer from '../../routes/Footer.jsx';
import '../Inicio/styles/iniciostyles.css';

function Inicio() {

    return (
        <>
            <Navbar/> 
            <div className="container Global">
                <div className="row inicio">
                    <h1 className='TextWelcome'>Bienvenido</h1> {/* Muestra el nombre de usuario */}
                    <hr/>
                    <div className="col-md-8">
                        <div className="Linechart border border-dark">
                            <Linechart/>
                        </div>
                    </div>
                    <div className="col-md-4 Tablas">
                        <div className="row TablaProveedores border border-dark">
                            <div className="col-12 mb-3">
                                <TablaProveedores/>
                            </div>
                        </div>
                        <div className="row TablaUsers border border-dark">
                            <div className="col-12">
                                <TablaUsers/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Inicio;
