import React, { useState, useEffect } from "react";
import { getAllSales, updateSaleStatusById } from "../services/api";
import { Table, Form, FormControl, Alert, Button, Modal } from "react-bootstrap";
import { Box, CircularProgress } from '@mui/material';

const Sales = () => {
  const [ventas, setVentas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const estados = [
    { id: 1, name: "Pagado" },
    { id: 2, name: "Preparación" },
    { id: 3, name: "Listo para retiro" },
    { id: 4, name: "Entregado" },
    { id: 5, name: "Listo para despacho" },
    { id: 6, name: "Despachado" },
    { id: 7, name: "Recepcionado por cliente" },
  ];

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const ventasList = await getAllSales();
        const sortedVentas = ventasList.sort((a, b) => new Date(b.statusDate) - new Date(a.statusDate));
        setVentas(sortedVentas);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo ventas:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  const handleStatusChange = async (idVenta, newStatus) => {
    try {
      const idEstado = estados.find((estado) => estado.name === newStatus).id;
      await updateSaleStatusById(idVenta, idEstado);

      const updatedVentasList = ventas.map((venta) =>
        venta.id === idVenta ? { ...venta, status: newStatus, statusDate: Date.now() } : venta
      );
      const sortedUpdatedVentasList = updatedVentasList.sort((a, b) => new Date(b.statusDate) - new Date(a.statusDate));
      setVentas(sortedUpdatedVentasList);
      setErrorMessage("");
    } catch (error) {
      console.error("Error actualizando la venta:", error);
      setErrorMessage("Error actualizando la venta. Por favor, intente nuevamente.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowDetails = (venta) => {
    setSelectedVenta(venta);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVenta(null);
  };

  const handleDownload = () => {
    const csvRows = [];
    const headers = ['ID', 'Tipo', 'Total', 'Estado', 'Fecha de Estado', 'Productos'];
    csvRows.push(headers.join(','));

    ventas.forEach(venta => {
      const productos = venta.productos.map(producto => `${producto.name} - ${producto.quantity} x ${producto.price}`).join(' | ');
      const row = [
        venta.id,
        venta.type === 2 ? "Retiro en tienda" : "Envío a domicilio",
        venta.total,
        venta.status,
        new Date(venta.statusDate).toLocaleDateString(),
        productos
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ventas.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredVentas = ventas.filter((venta) =>
    venta.productos.some((producto) =>
      producto.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getAvailableStates = (type) => {
    const commonStates = [
      { id: 1, name: "Pagado" },
      { id: 2, name: "Preparación" },
    ];

    if (type === 1) {
      return [
        ...commonStates,
        { id: 5, name: "Listo para despacho" },
        { id: 6, name: "Despachado" },
        { id: 7, name: "Recepcionado por cliente" },
      ];
    } else if (type === 2) {
      return [
        ...commonStates,
        { id: 3, name: "Listo para retiro" },
        { id: 4, name: "Entregado" },
      ];
    }

    return commonStates;
  };

  const formatDate = (epoch) => {
    const date = new Date(epoch);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error al cargar las ventas. Por favor, intente nuevamente.
      </Alert>
    );
  }

  return (
    <div className="mt-4">
      <style>
        {`
          @media (max-width: 768px) {
            .mobile-block {
              display: block;
              width: 100%;
              padding: 16px;
            }
          }
        `}
      </style>
      <div style={{ textAlign: "center" }}>
        <h1>Lista de Ventas</h1>
        <FormControl
          type="text"
          placeholder="Buscar"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div
        className="table-responsive"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha de Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredVentas.map((venta) => (
              <tr key={venta.id}>
                <td>{venta.despacho.nombre}</td>
                <td>{venta.type === 2 ? "Retiro en tienda" : "Envío a domicilio"}</td>
                <td>${new Intl.NumberFormat('es-CL').format(venta.total)}</td>
                <td>
                  <Form.Control
                    as="select"
                    value={venta.status}
                    onChange={(e) => handleStatusChange(venta.id, e.target.value)}
                  >
                    {getAvailableStates(venta.type).map((estado) => (
                      <option key={estado.id} value={estado.name}>
                        {estado.name}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td>{formatDate(venta.statusDate)}</td>
                <td>
                  <Button onClick={() => handleShowDetails(venta)}>Ver detalles</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVenta && (
            <>
              <h5>Productos</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVenta.productos.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.name}</td>
                      <td>{producto.quantity}</td>
                      <td>${new Intl.NumberFormat('es-CL').format(producto.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {selectedVenta.type === 1 && (
                <>
                  <h5>Información del Cliente</h5>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Correo:</td>
                        <td>{selectedVenta.despacho.correo}</td>
                      </tr>
                      <tr>
                        <td>Dirección:</td>
                        <td>{selectedVenta.despacho.direccion}</td>
                      </tr>
                      <tr>
                        <td>Comuna:</td>
                        <td>{selectedVenta.despacho.comuna}</td>
                      </tr>
                      <tr>
                        <td>Número:</td>
                        <td>{selectedVenta.despacho.numero}</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleDownload} className="mt-2">
        Descargar todas las ventas
      </Button>
    </div>
  );
};

export default Sales;
