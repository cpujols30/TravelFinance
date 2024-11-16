package pfg.backend.Pfgbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Time;
import java.util.Date;

public class Logs {
    private int logsId;

    public String getNombre_Empl() {
        return Nombre_Empl;
    }

    public void setNombre_Empl(String Nombre_empl) {
        this.Nombre_Empl = Nombre_empl;
    }

    private String Nombre_Empl;
    private int Empleado_ID;
    private Date fecha;
    private Time tiempo;
    @JsonProperty("Tipo")
    private int Tipo;

    public int getCHora() {
        return CHora;
    }

    public void setCHora(int CHora) {
        this.CHora = CHora;
    }

    @JsonProperty("CHora")
    private int CHora;

    public int getTipo() {
        return Tipo;
    }

    public void setTipo(int tipo) {
        Tipo = tipo;
    }

    // Constructor vacío
    public Logs() {}

    // Getters y setters
    public int getLogsId() { return logsId; }
    public void setLogsId(int logsId) { this.logsId = logsId; }

    public int getEmpleado_ID() { return Empleado_ID; }
    public void setEmpleado_ID(int empleado_ID) { this.Empleado_ID = empleado_ID; }

    public Date getFecha() { return fecha; }
    public void setFecha(Date fecha) { this.fecha = fecha; }

    public Time getTiempo() { return tiempo; }
    public void setTiempo(Time tiempo) { this.tiempo = tiempo; }
}
