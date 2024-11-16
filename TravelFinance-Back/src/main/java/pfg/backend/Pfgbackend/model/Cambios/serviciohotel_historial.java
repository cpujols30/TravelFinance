package pfg.backend.Pfgbackend.model.Cambios;
import java.sql.Timestamp;

public class serviciohotel_historial {
    private String nReserva;

    public serviciohotel_historial(String nReserva, Timestamp fechaModificacion) {
        this.nReserva = nReserva;
        this.fechaModificacion = fechaModificacion;
    }

    private Timestamp fechaModificacion;

    public String getnReserva() {
        return nReserva;
    }

    public void setnReserva(String nReserva) {
        this.nReserva = nReserva;
    }

    public Timestamp getFechaModificacion() {
        return fechaModificacion;
    }

    public void setFechaModificacion(Timestamp fechaModificacion) {
        this.fechaModificacion = fechaModificacion;
    }

}
