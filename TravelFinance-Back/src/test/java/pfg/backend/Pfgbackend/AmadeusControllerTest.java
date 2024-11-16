package pfg.backend.Pfgbackend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.DisplayName;
import pfg.backend.Pfgbackend.controller.amadeus.AmadeusController;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName("Tests de integración-OB1")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AmadeusControllerTest {

    @Autowired
    private AmadeusController amadeusController;


    @Test
    @DisplayName("Test Integración con Amadeus, se espera recibir correctamente los nombre de los hoteles con la ciudad Madrid (MAD)")
    void testGetHotelMad() {
        // City ID
        String Ciudad = "MAD";
        String[] hotelNames = amadeusController.GetHotelByCity(Ciudad);

        assertEquals(16, hotelNames.length); // Se espera que lleguen 16 hoteles
        assertEquals("HOTEL CLEMENT BARAJAS", hotelNames[0]); // Verificación el nombre del primer hotel
        assertEquals("HOTEL TACH MADRID AIRPORT", hotelNames[1]); // Verificación el nombre del segundo hotel
    }
    @Test
    @DisplayName("Test Integración con Amadeus, se espera recibir correctamente los nombre de los hoteles con la ciudad Dubai (DXB)")
    void testGetHotelDub() {
        // City ID
        String Ciudad = "DXB";
        String[] hotelNames = amadeusController.GetHotelByCity(Ciudad);

        assertEquals(52, hotelNames.length); // Se espera que lleguen 16 hoteles
        assertEquals("HOLIDAY INN EXP DUBAI AIRPORT", hotelNames[0]); // Verificación el nombre del primer hotel
        assertEquals("MILLENNIUM AIRPORT HOTEL DUBAI", hotelNames[1]); // Verificación el nombre del segundo hotel
    }
    @Test
    @DisplayName("Test Integración con Amadeus, se espera recibir correctamente los nombre de los hoteles con la ciudad París (ORY)")
    void testGetHotelParis() {
        // City ID
        String Ciudad = "ORY";
        String[] hotelNames = amadeusController.GetHotelByCity(Ciudad);

        assertEquals(15, hotelNames.length); // Se espera que lleguen 16 hoteles
        assertEquals("HILTON PARIS ORLY AIRPORT", hotelNames[0]); // Verificación el nombre del primer hotel
        assertEquals("IBIS PARIS ORLY AEROPORT", hotelNames[1]); // Verificación el nombre del segundo hotel
    }
    @Test
    @DisplayName("Test Integración con Amadeus, se espera recibir correctamente los nombre de los hoteles con la ciudad Tokio (HND)")
    void testGetHotelTokio() {
        // City ID
        String Ciudad = "HND";
        String[] hotelNames = amadeusController.GetHotelByCity(Ciudad);

        assertEquals(2, hotelNames.length); // Se espera que lleguen 16 hoteles
        assertEquals("HANEDA EXCEL HOTEL TOKYU", hotelNames[0]); // Verificación el nombre del primer hotel
        assertEquals("JAL CITY HANEDA TOKYO", hotelNames[1]); // Verificación el nombre del segundo hotel
    }
    @Test
    @DisplayName("Test Integración con Amadeus, se espera recibir correctamente los nombre de los hoteles con la ciudad Amsterdam (AMS)")
    void testGetHotelAmsterdam() {
        // City ID
        String Ciudad = "AMS";
        String[] hotelNames = amadeusController.GetHotelByCity(Ciudad);

        assertEquals(9, hotelNames.length); // Se espera que lleguen 16 hoteles
        assertEquals("SHERATON AMSTERDAM AIRPORT HTL", hotelNames[0]); // Verificación el nombre del primer hotel
        assertEquals("BW AMSTERDAM AIRPORT", hotelNames[1]); // Verificación el nombre del segundo hotel
    }


}