package pfg.backend.Pfgbackend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Date;

public class Factura {

    private int facturaId;
    private String cliente;
    @JsonProperty("Fecha_fac")
    private Date Fecha_fac;
    private String Empleado_ID;

    public String getNombreEmpl() {
        return nombreEmpl;
    }

    public void setNombreEmpl(String nombreEmpl) {
        this.nombreEmpl = nombreEmpl;
    }

    private String nombreEmpl;

    public int getFacturaId() {
        return facturaId;
    }

    public void setFacturaId(int facturaId) {
        this.facturaId = facturaId;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getEmpleado_ID() {
        return Empleado_ID;
    }

    public void setEmpleado_ID(String empleado_ID) {
        this.Empleado_ID = empleado_ID;
    }
    public Date getFecha_fac() {
        return Fecha_fac;
    }

    public void setFecha_fac(Date fecha_fac) {
        Fecha_fac = fecha_fac;
    }

}
