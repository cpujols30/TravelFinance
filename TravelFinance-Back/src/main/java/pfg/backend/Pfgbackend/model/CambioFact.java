package pfg.backend.Pfgbackend.model;

public class CambioFact {
    private int id;
    private int idFact;
    private String nota;

    public CambioFact(int id, int idFact, String nota) {
        this.id = id;
        this.idFact = idFact;
        this.nota = nota;
    }

    // Getters y setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdFact() {
        return idFact;
    }

    public void setIdFact(int idFact) {
        this.idFact = idFact;
    }

    public String getNota() {
        return nota;
    }

    public void setNota(String nota) {
        this.nota = nota;
    }

}
