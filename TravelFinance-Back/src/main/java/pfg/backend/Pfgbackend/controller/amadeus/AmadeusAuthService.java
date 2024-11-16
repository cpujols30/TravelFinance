package pfg.backend.Pfgbackend.controller.amadeus;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pfg.backend.Pfgbackend.Utils.Constants;

import java.util.HashMap;

@Service
public class AmadeusAuthService {

    private static RestTemplate restTemplate;

    @Value("${amadeus.client.id}")
    private static String clientId;

    @Value("${amadeus.client.secret}")
    private static String clientSecret;

    public AmadeusAuthService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public static String getAccessToken() {
        String url = "https://test.api.amadeus.com/v1/security/oauth2/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        clientId = Constants.AmadeusId;
        clientSecret= Constants.AmadeusSecrect;

        String body = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<HashMap> response = restTemplate.postForEntity(url, request, HashMap.class);
        HashMap responseBody = response.getBody();

        return (String) responseBody.get("access_token");
    }
}
