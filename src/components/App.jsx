import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { login } from '../service/UserService';

export const UserContext = React.createContext(null);

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate(); // Crea la instancia de navigate

    const handleLogin = async (event) => {
        event.preventDefault();
      
        try {
            const user = await login({
                username,
                password
            });
            window.localStorage.setItem('LoggedActualUser', JSON.stringify(user));
            setUsername('');
            setPassword('');

    
            navigate('/Inicio'); // Usa navigate para cambiar la ruta
        } catch(e) {
            
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <UserContext.Provider value={username}>
        <div className="contendor-login">
            <div className="formulario">
            <div className="texto-formulario">
            <h1>Bienvenido</h1>
            <p>Inicia Sesion con tu cuenta</p>
            </div>
            <form onSubmit={handleLogin}>
                <div className="input">
                <label htmlFor="usuario">Usuario </label>
                <input 
                required
                type="text"
                value={username}
                name="Username"
                placeholder="Ingresa tu usuario"
                onChange={(event) => setUsername(event.target.value)}/>
               </div> 
               <div className="input">
               <label htmlFor="contraseña">Contraseña </label>
               <input 
                    required
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Ingresa tu contraseña"
                    onChange={(event) => setPassword(event.target.value)} />
               </div>
               <div className="button">
               <button  id="botonlogin"type="submit">Login</button>
               
               {errorMessage && <div>{errorMessage}</div>}

               </div>
               
            
        </form>
            </div>
            
            </div>
            </UserContext.Provider>
    );
  
}

export default App;
