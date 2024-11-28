import React, { useState } from "react";
import axios from "../services/api";
import { Container, Row, Col, Button, Card, ListGroup, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './producto.css';

const producto = [
  { id: 1, nombre: 'Camisa Escolar', precio: 20 },
  { id: 2, nombre: 'Pantalón Escolar', precio: 25 },
  { id: 3, nombre: 'Zapatos Escolares', precio: 30 },
  { id: 4, nombre: 'Cinturón Escolar', precio: 10 },
  { id: 5, nombre: 'Falda Escolar', precio: 22 },
  { id: 6, nombre: 'Corbata Escolar', precio: 15 },
  { id: 7, nombre: 'Medias Escolares', precio: 8 },
  { id: 8, nombre: 'Suéter Escolar', precio: 35 },
  { id: 9, nombre: 'Chaleco Escolar', precio: 28 },
  { id: 10, nombre: 'Camiseta Escolar', precio: 40 },
];

const Producto = () => {
  const [carrito, setCarrito] = useState([]);
  const [tallasSeleccionadas, setTallasSeleccionadas] = useState({});
  const [metodoPago, setMetodoPago] = useState('');
  const tallasDisponibles = ['S', 'M', 'L', 'XL'];

  const agregarAlCarrito = (producto) => {
    const tallaSeleccionada = tallasSeleccionadas[producto.id];
    if (!tallaSeleccionada) {
      alert('Por favor selecciona una talla.');
      return;
    }
    const productoConTalla = { ...producto, talla: tallaSeleccionada };
    setCarrito([...carrito, productoConTalla]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const manejarCambioTalla = (productoId, talla) => {
    setTallasSeleccionadas({ ...tallasSeleccionadas, [productoId]: talla });
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text('Factura de Compra', 10, 10);

    const tableColumn = ['Producto', 'Talla', 'Precio'];
    const tableRows = carrito.map(item => [item.nombre, item.talla, `$${item.precio}`]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    doc.text(`Total: $${total}`, 10, doc.autoTable.previous.finalY + 10);

    if (metodoPago) {
      doc.text(`Método de pago: ${metodoPago}`, 10, doc.autoTable.previous.finalY + 20);
    }

    doc.save('factura.pdf');
  };

  const procesarDevolucion = async () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    try {
      const devoluciones = carrito.map(item => ({
        user_id: 1, // Cambiar según el usuario logueado
        product_id: item.id,
        quantity: 1,
      }));

      await axios.post('http://localhost/api/returns.php', { devoluciones });
      alert('Devolución procesada exitosamente.');
      setCarrito([]);
    } catch (error) {
      console.error('Error al procesar la devolución:', error);
      alert('Hubo un problema al procesar la devolución. Intenta de nuevo.');
    }
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <Container>
      <center>
        <h1 className="my-4">Carrito de Uniformes Escolares</h1>
      </center>
      <Row>
        <Col md={8}>
          <Row>
            {producto.map((producto) => (
              <Col md={6} key={producto.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>Precio: ${producto.precio}</Card.Text>

                    <Form.Group controlId={`talla-${producto.id}`}>
                      <Form.Label>Selecciona una talla:</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => manejarCambioTalla(producto.id, e.target.value)}
                        value={tallasSeleccionadas[producto.id] || ''}
                      >
                        <option value="">Elige una talla</option>
                        {tallasDisponibles.map((talla) => (
                          <option key={talla} value={talla}>
                            {talla}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" className="mt-3" onClick={() => agregarAlCarrito(producto)}>
                      Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={4}>
          <h3>Carrito</h3>
          <ListGroup>
            {carrito.map((item, index) => (
              <ListGroup.Item key={index}>
                {item.nombre} (Talla: {item.talla}) - ${item.precio}{' '}
                <Button variant="danger" size="sm" className="float-right" onClick={() => eliminarDelCarrito(index)}>
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4 className="mt-4">Total: ${total}</h4>

          <Form.Group controlId="metodoPago" className="mt-4">
            <Form.Label>Selecciona un método de pago:</Form.Label>
            <Form.Control
              as="select"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="">Elige un método de pago</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="PayPal">PayPal</option>
              <option value="Nequi">Nequi</option>
              <option value="daviplata">Daviplata</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="success"
            className="mt-3"
            disabled={carrito.length === 0 || !metodoPago}
            onClick={() => {
              generarPDF();
            }}
          >
            Generar Factura
          </Button>
          <Button
            variant="warning"
            className="mt-3 ml-2"
            disabled={carrito.length === 0}
            onClick={procesarDevolucion}
          >
            Procesar Devolución
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Producto;