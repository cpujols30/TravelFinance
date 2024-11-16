package pfg.backend.Pfgbackend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import pfg.backend.Pfgbackend.Service.OptimizadoresService;
import pfg.backend.Pfgbackend.model.OptimizadorPaquetes;
import pfg.backend.Pfgbackend.model.PaqueteTuristico;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@DisplayName("Test unitarios-OB6")
public class OptimizadorTest {
    private OptimizadorPaquetes optimizador;

    @BeforeEach
    public void setUp() {
        optimizador = new OptimizadorPaquetes(100); // Suponiendo un presupuesto de 100 para los tests
        optimizador.addPaquete(new PaqueteTuristico(50, 60)); // Costo 50, Satisfacción 60
        optimizador.addPaquete(new PaqueteTuristico(30, 40)); // Costo 30, Satisfacción 40
        optimizador.addPaquete(new PaqueteTuristico(20, 30)); // Costo 20, Satisfacción 30
    }

    @Test
    public void testPresupuestoBajo() {
        optimizador.setPresupuesto(10);
        List<PaqueteTuristico> resultado = OptimizadoresService.optimizarPaquetes(optimizador);
        assertTrue(resultado.isEmpty(), "No se deben seleccionar paquetes con presupuesto bajo.");
    }

    @Test
    public void testPresupuestoExacto() {
        optimizador.setPresupuesto(30);
        List<PaqueteTuristico> resultado = OptimizadoresService.optimizarPaquetes(optimizador);
        assertEquals("Debe seleccionar 1 paquete con presupuesto exacto.", 1, resultado.size());
        assertEquals("El paquete seleccionado debe ser el más satisfactorio dentro del presupuesto.", 30, resultado.get(0).getValorSatisfaccion());
    }

    @Test
    public void testPresupuestoAlto() {
        optimizador.setPresupuesto(150);
        List<PaqueteTuristico> resultado = OptimizadoresService.optimizarPaquetes(optimizador);
        assertEquals("Debe seleccionar todos los paquetes disponibles.", 3, resultado.size());
    }

    @Test
    public void testSeleccionOptima() {
        optimizador.setPresupuesto(50);
        List<PaqueteTuristico> resultado = OptimizadoresService.optimizarPaquetes(optimizador);
        assertEquals("Debe seleccionar los paquetes que maximizan la satisfacción sin superar el presupuesto.", 2, resultado.size());
        assertEquals("La satisfacción total debe ser la óptima.", 70, resultado.stream().mapToInt(PaqueteTuristico::getValorSatisfaccion).sum());
    }
}
