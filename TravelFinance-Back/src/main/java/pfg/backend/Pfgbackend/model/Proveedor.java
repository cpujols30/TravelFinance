package pfg.backend.Pfgbackend.model;

public class Proveedor {
    public int getProveedor_ID() {
        return Proveedor_ID;
    }

    public void setProveedor_ID(int proveedor_ID) {
        Proveedor_ID = proveedor_ID;
    }

    public int getEmpresa_ID() {
        return Empresa_ID;
    }

    public void setEmpresa_ID(int empresa_ID) {
        Empresa_ID = empresa_ID;
    }

    public String getCiudad() {
        return Ciudad;
    }

    public void setCiudad(String ciudad) {
        Ciudad = ciudad;
    }

    public int Proveedor_ID;
    public int Empresa_ID;
    public String Ciudad;

}
