package pfg.backend.Pfgbackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pfg.backend.Pfgbackend.Service.BBDDService;
import pfg.backend.Pfgbackend.model.Empresa;


import java.util.ArrayList;
@RestController
@CrossOrigin(originPatterns = "*")
public class EmpresaController {
    @GetMapping("/AllEmpresas")
    public ResponseEntity<ArrayList<Empresa>> Empresas(){
        BBDDService bbdd = new BBDDService();
        ArrayList<Empresa> AllEmpresas = (ArrayList<Empresa>) bbdd.getTodasLasEmpresas();

        return  new ResponseEntity<>(AllEmpresas, HttpStatus.OK);
    }
}
