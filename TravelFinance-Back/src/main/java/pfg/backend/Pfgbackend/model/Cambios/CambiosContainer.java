package pfg.backend.Pfgbackend.model.Cambios;

import java.util.ArrayList;
import java.util.List;

public class CambiosContainer {
    private List<serviciohotel_historial> serviciosVueloHistorial;
    private List<serviciohotel_historial> serviciosHotelHistorial;

    public CambiosContainer() {
        serviciosVueloHistorial = new ArrayList<>();
        serviciosHotelHistorial = new ArrayList<>();
    }

    public List<serviciohotel_historial> getServiciosVueloHistorial() {
        return serviciosVueloHistorial;
    }

    public void setServiciosVueloHistorial(List<serviciohotel_historial> serviciosVueloHistorial) {
        this.serviciosVueloHistorial = serviciosVueloHistorial;
    }

    public List<serviciohotel_historial> getServiciosHotelHistorial() {
        return serviciosHotelHistorial;
    }

    public void setServiciosHotelHistorial(List<serviciohotel_historial> serviciosHotelHistorial) {
        this.serviciosHotelHistorial = serviciosHotelHistorial;
    }
}
