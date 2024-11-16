package pfg.backend.Pfgbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import pfg.backend.Pfgbackend.Service.BBDDService;
import pfg.backend.Pfgbackend.model.Factura;
import pfg.backend.Pfgbackend.model.Servicios.Servicio;
import pfg.backend.Pfgbackend.model.Servicios.ServicioHotel;
import pfg.backend.Pfgbackend.model.Servicios.ServicioVuelo;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@DisplayName("Tests de integración-OB2")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FacturasyServiciosTest {
    BBDDService bbddService = new BBDDService();
    Factura facturaMock;
    ServicioHotel servicioHotelMock;
    ServicioVuelo servicioVueloMock;
    @BeforeEach
    void BeforeEach(){
        facturaMock =new Factura();
        facturaMock.setFacturaId(99999);
        facturaMock.setCliente("Cliente Prueba");
        facturaMock.setFecha_fac(Date.valueOf("2024-04-01"));
        facturaMock.setNombreEmpl("Carlos");

        servicioHotelMock = new ServicioHotel();
        servicioHotelMock.setNombreHotel("Hotel Paradiso");
        servicioHotelMock.setNReserva("R12345678");
        servicioHotelMock.setTitular("Cliente Prueba");
        servicioHotelMock.setFechaIda(Date.valueOf("2024-04-02"));
        servicioHotelMock.setFechaVuelta(Date.valueOf("2024-04-10"));
        servicioHotelMock.setPrecioBase(200.0f);
        servicioHotelMock.setPrecioTotal(350.0f);
        servicioHotelMock.setIdFactura(99999);


        servicioVueloMock = new ServicioVuelo();
        servicioVueloMock.setIdentVuelo("ASDA01");
        servicioVueloMock.setNombreaereopuerto("Barajas");
        servicioVueloMock.setTitular("Cliente Prueba");
        servicioVueloMock.setFechaIda(Date.valueOf("2024-04-01"));
        servicioVueloMock.setFechaVuelta(Date.valueOf("2024-06-04"));
        servicioVueloMock.setPrecioBase(100.0f);
        servicioVueloMock.setPrecioTotal(150.0f);
        servicioVueloMock.setIdFactura(99999);
    }
    @Test
    @DisplayName("Test Integración, se añade factura y se comprueba su almacenamiento")
    void testAddFacturafromBBDD() {
        //Se agrega la factura
        bbddService.agregarFactura(facturaMock);
        //Se comprueba si está en Base de datos
       List<Factura> facturas = bbddService.getAllFacturas();
        Factura facturaEncontrada = new Factura();
        for (Factura factura : facturas) {
            if (factura.getFacturaId() == facturaMock.getFacturaId()) {
                facturaEncontrada = factura;
            }
        }
        assertEquals(facturaMock.getFacturaId(),facturaEncontrada.getFacturaId());
        bbddService.DeleteFactura(facturaMock.getFacturaId());
    }

    @Test
    @DisplayName("Test Integración, se añade un servicio y se comprueba su almacenamiento")
    void testAddServicefromBBDD(){
        bbddService.agregarFactura(facturaMock);
        bbddService.agregarServicioHotel(servicioHotelMock);
        bbddService.agregarServicioVuelo(servicioVueloMock);

        ArrayList<Servicio> servicios = bbddService.getTodosLosServicios();
        Boolean FindHotel= false;
        Boolean FindVuelo = false;
        for (Servicio servicio : servicios) {
            if (servicio instanceof ServicioHotel && ((ServicioHotel) servicio).getNReserva().equals(servicioHotelMock.getNReserva())) {
                FindHotel = true;
            }
            if (servicio instanceof ServicioVuelo && ((ServicioVuelo) servicio).getIdentVuelo().equals(servicioVueloMock.getIdentVuelo())) {
                FindVuelo = true;
            }
        }

        assertTrue(FindHotel, "ServicioHotel se ha añadido correctamente");
        assertTrue(FindVuelo, "ServicioVuelo se ha añadido correctamente");
        bbddService.eliminarServicioHotelPorNReserva(servicioHotelMock.getNReserva());
        bbddService.eliminarServicioVueloPorIdentVuelo(servicioVueloMock.getIdentVuelo());
        bbddService.DeleteFactura(facturaMock.getFacturaId());

    }

    @Test
    @DisplayName("Test Integración, se elimina un servicio y se comprueba su almacenamiento")
    void TestDeletefromBBDD(){
        bbddService.agregarFactura(facturaMock);
        bbddService.eliminarServicioHotelPorNReserva(servicioHotelMock.getNReserva());
        bbddService.eliminarServicioVueloPorIdentVuelo(servicioVueloMock.getIdentVuelo());

        ArrayList<Servicio> servicios = bbddService.getTodosLosServicios();
        boolean findHotel = false;
        boolean findVuelo = false;
        for (Servicio servicio : servicios) {
            if (servicio instanceof ServicioHotel && ((ServicioHotel) servicio).getNReserva().equals(servicioHotelMock.getNReserva())) {
                findHotel = true;
            }
            if (servicio instanceof ServicioVuelo && ((ServicioVuelo) servicio).getIdentVuelo().equals(servicioVueloMock.getIdentVuelo())) {
                findVuelo = true;
            }
        }

        assertFalse(findHotel, "El servicio de hotel se ha eliminado correctamente");
        assertFalse(findVuelo, "El servicio de vuelo se ha eliminado correctamente");
        bbddService.DeleteFactura(facturaMock.getFacturaId());

    }

    @Test
    @DisplayName("Test Integración, se actualiza un servicio y se comprueba su almacenamiento")
    void TestActualizarServicio() throws InterruptedException {
        bbddService.agregarFactura(facturaMock);
        bbddService.agregarServicioVuelo(servicioVueloMock);
        servicioVueloMock.setNombreaereopuerto("Aeropuerto de Barcelona");
        bbddService.actualizarServicioVuelo(servicioVueloMock);


        bbddService.agregarServicioHotel(servicioHotelMock);
        servicioHotelMock.setNombreHotel("Hotel de Barcelona");
        bbddService.actualizarServicioHotel(servicioHotelMock);
        ArrayList<Servicio> servicios = bbddService.getTodosLosServicios();


        Boolean servicioVueloEncontrado = null;
        Boolean servicioHotelEncontrado = null;

        for (Servicio servicio : servicios) {
            if (servicio instanceof ServicioVuelo) {
                ServicioVuelo tempVuelo = (ServicioVuelo) servicio;
                if (tempVuelo.getIdentVuelo().equals(servicioVueloMock.getIdentVuelo()) && tempVuelo.getNombreaereopuerto().equals(servicioVueloMock.getNombreaereopuerto())) {
                    servicioVueloEncontrado = true;


                }
            }
            if (servicio instanceof ServicioHotel) {
                ServicioHotel tempHotel = (ServicioHotel) servicio;
                if (tempHotel.getNReserva().equals(servicioHotelMock.getNReserva()) && tempHotel.getNombreHotel().equals(servicioHotelMock.getNombreHotel())) {
                    servicioHotelEncontrado = true;
                }
            }
        }

        // Assert that the airport name and hotel name are updated correctly
        assertTrue(servicioVueloEncontrado);
        assertTrue(servicioHotelEncontrado);
        bbddService.eliminarServicioHotelPorNReserva(servicioHotelMock.getNReserva());
        bbddService.eliminarServicioVueloPorIdentVuelo(servicioVueloMock.getIdentVuelo());
        bbddService.DeleteFactura(facturaMock.getFacturaId());

    }
    @Test
    @DisplayName("Test Integración, se elimina factura y se comprueba su almacenamiento")
    void testDeleteFacturafromBBDD() {
        bbddService.agregarFactura(facturaMock);
        //Se agrega la factura
        bbddService.DeleteFactura(facturaMock.getFacturaId());
        //Se comprueba si está en Base de datos
        List<Factura> facturas = bbddService.getAllFacturas();
        Factura facturaEncontrada = new Factura();
        Boolean Find = false;
        for (Factura factura : facturas) {
            if (factura.getFacturaId() == facturaMock.getFacturaId()) {
                facturaEncontrada = factura;
                Find = true;
            }
        }
        assertFalse(Find);

    }

}
