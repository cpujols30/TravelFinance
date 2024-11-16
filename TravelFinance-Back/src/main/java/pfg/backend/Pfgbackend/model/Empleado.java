package pfg.backend.Pfgbackend.model;

public class Empleado {
    public int EmpleadoID;
    public String NOMBRE_EMPL;
    public String USUARIO;
    public String Contrasena;
    public int Empresa_ID;
    public String NombreEmpresa;
    public String Puesto;

    public String getNombreEmpresa() {
        return NombreEmpresa;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        NombreEmpresa = nombreEmpresa;
    }

    public String getPuesto() {
        return Puesto;
    }

    public void setPuesto(String puesto) {
        Puesto = puesto;
    }

    public int getEmpresa_ID() {
        return Empresa_ID;
    }

    public void setEmpresa_ID(int empresa_ID) {
        Empresa_ID = empresa_ID;
    }


    public int getEmpleadoID() {
        return EmpleadoID;
    }

    public void setEmpleadoID(int empleadoID) {
        EmpleadoID = empleadoID;
    }

    public String getNOMBRE_EMPL() {
        return NOMBRE_EMPL;
    }

    public void setNOMBRE_EMPL(String NOMBRE_EMPL) {
        this.NOMBRE_EMPL = NOMBRE_EMPL;
    }

    public String getUSUARIO() {
        return USUARIO;
    }

    public void setUSUARIO(String USUARIO) {
        this.USUARIO = USUARIO;
    }

    public String getContrasena() {
        return Contrasena;
    }

    public void setContrasena(String contrasena) {
        Contrasena = contrasena;
    }

}
