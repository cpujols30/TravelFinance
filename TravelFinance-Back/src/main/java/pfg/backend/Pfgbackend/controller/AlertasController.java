package pfg.backend.Pfgbackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pfg.backend.Pfgbackend.Service.AlertasService;
import pfg.backend.Pfgbackend.Service.BBDDService;

import pfg.backend.Pfgbackend.model.Servicios.Servicio;

import java.util.ArrayList;


@RestController
@CrossOrigin(originPatterns = "*")
public class AlertasController {
    BBDDService service = new BBDDService();
    @GetMapping("/GetServiciosAlertas")
    public ResponseEntity<ArrayList<Servicio>> getServicio(){
        ArrayList<Servicio> servicios = service.getTodosLosServicios();
        servicios=AlertasService.filtrarFacturasProximas(servicios);

        return  new ResponseEntity<>(servicios, HttpStatus.OK);
    }
}
