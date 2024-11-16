package pfg.backend.Pfgbackend.Service;

import pfg.backend.Pfgbackend.Utils.Constants;
import pfg.backend.Pfgbackend.model.Empleado;
import pfg.backend.Pfgbackend.model.Empresa;
import pfg.backend.Pfgbackend.model.Factura;
import pfg.backend.Pfgbackend.model.Logs;
import pfg.backend.Pfgbackend.model.Servicios.Servicio;
import pfg.backend.Pfgbackend.model.Servicios.ServicioHotel;
import pfg.backend.Pfgbackend.model.Servicios.ServicioVuelo;

import java.sql.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class BBDDService {

    public BBDDService(){
        ///
    };

    public static Empleado getUser(String User) {
        Empleado empleado = null;
        // La consulta incluye la selección de Usuario y Contrasena, además de otros detalles
        String query = "SELECT e.Empleado_ID, e.Nombre_Empleado, e.Usuario, e.Contrasena, e.Empresa_ID, " +
                "e.Puesto, emp.Nombre_Empresa " +
                "FROM Empleado e " +
                "JOIN Empresa emp ON e.Empresa_ID = emp.Empresa_ID " + // JOIN con la tabla Empresa
                "WHERE e.USUARIO = ?";

        try (Connection connection = DriverManager.getConnection
                (Constants.BBDDServer, Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setString(1, User);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    empleado = new Empleado();
                    empleado.setEmpleadoID(resultSet.getInt("Empleado_ID"));
                    empleado.setNOMBRE_EMPL(resultSet.getString("Nombre_Empleado"));
                    empleado.setUSUARIO(resultSet.getString("Usuario")); // Extrae el campo Usuario
                    empleado.setContrasena(resultSet.getString("Contrasena")); // Extrae el campo Contrasena
                    empleado.setEmpresa_ID(resultSet.getInt("Empresa_ID"));
                    empleado.setPuesto(resultSet.getString("Puesto"));
                    empleado.setNombreEmpresa(resultSet.getString("Nombre_Empresa"));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return empleado;
    }



    public List<Factura> getAllFacturas() {
        List<Factura> facturas = new ArrayList<>();

        String query = "SELECT Factura.Factura_ID, Factura.Cliente, Empleado.Nombre_Empleado, Factura.Fecha_fac " +
                "FROM Factura " +
                "JOIN Empleado ON Factura.Empleado_ID = Empleado.Empleado_ID";

        try {
            // Establecer la conexión a la base de datos
            Connection connection = DriverManager.getConnection
                    (Constants.BBDDServer, Constants.BBDDSUser, Constants.BBDDPassw);

            // Crear un objeto PreparedStatement para ejecutar la consulta
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            // Ejecutar la consulta y almacenar el resultado en un ResultSet
            ResultSet resultSet = preparedStatement.executeQuery();

            // Iterar sobre el ResultSet para crear objetos Factura y añadirlos a la lista
            while (resultSet.next()) {
                Factura factura = new Factura();
                factura.setFacturaId(resultSet.getInt("Factura_ID"));
                factura.setCliente(resultSet.getString("Cliente"));
                factura.setFecha_fac(resultSet.getDate("Fecha_fac"));
                factura.setEmpleado_ID(resultSet.getString("Nombre_Empleado"));
                facturas.add(factura);
            }

            // Cerrar el ResultSet, PreparedStatement y la conexión
            resultSet.close();
            preparedStatement.close();
            connection.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return facturas;
    }

    public List<Logs> getAllLogs() {
        List<Logs> logs = new ArrayList<>();
        String query = "SELECT Log_ID, Empleado.Nombre_Empleado, Fecha, Tiempo, Tipo, Chora " +
                "FROM Logs " +
                "JOIN Empleado ON Logs.Empleado_ID = Empleado.Empleado_ID";

        try {
            Connection connection = DriverManager.getConnection
                    (Constants.BBDDServer, Constants.BBDDSUser, Constants.BBDDPassw);
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Logs log = new Logs();
                log.setLogsId(resultSet.getInt("Log_ID"));
                log.setNombre_Empl(resultSet.getString("Nombre_Empleado"));
                log.setFecha(resultSet.getDate("Fecha"));
                log.setTiempo(resultSet.getTime("Tiempo"));
                log.setTipo(resultSet.getInt("Tipo"));
                log.setCHora(resultSet.getInt("Chora"));
                logs.add(log);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();

            return logs;

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList(); // En caso de error, retorna una lista vacía.
        }
    }

    public void saveLog(Logs log) throws SQLException {
        try (Connection connection = DriverManager.getConnection
                (Constants.BBDDServer, Constants.BBDDSUser, Constants.BBDDPassw)) {
            // Consulta el último ID de la tabla Logs
            String maxIdQuery = "SELECT MAX(Log_ID) FROM Logs";
            try (PreparedStatement maxIdStatement =
                         connection.prepareStatement(maxIdQuery); ResultSet resultSet = maxIdStatement.executeQuery()) {
                int lastId = 0;
                if (resultSet.next()) {
                    lastId = resultSet.getInt(1);
                }

                // Incrementa el último ID para obtener el nuevo ID
                int newId = lastId + 1;

                // Inserta el nuevo registro con el nuevo ID
                String insertQuery = "INSERT INTO Logs (log_ID, Empleado_ID, fecha, Tiempo, Tipo, Chora) " +
                        "VALUES (?, (SELECT Empleado_ID FROM Empleado WHERE Nombre_Empleado = ?), ?, ?, ?, ?)";

                try (PreparedStatement preparedStatement = connection.prepareStatement(insertQuery)) {
                    preparedStatement.setInt(1, newId);
                    preparedStatement.setString(2, log.getNombre_Empl());
                    java.util.Date utilDate = log.getFecha();
                    java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
                    preparedStatement.setDate(3, sqlDate);
                    preparedStatement.setTime(4, log.getTiempo());
                    preparedStatement.setInt(5, log.getTipo());
                    preparedStatement.setInt(6, log.getCHora());
                    preparedStatement.executeUpdate();
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw e; // Propaga la excepción para manejarla en el código que llama a este método
        }
    }

    public static boolean validarCredenciales(String username, String password) {
        String query = "SELECT COUNT(*) FROM Empleado WHERE Nombre_Empleado = ? AND Contrasena = ?";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                int count = resultSet.getInt(1);
                return count > 0; // Devuelve true si se encuentra un usuario con las credenciales proporcionadas
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false; // Devuelve false si hay algún error o si las credenciales son incorrectas
    }

    public List<Empresa> getTodasLasEmpresas() {
        List<Empresa> empresas = new ArrayList<>();
        String query = "SELECT Nombre_Empresa, Empresa_ID,CIF,Ciudad FROM proveedor";

        try {
            Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                    Constants.BBDDSUser, Constants.BBDDPassw);
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Empresa empresa = new Empresa();
                empresa.setNombre_Empresa(resultSet.getString("Nombre_Empresa"));
                empresa.setEmpresa_ID(resultSet.getInt("Empresa_ID"));
                empresa.setCiudad(resultSet.getString("Ciudad"));
                empresa.setCIF(resultSet.getString("CIF"));
                empresas.add(empresa);
            }

            resultSet.close();
            preparedStatement.close();
            connection.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return empresas;
    }
    public boolean agregarFactura(Factura factura) {
        String sql = "INSERT INTO factura (Factura_ID, Cliente, Fecha_fac, Empleado_ID) VALUES (?, ?, ?, " +
                "(SELECT Empleado_ID FROM Empleado WHERE Nombre_Empleado = ?))";
        try (Connection connection = DriverManager.
                getConnection(Constants.BBDDServer, Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, factura.getFacturaId());
            preparedStatement.setString(2, factura.getCliente());
            preparedStatement.setDate(3, factura.getFecha_fac());
            preparedStatement.setString(4, factura.getNombreEmpl());

            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean actualizarNombreFactura(int facturaId, String nuevoNombre) {
        String sql = "UPDATE factura SET Cliente = ? WHERE Factura_ID = ?";
        try (Connection connection = DriverManager.
                getConnection(Constants.BBDDServer, Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, nuevoNombre);
            preparedStatement.setInt(2, facturaId);

            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean DeleteFactura(int id) {
        String query = "DELETE FROM Factura WHERE Factura_ID = ?";

        try {
            // Establecer la conexión.
            Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                    Constants.BBDDSUser, Constants.BBDDPassw);

            // Preparar la sentencia con la consulta.
            PreparedStatement preparedStatement = connection.prepareStatement(query);

            // Establecer el valor del id en el placeholder de la consulta.
            preparedStatement.setInt(1, id);

            int affectedRows = preparedStatement.executeUpdate();

            // Cerrar recursos.
            preparedStatement.close();
            connection.close();

            // Si affectedRows es mayor a 0, significa que la fila fue eliminada exitosamente.
            return affectedRows > 0;

        } catch (Exception e) {
            e.printStackTrace();
            // Retornar false si hay una excepción, indicando que la eliminación falló.
            return false;
        }
    }
    public ArrayList<Servicio> getServiciosPorIdFactura(int idFactura) {
        ArrayList<ServicioHotel> serviciosHotel = new ArrayList<>();
        ArrayList<ServicioVuelo> serviciosVuelo = new ArrayList<>();


        // Consulta para ServicioHotel
        String queryHotel = "SELECT * FROM ServicioHotel WHERE Factura_ID = ?";
        // Consulta para ServicioVuelo
        String queryVuelo = "SELECT * FROM ServicioVuelo WHERE Factura_ID = ?";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw)) {
            // Consulta para hoteles
            try (PreparedStatement preparedStatement = connection.prepareStatement(queryHotel)) {
                preparedStatement.setInt(1, idFactura);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    while (resultSet.next()) {
                        ServicioHotel hotel = new ServicioHotel();
                        hotel.setIdFactura(resultSet.getInt("Factura_ID"));
                        hotel.setTitular(resultSet.getString("Titular"));
                        hotel.setFechaIda(resultSet.getDate("FechaIda"));
                        hotel.setFechaVuelta(resultSet.getDate("FechaVuelta"));
                        hotel.setPrecioBase(resultSet.getFloat("PrecioBase"));
                        hotel.setPrecioTotal(resultSet.getFloat("PrecioTotal"));
                        hotel.setNombreHotel(resultSet.getString("NombreHotel"));
                        hotel.setNReserva(resultSet.getString("NReserva"));
                        serviciosHotel.add(hotel);

                    }

                }
            }

            // Consulta para vuelos
            try (PreparedStatement preparedStatement = connection.prepareStatement(queryVuelo)) {
                preparedStatement.setInt(1, idFactura);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    while (resultSet.next()) {
                        ServicioVuelo vuelo = new ServicioVuelo();
                        vuelo.setIdFactura(resultSet.getInt("Factura_ID"));
                        vuelo.setTitular(resultSet.getString("Titular"));
                        vuelo.setFechaIda(resultSet.getDate("FechaIda"));
                        vuelo.setFechaVuelta(resultSet.getDate("FechaVuelta"));
                        vuelo.setPrecioTotal(resultSet.getFloat("PrecioTotal"));
                        vuelo.setPrecioBase(resultSet.getFloat("PrecioBase"));
                        vuelo.setIdentVuelo(resultSet.getString("IdentVuelo"));
                        vuelo.setDestino(resultSet.getString("Destino"));
                        vuelo.setNombreaereopuerto(resultSet.getString("NombreAeropuerto"));
                        serviciosVuelo.add(vuelo);
                    }

                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        ArrayList<Servicio> servicios = new ArrayList<>();
        // Añadir todos los ServicioHotel a servicios
        servicios.addAll(serviciosHotel);
        // Añadir todos los ServicioVuelo a servicios
        servicios.addAll(serviciosVuelo);
        return servicios;

    }
    public boolean actualizarServicioHotel(ServicioHotel servicioHotel) {
        String sql = "UPDATE ServicioHotel SET Titular = ?, " +
                "FechaIda = ?, FechaVuelta = ?, PrecioBase = ?, PrecioTotal = ?, " +
                "NombreHotel = ?, NReserva = ? WHERE Factura_ID = ? AND NReserva = ?";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, servicioHotel.getTitular());
            preparedStatement.setDate(2, new java.sql.Date(servicioHotel.getFechaIda().getTime()));
            preparedStatement.setDate(3, new java.sql.Date(servicioHotel.getFechaVuelta().getTime()));
            preparedStatement.setFloat(4, servicioHotel.getPrecioBase());
            preparedStatement.setFloat(5, servicioHotel.getPrecioTotal());
            preparedStatement.setString(6, servicioHotel.getNombreHotel());
            preparedStatement.setString(7, servicioHotel.getNReserva());
            preparedStatement.setInt(8, servicioHotel.getIdFactura());
            preparedStatement.setString(9, servicioHotel.getNReserva());

            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean actualizarServicioVuelo(ServicioVuelo servicioVuelo) {
        String sql = "UPDATE ServicioVuelo SET Titular = ?, " +
                "FechaIda = ?, FechaVuelta = ?, PrecioBase = ?, PrecioTotal = ?," +
                " IdentVuelo = ? , NombreAeropuerto = ? WHERE Factura_ID = ? ";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, servicioVuelo.getTitular());
            preparedStatement.setDate(2, new java.sql.Date(servicioVuelo.getFechaIda().getTime()));
            preparedStatement.setDate(3, new java.sql.Date(servicioVuelo.getFechaVuelta().getTime()));
            preparedStatement.setFloat(4, servicioVuelo.getPrecioBase());
            preparedStatement.setFloat(5, servicioVuelo.getPrecioTotal());
            preparedStatement.setString(6, servicioVuelo.getIdentVuelo());
            preparedStatement.setString(7, servicioVuelo.getNombreaereopuerto());
            preparedStatement.setInt(8, servicioVuelo.getIdFactura());
            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean agregarServicioHotel(ServicioHotel servicioHotel) {
        String sql = "INSERT INTO ServicioHotel (Factura_ID, Titular,FechaIda, " +
                "FechaVuelta, PrecioTotal, PrecioBase, NombreHotel, NReserva) VALUES (?, ?, ?, ?, ?, ?, ?,?)";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, servicioHotel.getIdFactura());
            preparedStatement.setString(2,servicioHotel.getTitular());
            preparedStatement.setDate(3, servicioHotel.getFechaIda());
            preparedStatement.setDate(4, servicioHotel.getFechaVuelta());
            preparedStatement.setFloat(5, servicioHotel.getPrecioTotal());
            preparedStatement.setFloat(6, servicioHotel.getPrecioBase());
            preparedStatement.setString(7, servicioHotel.getNombreHotel());
            preparedStatement.setString(8, servicioHotel.getNReserva());

            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean agregarServicioVuelo(ServicioVuelo servicioVuelo) {
        String sql = "INSERT INTO ServicioVuelo (Factura_ID, Titular," +
                " FechaIda, FechaVuelta, PrecioBase, PrecioTotal, IdentVuelo, NombreAeropuerto,Destino) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, servicioVuelo.getIdFactura());
            preparedStatement.setString(2, servicioVuelo.getTitular());
            preparedStatement.setDate(3, new java.sql.Date(servicioVuelo.getFechaIda().getTime()));
            preparedStatement.setDate(4, new java.sql.Date(servicioVuelo.getFechaVuelta().getTime()));
            preparedStatement.setFloat(5, servicioVuelo.getPrecioBase());
            preparedStatement.setFloat(6, servicioVuelo.getPrecioTotal());
            preparedStatement.setString(7, servicioVuelo.getIdentVuelo());
            preparedStatement.setString(8, servicioVuelo.getNombreaereopuerto());
            preparedStatement.setString(9, servicioVuelo.getDestino());
            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Eliminar servicio vuelo por identVuelo
    public boolean eliminarServicioVueloPorIdentVuelo(String identVuelo) {
        String sql = "DELETE FROM ServicioVuelo WHERE IdentVuelo = ?";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, identVuelo);

            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Eliminar servicio hotel por NReserva
    public boolean eliminarServicioHotelPorNReserva(String NReserva) {
        String sql = "DELETE FROM ServicioHotel WHERE NReserva = ?";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, NReserva);

            int affectedRows = preparedStatement.executeUpdate();

            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public boolean eliminarServiciosPorFacturaID(int facturaID) {
        String sql1 = "DELETE FROM ServicioVuelo WHERE IdentVuelo IN " +
                "(SELECT IdentVuelo FROM factura WHERE Factura_ID = ?)";
        String sql2 = "DELETE FROM ServicioHotel WHERE NReserva IN " +
                "(SELECT NReserva FROM factura WHERE Factura_ID = ?)";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement1 = connection.prepareStatement(sql1);
             PreparedStatement preparedStatement2 = connection.prepareStatement(sql2)) {

            preparedStatement1.setInt(1, facturaID);
            preparedStatement2.setInt(1, facturaID);

            int affectedRows1 = preparedStatement1.executeUpdate();
            int affectedRows2 = preparedStatement2.executeUpdate();

            return affectedRows1 > 0 || affectedRows2 > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public int encontrarFacturaIdLibre() {
        String sql = "SELECT Factura_ID FROM Factura ORDER BY Factura_ID";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            int expectedFacturaId = 0; // Empezamos buscando desde el ID 1
            while (resultSet.next()) {
                int currentFacturaId = resultSet.getInt("Factura_ID");
                if (currentFacturaId != expectedFacturaId) {
                    return expectedFacturaId; // Encontramos un hueco
                }
                expectedFacturaId++;
            }
            return expectedFacturaId; // No se encontraron huecos, retornamos el siguiente ID disponible
        } catch (SQLException e) {
            e.printStackTrace();
            return -1; // Retornamos -1 para indicar que hubo un error
        }
    }

    public ArrayList<Servicio> getTodosLosServicios() {
        ArrayList<ServicioHotel> serviciosHotel = new ArrayList<>();
        ArrayList<ServicioVuelo> serviciosVuelo = new ArrayList<>();


        String queryHotel = "SELECT * FROM ServicioHotel";

        String queryVuelo = "SELECT * FROM ServicioVuelo";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw)) {
            // Consulta para hoteles
            try (PreparedStatement preparedStatement = connection.prepareStatement(queryHotel)) {
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    while (resultSet.next()) {
                        ServicioHotel hotel = new ServicioHotel();
                        hotel.setIdFactura(resultSet.getInt("Factura_ID"));
                        hotel.setTitular(resultSet.getString("Titular"));
                        hotel.setFechaIda(resultSet.getDate("FechaIda"));
                        hotel.setFechaVuelta(resultSet.getDate("FechaVuelta"));
                        hotel.setPrecioBase(resultSet.getFloat("PrecioBase"));
                        hotel.setPrecioTotal(resultSet.getFloat("PrecioTotal"));
                        hotel.setNombreHotel(resultSet.getString("NombreHotel"));
                        hotel.setNReserva(resultSet.getString("NReserva"));
                        serviciosHotel.add(hotel);
                    }
                }
            }

            // Consulta para vuelos
            try (PreparedStatement preparedStatement = connection.prepareStatement(queryVuelo)) {
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    while (resultSet.next()) {
                        ServicioVuelo vuelo = new ServicioVuelo();
                        vuelo.setIdFactura(resultSet.getInt("Factura_ID"));
                        vuelo.setTitular(resultSet.getString("Titular"));
                        vuelo.setFechaIda(resultSet.getDate("FechaIda"));
                        vuelo.setFechaVuelta(resultSet.getDate("FechaVuelta"));
                        vuelo.setPrecioTotal(resultSet.getFloat("PrecioTotal"));
                        vuelo.setPrecioBase(resultSet.getFloat("PrecioBase"));
                        vuelo.setIdentVuelo(resultSet.getString("IdentVuelo"));
                        vuelo.setNombreaereopuerto(resultSet.getString("NombreAeropuerto"));
                        serviciosVuelo.add(vuelo);
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        ArrayList<Servicio> servicios = new ArrayList<>();
        // Añadir todos los ServicioHotel a servicios
        servicios.addAll(serviciosHotel);
        // Añadir todos los ServicioVuelo a servicios
        servicios.addAll(serviciosVuelo);
        return servicios;
    }


}