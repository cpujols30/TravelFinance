package pfg.backend.Pfgbackend.Service;

import java.util.ArrayList;
import java.util.Arrays;

import pfg.backend.Pfgbackend.model.OptimizadorPaquetes;
import pfg.backend.Pfgbackend.model.PaqueteTuristico;

public class OptimizadoresService {

    public static ArrayList<PaqueteTuristico> optimizarPaquetes(OptimizadorPaquetes entrada) {
        PaqueteTuristico[] objetos = entrada.getPaquetes().toArray(new PaqueteTuristico[0]);
        ordenarPaquetesPorSatisfaccionCosto(objetos);  // Ordena los paquetes por satisfacción/costo

        ArrayList<PaqueteTuristico> seleccionados = new ArrayList<>();
        double pesoAcumulado = 0;  // Usamos una variable para llevar la cuenta del costo acumulado

        for (PaqueteTuristico paquete : objetos) {
            if (pesoAcumulado + paquete.getCostoPaquete() <= entrada.getPresupuesto()) {
                seleccionados.add(paquete);
                pesoAcumulado += paquete.getCostoPaquete();  // Actualizamos el costo acumulado
            } else {
                break;  // Si agregar otro paquete excede el presupuesto, detenemos el proceso
            }
        }

        return seleccionados;
    }

    private static void ordenarPaquetesPorSatisfaccionCosto(PaqueteTuristico[] paquetes) {
        Arrays.sort(paquetes, (p1, p2) -> Double.compare(
                p2.getValorSatisfaccion() / (double) p2.getCostoPaquete(),
                p1.getValorSatisfaccion() / (double) p1.getCostoPaquete()
        ));
    }
}
