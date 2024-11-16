package pfg.backend.Pfgbackend.Service;

import pfg.backend.Pfgbackend.Utils.Constants;
import pfg.backend.Pfgbackend.model.Cambios.serviciohotel_historial;

import java.sql.*;
import java.util.ArrayList;

public class CambiosService {
    public static ArrayList<serviciohotel_historial> obtenerTodosLosServiciosVueloHistorial() {
        ArrayList<serviciohotel_historial> serviciosVueloHistorial = new ArrayList<>();
        String sql = "SELECT * FROM serviciovuelo_historial";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                String identVuelo = resultSet.getString("IdentVuelo");
                Timestamp fechaModificacion = resultSet.getTimestamp("Fecha_Modificacion");

                serviciohotel_historial servicioVueloHistorial =
                        new serviciohotel_historial(identVuelo, fechaModificacion);
                serviciosVueloHistorial.add(servicioVueloHistorial);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return serviciosVueloHistorial;
    }

    public static ArrayList<serviciohotel_historial> obtenerTodosLosServiciosHotelHistorial() {
        ArrayList<serviciohotel_historial> serviciosHotelHistorial = new ArrayList<>();
        String sql = "SELECT * FROM serviciohotel_historial";

        try (Connection connection = DriverManager.getConnection(Constants.BBDDServer,
                Constants.BBDDSUser, Constants.BBDDPassw);
             PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {

            while (resultSet.next()) {
                String nReserva = resultSet.getString("NReserva");
                Timestamp fechaModificacion = resultSet.getTimestamp("Fecha_Modificacion");

                serviciohotel_historial servicioHotelHistorial =
                        new serviciohotel_historial(nReserva, fechaModificacion);
                serviciosHotelHistorial.add(servicioHotelHistorial);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return serviciosHotelHistorial;
    }
}
