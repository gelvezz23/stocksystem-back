// controllers/clientesController.js
import pool from "../config/db.js";

const clientesController = {
  getAllClientes: async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Clientes");
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      res.status(500).json({ message: "Error al obtener clientes" });
    }
  },

  getClienteById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Clientes WHERE usuario_id = ?",
        [id]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res
          .status(404)
          .json({ message: "Cliente no encontrado o aun no se a creado" });
      }
    } catch (error) {
      console.error("Error al obtener cliente por ID:", error);
      res.status(500).json({ message: "Error al obtener cliente" });
    }
  },

  createCliente: async (req, res) => {
    const {
      nombre_cliente,
      direccion,
      telefono,
      email,
      usuario_id,
      documento,
    } = req.body;
    try {
      const [existingClient] = await pool.query(
        "SELECT * FROM Clientes WHERE usuario_id = ?",
        [usuario_id]
      );

      if (existingClient.length > 0) {
        // Si existe, realizar una actualización
        const clienteId = existingClient[0].cliente_id;
        const [updateResult] = await pool.query(
          "UPDATE Clientes SET nombre_cliente = ?, documento = ?, direccion = ?, telefono = ?, email = ?, usuario_id = ? WHERE cliente_id = ?",
          [
            nombre_cliente,
            documento,
            direccion,
            telefono,
            email,
            usuario_id,
            clienteId,
          ]
        );

        if (updateResult.affectedRows > 0) {
          res.status(200).json({
            message: "Cliente actualizado exitosamente",
            cliente_id: clienteId,
          });
        } else {
          res.status(500).json({ message: "Error al actualizar el cliente" });
        }
      } else {
        const [result] = await pool.query(
          "INSERT INTO Clientes (nombre_cliente, documento, direccion, telefono, email, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
          [nombre_cliente, documento, direccion, telefono, email, usuario_id]
        );
        res
          .status(201)
          .json({ message: "Cliente creado", cliente_id: result.insertId });
      }
    } catch (error) {
      console.error("Error al crear cliente:", error);
      res.status(500).json({ message: "Error al crear cliente" });
    }
  },

  updateCliente: async (req, res) => {
    const { id } = req.params;
    const { nombre_cliente, direccion, telefono, email } = req.body;
    try {
      const [result] = await pool.query(
        "UPDATE Clientes SET nombre_cliente = ?, direccion = ?, telefono = ?, email = ? WHERE cliente_id = ?",
        [nombre_cliente, direccion, telefono, email, id]
      );
      if (result.affectedRows > 0) {
        res.json({ message: "Cliente actualizado" });
      } else {
        res.status(404).json({ message: "Cliente no encontrado" });
      }
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      res.status(500).json({ message: "Error al actualizar cliente" });
    }
  },

  deleteCliente: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM Clientes WHERE cliente_id = ?",
        [id]
      );
      if (result.affectedRows > 0) {
        res.json({ message: "Cliente eliminado" });
      } else {
        res.status(404).json({ message: "Cliente no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      res.status(500).json({ message: "Error al eliminar cliente" });
    }
  },
};

export default clientesController;
