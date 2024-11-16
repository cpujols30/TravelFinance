package pfg.backend.Pfgbackend.model.Servicios;


public class ServicioVuelo extends Servicio{
    public String getIdentVuelo() {
        return IdentVuelo;
    }

    public void setIdentVuelo(String identVuelo) {
        IdentVuelo = identVuelo;
    }

    public String IdentVuelo;

    public String getNombreaereopuerto() {
        return Nombreaereopuerto;
    }

    public void setNombreaereopuerto(String nombreaereopuerto) {
        Nombreaereopuerto = nombreaereopuerto;
    }

    public String Nombreaereopuerto;

    public String getDestino() {
        return Destino;
    }

    public void setDestino(String destino) {
        Destino = destino;
    }

    public String Destino;

}
