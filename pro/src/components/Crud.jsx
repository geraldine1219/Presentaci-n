import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import bcrypt from "bcryptjs";
import "./Crud.css";

const Crud = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: null,
    nombre: "",
    correo: "",
    password: "",
    originalPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Cargar usuarios al iniciar
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/servidor");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async () => {
    if (newUser.nombre && newUser.correo && newUser.password) {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10);
      try {
        const response = await axios.post("http://localhost:4000/servidor", {
          nombre: newUser.nombre,
          correo: newUser.correo,
          password: hashedPassword,
        });
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setNewUser({
          id: null,
          nombre: "",
          correo: "",
          password: "",
          originalPassword: "",
        });
        setShowModal(false);
      } catch (error) {
        console.error("Error al agregar usuario:", error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleEditUser = async () => {
    const updatedUser = {
      ...editUser,
      password: bcrypt.hashSync(editUser.password, 10),
    };
    try {
      const response = await axios.put(
        `http://localhost:4000/servidor/${editUser.id}`,
        {
          nombre: updatedUser.nombre,
          correo: updatedUser.correo,
          password: updatedUser.password,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editUser.id ? response.data : user
        )
      );
      setEditUser(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/servidor/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleShowEditModal = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  const handleShowAddModal = () => {
    setEditUser(null);
    setNewUser({
      id: null,
      nombre: "",
      correo: "",
      password: "",
      originalPassword: "",
    });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">CRUD de Usuarios</h2>

      {/* Tabla de Usuarios */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.correo}</td>
              <td>{showPassword ? user.password : "******"}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleShowEditModal(user)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botón para mostrar/ocultar contraseña */}
      <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Ocultar Contraseñas" : "Mostrar Contraseñas"}
      </Button>

      {/* Botón para agregar un nuevo usuario */}
      <Button variant="primary" onClick={handleShowAddModal} className="ms-2">
        Agregar Usuario
      </Button>

      {/* Modal para agregar/editar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editUser ? "Editar Usuario" : "Agregar Usuario"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editUser ? editUser.nombre : newUser.nombre}
                onChange={editUser ? (e) => setEditUser({ ...editUser, nombre: e.target.value }) : handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={editUser ? editUser.correo : newUser.correo}
                onChange={editUser ? (e) => setEditUser({ ...editUser, correo: e.target.value }) : handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={editUser ? editUser.password : newUser.password}
                onChange={editUser ? (e) => setEditUser({ ...editUser, password: e.target.value }) : handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={editUser ? handleEditUser : handleAddUser}>
            {editUser ? "Guardar Cambios" : "Agregar Usuario"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Crud;