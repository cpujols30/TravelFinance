package pfg.backend.Pfgbackend.controller.amadeus;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(originPatterns = "*")
public class AmadeusController {

    private final AmadeusAuthService amadeusAuthService;
    private final RestTemplate restTemplate;

    public AmadeusController(AmadeusAuthService amadeusAuthService, RestTemplate restTemplate) {
        this.amadeusAuthService = amadeusAuthService;
        this.restTemplate = restTemplate;
    }

    //default = eJzTd9f3s4gKC%2FMEAAt8Ans%3D
    @GetMapping("/OrderId")
    public String getCheckinLinks(@RequestParam String OrderId) {
        String accessToken = AmadeusAuthService.getAccessToken();
        String url = "https://test.api.amadeus.com/v1/booking/flight-orders/" +OrderId;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }


    @GetMapping("/GetHotel/{id}")
    public String[] GetHotelByCity(@PathVariable String id) {
        String accessToken = amadeusAuthService.getAccessToken();
        String url = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode="
                + id + "&radius=5&radiusUnit=KM&hotelSource=ALL";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        Gson gson = new Gson();
        JsonObject responseBody = gson.fromJson(response.getBody(), JsonObject.class);
        JsonArray hotels = responseBody.getAsJsonArray("data");

        List<String> hotelNames = new ArrayList<>();
        for (JsonElement hotelElement : hotels) {
            JsonObject hotelObject = hotelElement.getAsJsonObject();
            String hotelName = hotelObject.get("name").getAsString();
            hotelNames.add(hotelName); // Agrega los nombres a la lista
        }

        // Convertir la lista a un array de String y devolverlo
        return hotelNames.toArray(new String[0]);
    }

    @GetMapping("/airport")
    public List<String> getLocations(@RequestParam String keyword) {
        String accessToken = amadeusAuthService.getAccessToken();
        String url = "https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword="
                + keyword + "&page[limit]=10&page[offset]=0&sort=analytics.travelers.score&view=FULL";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        // Procesa la respuesta con Gson
        Gson gson = new Gson();
        JsonObject jsonResponse = gson.fromJson(response.getBody(), JsonObject.class);
        JsonArray locations = jsonResponse.getAsJsonArray("data");
        List<String> airportNames = new ArrayList<>();
        for (JsonElement locationElement : locations) {
            JsonObject location = locationElement.getAsJsonObject();
            String name = location.get("name").getAsString();
            airportNames.add(name);
        }

        return airportNames;
    }
}
