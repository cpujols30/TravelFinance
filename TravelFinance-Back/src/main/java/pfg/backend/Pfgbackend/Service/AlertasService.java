package pfg.backend.Pfgbackend.Service;

import pfg.backend.Pfgbackend.model.Servicios.Servicio;


import java.time.LocalDate;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

import java.util.stream.Collectors;
public class AlertasService {

    public static ArrayList<Servicio> filtrarFacturasProximas(ArrayList<Servicio> servicios) {
        LocalDate fechaActual = LocalDate.now();

        return new ArrayList<>(servicios.stream()
                .filter(servicio -> {
                    LocalDate diaCreacion = servicio.getFechaIda().toLocalDate();
                    long diasDesdeAhora = ChronoUnit.DAYS.between(diaCreacion, fechaActual);
                    return diasDesdeAhora <= 0 && diasDesdeAhora >-15;
                })
                .collect(Collectors.toList()));
    }


}
