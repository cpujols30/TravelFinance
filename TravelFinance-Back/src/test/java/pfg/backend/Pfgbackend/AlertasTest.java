package pfg.backend.Pfgbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pfg.backend.Pfgbackend.Service.AlertasService;
import pfg.backend.Pfgbackend.model.Servicios.Servicio;
import pfg.backend.Pfgbackend.model.Servicios.ServicioHotel;
import pfg.backend.Pfgbackend.model.Servicios.ServicioVuelo;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Tests unitarios-OB5")
public class AlertasTest {
    private ServicioHotel servicioHotelMock;
    private ServicioVuelo servicioVueloMock;
    private ServicioVuelo servicioVueloMock2;

    @BeforeEach
    void setup(){
        // Servicio que empezó hace 10 días (fuera del rango)
        servicioHotelMock = new ServicioHotel();
        servicioHotelMock.setFechaIda(Date.valueOf(LocalDate.now().minusDays(10)));
        servicioHotelMock.setIdFactura(123);

        // Servicio que empezó hace 20 días (fuera del rango)
        servicioVueloMock = new ServicioVuelo();
        servicioVueloMock.setFechaIda(Date.valueOf(LocalDate.now().minusDays(20)));
        servicioVueloMock.setIdFactura(123);

        // Servicio que empezará en 5 días (dentro del rango)
        servicioVueloMock2 = new ServicioVuelo();
        servicioVueloMock2.setFechaIda(Date.valueOf(LocalDate.now().plusDays(5)));
        servicioVueloMock2.setIdFactura(123);


    }

    @Test
    @DisplayName("Test unitartios, se comprueba que los servicios próximos a empezar son detectados correctamente")
    void testProximosServicios() {
        ArrayList<Servicio> servicios = new ArrayList<>();
        servicios.add(servicioHotelMock);
        servicios.add(servicioVueloMock);
        servicios.add(servicioVueloMock2);

        ArrayList<Servicio> serviciosFiltrados = AlertasService.filtrarFacturasProximas(servicios);

        // Verificar que los servicios dentro del rango están incluidos
        assertTrue(serviciosFiltrados.contains(servicioVueloMock2), "El servicio vuelo próximo dentro del rango no debería estar incluido.");

        // Verificar que los servicios fuera del rango no están incluidos
        assertFalse(serviciosFiltrados.contains(servicioHotelMock), "El servicio hotel fuera del rango debería estar incluido.");
        assertFalse(serviciosFiltrados.contains(servicioVueloMock), "El servicio vuelo pasado fuera del rango no debería estar incluido.");
    }
}
