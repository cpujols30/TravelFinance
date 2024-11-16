import './styles/footerstyles.css'
function Footer() {
  return (
    <>
      <footer className=" text-center text-lg-start footer" style={{ backgroundColor:'#0b1d26', color: 'white' }}>
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h1 className="text-uppercase">Travel Finance</h1>
              <p>Desarrollando soluciones innovadoras para la planificación de viajes.</p>
            </div>
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h1 className="text-uppercase">Contacto</h1>
              <p>
               Email:cpujols08@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="text-center p-3">
          Proyecto 2023-2024
        </div>
      </footer>
    </>
  );
}

export default Footer;
