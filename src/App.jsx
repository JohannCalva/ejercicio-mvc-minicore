import { useState, useEffect } from "react"
import { getVendedores, getVentasPorFecha, getReglas } from "./api/api.js"

function App() {
  const [vendedores, setVendedores] = useState([]);
  const [reglas, setReglas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [comisiones, setComisiones] = useState([]);
  const [loading, setLoading] = useState(false);

  // Al cargar la app trae los vendedores y las reglas de supabase una sola vez.
  useEffect(() => {
    async function cargarDatos() {
      const v = await getVendedores();
      const r = await getReglas();
      setVendedores(v);
      setReglas(r);
    }
    cargarDatos();
  }, []);

  function calcularComisiones(ventas, vendedores, reglas) {
    const comisionesPorVendedor = vendedores.map((vendedor) => {
      // 1. Filtrar las ventas de este vendedor
      const ventasDelVendedor = ventas.filter((venta) => venta.vendedor_id === vendedor.id);

      // 2. Sumar el monto total de ventas
      let totalVentas = 0;
      ventasDelVendedor.forEach((venta) => {
        if (venta.monto) {
          totalVentas += venta.monto;
        }
      });

      // 3. Obtener la regla aplicable según el monto total alcanzado
      // Nota: asume que las reglas ya vienen ordenadas de mayor a menor desde la API
      const regla = reglas.find((r) => totalVentas >= r.monto_minimo);

      const porcentaje = regla ? regla.porcentaje : 0;
      const comision = totalVentas * (porcentaje / 100);

      // 4. Retornar atributos que la interfaz espera renderizar
      return {
        nombre: vendedor.nombre,
        totalVentas,
        porcentaje,
        comision
      };
    });

    return comisionesPorVendedor;
  }

  async function handleCalcular() {
    if (!fechaInicio || !fechaFin) {
      alert("Por favor selecciona ambas fechas");
      return;
    }
    setLoading(true);
    const ventas = await getVentasPorFecha(fechaInicio, fechaFin);
    const resultado = calcularComisiones(ventas, vendedores, reglas);
    setComisiones(resultado);
    setLoading(false);
  }
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Calculadora de Comisiones</h1>

      <div className="row g-3 align-items-end mb-4">
        <div className="col-auto">
          <label className="form-label mb-1">Fecha inicio</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        <div className="col-auto">
          <label className="form-label mb-1">Fecha fin</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <div className="col-auto">
          <button className="btn btn-primary" onClick={handleCalcular} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Calculando...
              </>
            ) : 'Calcular'}
          </button>
        </div>
      </div>

      {comisiones.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover border">
            <thead className="table-light">
              <tr>
                <th>Vendedor</th>
                <th>Total ventas</th>
                <th>Comisión %</th>
                <th>Comisión $</th>
              </tr>
            </thead>
            <tbody>
              {comisiones.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>${item.totalVentas.toFixed(2)}</td>
                  <td>{item.porcentaje}%</td>
                  <td>${item.comision.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App