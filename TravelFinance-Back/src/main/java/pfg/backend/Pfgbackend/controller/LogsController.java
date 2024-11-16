package pfg.backend.Pfgbackend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfg.backend.Pfgbackend.Service.BBDDService;

import pfg.backend.Pfgbackend.model.Logs;

import java.util.ArrayList;
@RestController
@CrossOrigin(originPatterns = "*")
public class LogsController {
    @GetMapping("/logs")
    public ResponseEntity<ArrayList<Logs>> Logs(){
        BBDDService Logs = new BBDDService();
        ArrayList<Logs> logsUser = (ArrayList<Logs>) Logs.getAllLogs();

        return  new ResponseEntity<>(logsUser, HttpStatus.OK);
    }
    @PostMapping("/recivelog")
    public ResponseEntity<String> receiveLog(@RequestBody Logs logUser) {
        try {
            BBDDService Logs = new BBDDService();
            Logs.saveLog(logUser);
            return ResponseEntity.ok("Registro de log exitoso");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el registro de log");
        }
    }
}

