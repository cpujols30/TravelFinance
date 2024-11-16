// ModalLog.js
import React from 'react';
 /* eslint-disable-next-line react/prop-types */
const ModalLog = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalle del registro</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* eslint-disable-next-line react/prop-types */}
            <p>ID del registro: {log.logsId}</p>
             {/* eslint-disable-next-line react/prop-types */}
            <p>Nombre: {log.nombre_Empl}</p>
             {/* eslint-disable-next-line react/prop-types */}
            <p>Fecha: {log.fecha}</p>
             {/* eslint-disable-next-line react/prop-types */}
            <p>Tiempo: {log.tiempo}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModalLog;
