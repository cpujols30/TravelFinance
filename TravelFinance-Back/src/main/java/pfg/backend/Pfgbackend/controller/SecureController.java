package pfg.backend.Pfgbackend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfg.backend.Pfgbackend.Service.BBDDService;
import pfg.backend.Pfgbackend.Service.TokenService;
import pfg.backend.Pfgbackend.model.Empleado;
import pfg.backend.Pfgbackend.model.Token;

import java.security.SignatureException;
import java.util.Base64;

@RestController
@CrossOrigin(originPatterns = "*")
public class SecureController {

    @PostMapping("/secure")
    public ResponseEntity<String> secureEndpoint(@RequestHeader("Authorization") String authorizationHeader)
            throws SignatureException {
        String credentials = authorizationHeader.replace("Basic ", ""); // Elimina el prefijo "Basic "
        String decodedCredentials = new String(Base64.getDecoder().decode(credentials));
        String[] splitCredentials = decodedCredentials.split(":"); // Divide el string en usuario y contraseña

        String username = splitCredentials[0];
        String password = splitCredentials[1];

        if (BBDDService.validarCredenciales(username, password)) {
            // El usuario está autenticado correctamente
            String token = TokenService.generateToken(username);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error de autenticación: credenciales inválidas", HttpStatus.UNAUTHORIZED);
        }
    }
    @PostMapping("/validate-token")
    public Boolean validateTokenEndpoint(@RequestBody Token token) {
        String tokenString = token.getToken();// Extract the token from the DTO
        boolean isValid = TokenService.validateToken(tokenString);
        return isValid;
    }
    @PostMapping("/GetUser")
    public String GetUser(@RequestBody Token token) {
        String tokenString = token.getToken();// Extract the token from the DTO
        String USER = TokenService.getUsernameFromToken(tokenString);
        return USER;
    }
    @PostMapping("/GetAlluser")
    public Empleado GetAlluser(@RequestBody Token token) {
        String tokenString = token.getToken();// Extract the token from the DTO
        String USER = TokenService.getUsernameFromToken(tokenString);
        Empleado empleado = BBDDService.getUser(USER);
        return empleado;
    }

}


