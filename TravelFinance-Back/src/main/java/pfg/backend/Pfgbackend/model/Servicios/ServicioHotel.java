package pfg.backend.Pfgbackend.model.Servicios;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ServicioHotel extends Servicio {

    @JsonProperty("NombreHotel")
    private String NombreHotel;

    @JsonProperty("NReserva")
    private String NReserva;

    public String getNombreHotel() {
        return NombreHotel;
    }

    public void setNombreHotel(String nombreHotel) {
        this.NombreHotel = nombreHotel;
    }

    public String getNReserva() {
        return NReserva;
    }

    public void setNReserva(String nReserva) {
        this.NReserva = nReserva;
    }
}
