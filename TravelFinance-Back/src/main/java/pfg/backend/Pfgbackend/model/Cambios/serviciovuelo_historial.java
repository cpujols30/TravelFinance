package pfg.backend.Pfgbackend.model.Cambios;
import java.sql.Timestamp;

public class serviciovuelo_historial {


    public String getIdentVuelo() {
        return identVuelo;
    }

    public void setIdentVuelo(String identVuelo) {
        this.identVuelo = identVuelo;
    }

    public Timestamp getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Timestamp fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

    public serviciovuelo_historial( String identVuelo, Timestamp fechaModificacion) {
        this.identVuelo = identVuelo;
        this.fechaModificacion = fechaModificacion;
    }

    private String identVuelo;
    private Timestamp fechaModificacion;
}
