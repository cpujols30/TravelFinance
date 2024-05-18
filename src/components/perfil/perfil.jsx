import React, { useEffect, useState } from 'react';
import '../perfil/styles/perfilstyles.css';
import { Link } from 'react-router-dom';
import { GetAlluser } from '../../service/UserService';

function Perfil() {
    const [user, setUser] = useState(''); // Estado para almacenar el nombre de usuario
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userString = window.localStorage.getItem('LoggedActualUser');
                const token = JSON.parse(userString);
                const username = await GetAlluser(token); 
                setUser(username); // Establece el nombre de usuario en el estado
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
  
        fetchUser(); // Ejecuta la función fetchUser cuando el componente se monte
    }, []);

    // Función para manejar el cambio de visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="container perfil">
            <div className="contenido border border-secondary p-3">
            <h1 style={{ marginTop: '0px', fontWeight:'700',fontSize:'40px'
                           }}>Perfil de usuario</h1>
                <div className="d-flex align-items-center datosprincipales">
               
                    <div className="content">
                        {/* Icono de usuario */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" 
                className="bi bi-person-circle me-2" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 
                    11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                    </div>
                   
                    <div>
                        
                        <h2>Nombre: {user.NOMBRE_EMPL}</h2>
                        <div className="row">
                                <h3 style={{fontSize:'20px'}}>
                                Empresa: {user.NombreEmpresa}
                                    </h3>
                                <h3 style={{fontSize:'20px'}}>
                                Puesto:{user.Puesto}
                                    </h3>
                         
                        </div>
                    </div>
                </div>
                <hr />
                <div>
            
                <div className="row align-items-center">
                <label htmlFor="username">Nombre de usuario:</label>
                <div className="col-md-6">
                    <input
                        type="text"
                        value={user.USUARIO} // State variable to hold the username
                        className="form-control"
                        id="username"
                        readOnly
                    />
                    </div>
                    </div>
                        <div className="row align-items-center">
                        <label htmlFor="password">Contraseña:</label>

                        <div className="col-md-6">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={user.contrasena}
                                className="form-control"
                                id="password"
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                        <button onClick={togglePasswordVisibility} 
                        className="btn btn-primary" >
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                        </div>
                     
                        </div>
                   
                </div>
          
                <Link to="/Inicio" className="btn btn-secondary" style={{marginTop:'12px'}}>
                    Volver
                </Link>
            </div>
        </div>
    );
}

export default Perfil;
