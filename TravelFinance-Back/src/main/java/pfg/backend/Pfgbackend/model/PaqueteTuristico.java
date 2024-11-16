package pfg.backend.Pfgbackend.model;
    public class PaqueteTuristico {
        private int costoPaquete;
        private int valorSatisfaccion;

        // Constructor
        public PaqueteTuristico() {
        }
        public PaqueteTuristico(int costoPaquete, int valorSatisfaccion) {
            this.costoPaquete = costoPaquete;
            this.valorSatisfaccion = valorSatisfaccion;
        }

        // Getters y Setters
        public int getCostoPaquete() {
            return costoPaquete;
        }

        public void setCostoPaquete(int costoPaquete) {
            this.costoPaquete = costoPaquete;
        }

        public int getValorSatisfaccion() {
            return valorSatisfaccion;
        }

        public void setValorSatisfaccion(int valorSatisfaccion) {
            this.valorSatisfaccion = valorSatisfaccion;
        }

        @Override
        public String toString() {
            return "PaqueteTuristico{" +
                    "costoPaquete=" + costoPaquete +
                    ", valorSatisfaccion=" + valorSatisfaccion +
                    '}';
        }

}
