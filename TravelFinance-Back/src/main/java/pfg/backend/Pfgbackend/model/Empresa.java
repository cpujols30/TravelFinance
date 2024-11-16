package pfg.backend.Pfgbackend.model;

public class Empresa {
    public String getNombre_Empresa() {
        return Nombre_Empresa;
    }

    public void setNombre_Empresa(String nombre_Empresa) {
        Nombre_Empresa = nombre_Empresa;
    }

    public int getEmpresa_ID() {
        return Empresa_ID;
    }

    public void setEmpresa_ID(int empresa_ID) {
        this.Empresa_ID = empresa_ID;
    }

    public String getCiudad() {
        return Ciudad;
    }

    public void setCiudad(String ciudad) {
        Ciudad = ciudad;
    }

    public String Nombre_Empresa;
    public int Empresa_ID;
    public String Ciudad;

    public String getCIF() {
        return CIF;
    }

    public void setCIF(String CIF) {
        this.CIF = CIF;
    }

    public String CIF;
}
