package pfg.backend.Pfgbackend.model.Servicios;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.sql.Date;

public class Servicio {

    @JsonProperty("Titular")
    private String titular;

    @JsonProperty("FechaIda")
    private Date fechaIda;

    @JsonProperty("FechaVuelta")
    private Date fechaVuelta;

    @JsonProperty("PrecioTotal")
    private float precioTotal;

    @JsonProperty("PrecioBase")
    private float precioBase;

    @JsonProperty("IdFactura")
    private int idFactura;

    public String getTitular() {
        return titular;
    }

    public void setTitular(String titular) {
        this.titular = titular;
    }

    public Date getFechaIda() {
        return fechaIda;
    }

    public void setFechaIda(Date fechaIda) {
        this.fechaIda = fechaIda;
    }

    public Date getFechaVuelta() {
        return fechaVuelta;
    }

    public void setFechaVuelta(Date fechaVuelta) {
        this.fechaVuelta = fechaVuelta;
    }

    public float getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(float precioTotal) {
        this.precioTotal = precioTotal;
    }

    public float getPrecioBase() {
        return precioBase;
    }

    public void setPrecioBase(float precioBase) {
        this.precioBase = precioBase;
    }

    public int getIdFactura() {
        return idFactura;
    }

    public void setIdFactura(int idFactura) {
        this.idFactura = idFactura;
    }
}
