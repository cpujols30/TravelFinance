package pfg.backend.Pfgbackend.model;

import java.util.ArrayList;
import java.util.List;

public class OptimizadorPaquetes {
    private int presupuesto;
    private List<PaqueteTuristico> paquetes;

    // Constructor
    public OptimizadorPaquetes() {
        this.paquetes = new ArrayList<>();
    }
    public OptimizadorPaquetes(int presupuesto) {
        this.presupuesto = presupuesto;
        this.paquetes = new ArrayList<>();
    }

    // Método para añadir un paquete a la lista
    public void addPaquete(PaqueteTuristico paquete) {
        paquetes.add(paquete);
    }

    // Getters y Setters
    public int getPresupuesto() {
        return presupuesto;
    }

    public void setPresupuesto(int presupuesto) {
        this.presupuesto = presupuesto;
    }

    public List<PaqueteTuristico> getPaquetes() {
        return paquetes;
    }

    public void setPaquetes(List<PaqueteTuristico> paquetes) {
        this.paquetes = paquetes;
    }


}
