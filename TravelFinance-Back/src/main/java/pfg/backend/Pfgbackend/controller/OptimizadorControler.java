package pfg.backend.Pfgbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pfg.backend.Pfgbackend.Service.OptimizadoresService;
import pfg.backend.Pfgbackend.model.OptimizadorPaquetes;
import pfg.backend.Pfgbackend.model.PaqueteTuristico;

import java.util.ArrayList;

@RestController
@CrossOrigin(originPatterns = "*")
public class OptimizadorControler {
    @PostMapping("/Optimizador")
    public ArrayList<PaqueteTuristico> procesarOptimizacion(@RequestBody OptimizadorPaquetes optimizador) {
       ArrayList<PaqueteTuristico> solucion = OptimizadoresService.optimizarPaquetes(optimizador);
        return solucion;
    }
}
