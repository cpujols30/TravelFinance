package pfg.backend.Pfgbackend.controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pfg.backend.Pfgbackend.Service.BBDDService;
import pfg.backend.Pfgbackend.Service.CambiosService;
import pfg.backend.Pfgbackend.model.Factura;
import pfg.backend.Pfgbackend.model.Servicios.Servicio;
import pfg.backend.Pfgbackend.model.Servicios.ServicioHotel;
import pfg.backend.Pfgbackend.model.Servicios.ServicioVuelo;

import java.util.ArrayList;
@RestController
@CrossOrigin(originPatterns = "*")
public class  FacturasController {
    static BBDDService DataBase = new BBDDService();
    static CambiosService cambios = new CambiosService();
    @GetMapping("/AllFacturas")
    public ResponseEntity<ArrayList<Factura>> AllFacturas() {
        ArrayList<Factura> listFacturas = (ArrayList<Factura>) DataBase.getAllFacturas();

        return new ResponseEntity<>(listFacturas, HttpStatus.OK);
    }
    @PostMapping("/AddFactura")
    public ResponseEntity<Factura> crearFactura(@RequestBody Factura factura) {
        if (DataBase.agregarFactura(factura)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/addServiceHotel")
    public static ResponseEntity<String> agregarServicioHotel(@RequestBody ServicioHotel servicioHotel) {

        try {
            boolean resultado = DataBase.agregarServicioHotel(servicioHotel);
            return ResponseEntity.ok("Servicio de hotel agregado con éxito");

        }catch (Exception e){
            System.out.println("error al agregar servicio de hotel"  + e.getMessage());
            return ResponseEntity.badRequest().body("Error al agregar el servicio de hotel");
        }

    }

    @PostMapping("/addServiceVuelo")
    public ResponseEntity<String> agregarServicioVuelo(@RequestBody ServicioVuelo servicioVuelo) {


        boolean resultado = DataBase.agregarServicioVuelo(servicioVuelo);
        if(resultado) {
            return ResponseEntity.ok("Servicio de vuelo agregado con éxito");
        } else {
            return ResponseEntity.badRequest().body("Error al agregar el servicio de vuelo");
        }
    }

    @DeleteMapping("/DeleteFactura/{id}")
    public ResponseEntity<?> deleteFactura(@PathVariable int id) {
        DataBase.eliminarServiciosPorFacturaID(id);
        if (DataBase.DeleteFactura(id)) {

            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping("/GetServicios/{id}")
    public ResponseEntity<ArrayList<Servicio>> GetServicioById(@PathVariable int id) {
        ArrayList<Servicio> servicios = DataBase.getServiciosPorIdFactura(id);
        return new ResponseEntity<>(servicios, HttpStatus.OK);

    }

    @PutMapping("/UpdateServicioHotel")
    public ResponseEntity<ServicioHotel> actualizarServicioHotel(@RequestBody ServicioHotel servicioHotel) {
        if (DataBase.actualizarServicioHotel(servicioHotel)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @PutMapping("/UpdateServicioViaje")
    public ResponseEntity<ServicioVuelo> actualizarServicioViaje(@RequestBody ServicioVuelo servicioVuelo) {
        if (DataBase.actualizarServicioVuelo(servicioVuelo)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @GetMapping("/GetIdFactura")
    public ResponseEntity<Integer> GetIdFactura() {
        int idFactura = DataBase.encontrarFacturaIdLibre();
        return new ResponseEntity<>(idFactura, HttpStatus.OK);
    }
    @DeleteMapping("/DeleteServicioHotel")
    public static ResponseEntity<Integer> DeleteServicioHotel(@RequestBody ServicioHotel servicioHotel) {
        String NReserva = servicioHotel.getNReserva();
        boolean result= DataBase.eliminarServicioHotelPorNReserva(NReserva);
        if (result) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }
    @DeleteMapping("/DeleteServicioVuelo")
    public ResponseEntity<Integer> DeleteServicioVuelo(@RequestBody ServicioVuelo servicioVuelo) {
        String IdentVuelo = servicioVuelo.getIdentVuelo();
        boolean result= DataBase.eliminarServicioVueloPorIdentVuelo(IdentVuelo);
        if (result) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @GetMapping("/GetAllServicios")
    public ResponseEntity<ArrayList<Servicio>> AllServices() {
        ArrayList<Servicio> listservicos = (ArrayList<Servicio>) DataBase.getTodosLosServicios();

        return new ResponseEntity<>(listservicos, HttpStatus.OK);
    }
    @PutMapping("/UpdateFactura")
    public ResponseEntity<ServicioVuelo> UpdateFactura(@RequestBody Factura Factura) {
        if (DataBase.actualizarNombreFactura(Factura.getFacturaId(), Factura.getCliente())) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}



