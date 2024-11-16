package pfg.backend.Pfgbackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pfg.backend.Pfgbackend.Service.CambiosService;
import pfg.backend.Pfgbackend.model.Cambios.CambiosContainer;



@RestController
@CrossOrigin(originPatterns = "*")
public class CambiosController {

    @GetMapping("/GetCambios")
    public ResponseEntity<CambiosContainer> getCambios() {
        CambiosContainer cambiosContainer = new CambiosContainer();
        cambiosContainer.setServiciosVueloHistorial(CambiosService.obtenerTodosLosServiciosVueloHistorial());
        cambiosContainer.setServiciosHotelHistorial(CambiosService.obtenerTodosLosServiciosHotelHistorial());
        return new ResponseEntity<>(cambiosContainer, HttpStatus.OK);
    }

}
