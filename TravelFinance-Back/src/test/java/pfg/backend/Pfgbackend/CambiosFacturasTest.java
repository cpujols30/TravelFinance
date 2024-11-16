package pfg.backend.Pfgbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import pfg.backend.Pfgbackend.Service.BBDDService;
import pfg.backend.Pfgbackend.Service.CambiosService;
import pfg.backend.Pfgbackend.controller.FacturasController;
import pfg.backend.Pfgbackend.model.CambioFact;
import pfg.backend.Pfgbackend.model.Cambios.serviciohotel_historial;
import pfg.backend.Pfgbackend.model.Factura;
import pfg.backend.Pfgbackend.model.Servicios.ServicioHotel;

import java.sql.Date;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DisplayName("Tests de integración-OB3")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CambiosFacturasTest {
    ServicioHotel servicioHotelMock;

    Factura facturaMock;
    BBDDService bbddService = new BBDDService();


    @BeforeEach
    void BeforeEach(){
        facturaMock =new Factura();
        facturaMock.setFacturaId(999999);
        facturaMock.setCliente("Cliente Prueba");
        facturaMock.setEmpleado_ID("Empleado Prueba");
        facturaMock.setFecha_fac(Date.valueOf("2024-04-01"));

        servicioHotelMock = new ServicioHotel();
        servicioHotelMock.setIdFactura(999999);
        servicioHotelMock.setNombreHotel("Hotel Paradiso");
        servicioHotelMock.setNReserva("r12");
        servicioHotelMock.setTitular("Cliente Prueba");
        servicioHotelMock.setFechaIda(Date.valueOf("2024-04-02"));
        servicioHotelMock.setFechaVuelta(Date.valueOf("2024-04-10"));
        servicioHotelMock.setPrecioBase(200.0f);
        servicioHotelMock.setPrecioTotal(350.0f);
    }
    @Test
    @DisplayName("Test Integración, se borra un servicio y se comprueba si su cambio se ha registrado")
    void testAddCambioFact() {
        bbddService.agregarFactura(facturaMock);
        //Se agrega el servicio antes de comprobar que se borra
        FacturasController.agregarServicioHotel(servicioHotelMock);
        //Se elimina
        FacturasController.DeleteServicioHotel(servicioHotelMock);

        ArrayList<serviciohotel_historial> cambios = CambiosService.obtenerTodosLosServiciosHotelHistorial();
        String mensajeBuscado = "r12";
        boolean ENCONTRADO= false;
        for (serviciohotel_historial cambio : cambios) {
            if (mensajeBuscado.equals(cambio.getnReserva())) {
                ENCONTRADO = true;
                break;
            }
        }
        assertTrue(ENCONTRADO);
        bbddService.DeleteFactura(facturaMock.getFacturaId());
    }

}
