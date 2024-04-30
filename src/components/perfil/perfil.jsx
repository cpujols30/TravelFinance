import React, { useEffect,useState } from 'react';
import '../perfil/styles/perfilstyles.css'
import { Link } from 'react-router-dom';
import {GetAlluser} from '../../service/UserService'
function Perfil() {
    const [user, setUser] = useState(''); // Estado para almacenar el nombre de usuario

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userString = window.localStorage.getItem('LoggedActualUser');
                const token = JSON.parse(userString)
                const username = await GetAlluser(token); // Llama a la función getUser y espera por el nombre de usuario
                setUser(username); // Establece el nombre de usuario en el estado
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
  
        fetchUser(); // Ejecuta la función fetchUser cuando el componente se monte
    }, []);
console.log(user);
    return (
        <div className=" container perfil">
            <div className="contenido border border-secondary p-3 ">
            <div className="d-flex align-items-center datosprincipales">
                <div className="content">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                </div>
                <div>
                    <h4>Nombre del Usuario: {user.NOMBRE_EMPL}</h4>
                    <div className="row">
                        <div className="col">
                        Empresa:{user.Empresa}
                        </div>
                        <div className="col">
                        <p>Puesto del Usuario: {user.NOMBRE_EMPL}</p>
                        </div>
                        </div>
                </div>
                
            </div>
            <hr />
            <h5>
                Descripción de actividades principales
            </h5>
            <p className="mt-2">Aquí va una breve descripción del usuario, algo más sobre su rol o actividades principales.</p>
          
                <Link to="/Inicio" className="btn btn-secondary">
                Volver
                </Link>
            </div>
            </div>
            
    );
}

export default Perfil;
