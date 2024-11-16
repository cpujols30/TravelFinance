import Navbar from '../../routes/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  '../Optimizadores/styles/optimizadorstyles.css'
import { useRef} from 'react';
import {sendPackage} from '../Optimizadores/Services/optService'
import { sanitizeObject } from '../../util/Funciones';
import Footer from '../../routes/Footer';
function Optimizadores() {
const formRef = useRef(null);
const handleSubmit = async (e) => {
    e.preventDefault(); // Esto es crucial para prevenir la recarga de la página
    const formData = new FormData(formRef.current);

    // Creamos el objeto final que queremos, con un campo para presupuesto y otro para los paquetes
    const resultadoFinal = {
        presupuesto: formData.get("Presupuesto"), // Obtenemos el valor del presupuesto directamente
        paquetes: []
    };

    // Ahora, iteramos sobre los datos del formulario para construir los paquetes
    for (let i = 1; i <= 3; i++) { // Asumimos que hay 3 paquetes basados en tu ejemplo
        const costoPaquete = formData.get(`costoPaquete${i}`);
        const valorSatisfaccion = formData.get(`valorSatisfaccion${i}`);

        if (costoPaquete && valorSatisfaccion) { // Verificamos que ambos valores existan antes de agregarlos
            resultadoFinal.paquetes.push({
                costoPaquete,
                valorSatisfaccion
            });
        }
    }

    try {
        const result =sanitizeObject(resultadoFinal);
        const data = await sendPackage(result);
        let alertMessage = 'Los paquetes más adecuados son:\n';
        data.data.forEach((paquete, index) => {
            alertMessage += `Paquete ${index + 1}: 
            costoPaquete: ${paquete.costoPaquete}, 
            valorSatisfaccion: ${paquete.valorSatisfaccion}\n`;
        });
        alert(alertMessage); // Mostrar la respuesta en un cuadro de diálogo
    } catch (error) {
        console.error("Error al enviar el paquete:", error);
        // Manejar el error aquí
    }
};

    return(
        <>
            <Navbar/>
            <div className="container Global "style={{marginBottom:'20%'}}>
                <div className="row inicio">
                    <h1 className='TextWelcome MainText'>Optimizadores Turísticos</h1>
                    <hr/>
                   <div className="Optimizador">
                    <h2>Optimizador de paquetes</h2>
                    <div className="optimizador-intro">
                    <p>En este componente Optimizadores, te invitamos a explorar cómo puedes
                         planificar tus viajes de manera más efectiva utilizando el poder de 
                         la optimización. A través de un enfoque práctico y accesible, 
                        hemos implementado una versión digital del clásico problema de la mochila,
                         adaptado para ayudarte a seleccionar los mejores paquetes turísticos basados
                         en tu presupuesto disponible y la satisfacción esperada por el cliente.</p>
                        </div>
                    <Form  ref={formRef} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="presupuestoTotal">
                        <div className="col-md-6">
                            <p>Presupuesto Total</p>
                                </div>
                           
                            <Form.Control required type="number" 
                            placeholder="Ingrese su presupuesto total" name="Presupuesto"/>
                            <Form.Text className="text-muted">
                                Establezca el presupuesto máximo para sus paquetes turísticos.
                            </Form.Text>
                        </Form.Group>

                        {[...Array(3)].map((_, index) => (
                            <div key={index}>
                                <h3>Paquete {index + 1}</h3>
                                <div className="row">
                                    <div className="col">
                                        <Form.Group className="mb-3" controlId={`costoPaquete${index + 1}`}>
                                           <p>Costo del Paquete</p>
                                            <Form.Control required type="number" 
                                            placeholder={`Costo del paquete ${index + 1}`} 
                                            name={`costoPaquete${index + 1}`}/>
                                        </Form.Group>
                                    </div>
                                    <div className="col">
                                        <Form.Group className="mb-3" controlId={`valorSatisfaccion${index + 1}`}>
                                           <p>Valor de Satisfacción</p>
                                            <Form.Control required type="number" 
                                            placeholder={`Valor de satisfacción ${index + 1}`}  
                                            name={`valorSatisfaccion${index + 1}`}/>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button variant="primary" type="submit">
                            Optimizar
                        </Button>
                    </Form>
                </div>
                
            </div>
        </div>
         <Footer/>
        </>
    );
}

export default Optimizadores;
