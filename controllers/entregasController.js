// controllers/entregasController.js
import pool from "../config/db.js";

const entregasController = {
  getAllEntregas: async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT e.*, v.venta_id AS venta_numero, c.nombre_cliente FROM Entregas e JOIN Ventas v ON e.venta_id = v.venta_id JOIN Clientes c ON v.cliente_id = c.cliente_id"
      );
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener entregas:", error);
      res.status(500).json({ message: "Error al obtener entregas" });
    }
  },

  getEntregaById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT e.*, v.venta_id AS venta_numero, c.nombre_cliente FROM Entregas e JOIN Ventas v ON e.venta_id = v.venta_id JOIN Clientes c ON v.cliente_id = c.cliente_id WHERE e.entrega_id = ?",
        [id]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: "Entrega no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener entrega por ID:", error);
      res.status(500).json({ message: "Error al obtener entrega" });
    }
  },

  createEntrega: async (req, res) => {
    const {
      venta_id,
      fecha_envio,
      direccion_entrega,
      ciudad_entrega,
      departamento_entrega,
      codigo_postal_entrega,
      metodo_envio,
      numero_seguimiento,
      estado_entrega,
      fecha_entrega_estimada,
      fecha_entrega_real,
      observaciones,
      usuario_responsable_id,
    } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO Entregas (venta_id, fecha_envio, direccion_entrega, ciudad_entrega, departamento_entrega, codigo_postal_entrega, metodo_envio, numero_seguimiento, estado_entrega, fecha_entrega_estimada, fecha_entrega_real, observaciones, usuario_responsable_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          venta_id,
          fecha_envio,
          direccion_entrega,
          ciudad_entrega,
          departamento_entrega,
          codigo_postal_entrega,
          metodo_envio,
          numero_seguimiento,
          estado_entrega,
          fecha_entrega_estimada,
          fecha_entrega_real,
          observaciones,
          usuario_responsable_id,
        ]
      );
      res
        .status(201)
        .json({ message: "Entrega registrada", entrega_id: result.insertId });
    } catch (error) {
      console.error("Error al crear entrega:", error);
      res.status(500).json({ message: "Error al crear entrega" });
    }
  },

  updateEntrega: async (req, res) => {
    const { id } = req.params;
    const {
      fecha_envio,
      direccion_entrega,
      ciudad_entrega,
      departamento_entrega,
      codigo_postal_entrega,
      metodo_envio,
      numero_seguimiento,
      estado_entrega,
      fecha_entrega_estimada,
      fecha_entrega_real,
      observaciones,
      usuario_responsable_id,
    } = req.body;
    try {
      const [result] = await pool.query(
        "UPDATE Entregas SET fecha_envio = ?, direccion_entrega = ?, ciudad_entrega = ?, departamento_entrega = ?, codigo_postal_entrega = ?, metodo_envio = ?, numero_seguimiento = ?, estado_entrega = ?, fecha_entrega_estimada = ?, fecha_entrega_real = ?, observaciones = ?, usuario_responsable_id = ? WHERE entrega_id = ?",
        [
          fecha_envio,
          direccion_entrega,
          ciudad_entrega,
          departamento_entrega,
          codigo_postal_entrega,
          metodo_envio,
          numero_seguimiento,
          estado_entrega,
          fecha_entrega_estimada,
          fecha_entrega_real,
          observaciones,
          usuario_responsable_id,
          id,
        ]
      );
      if (result.affectedRows > 0) {
        res.json({ message: "Entrega actualizada" });
      } else {
        res.status(404).json({ message: "Entrega no encontrada" });
      }
    } catch (error) {
      console.error("Error al actualizar entrega:", error);
      res.status(500).json({ message: "Error al actualizar entrega" });
    }
  },

  deleteEntrega: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM Entregas WHERE entrega_id = ?",
        [id]
      );
      if (result.affectedRows > 0) {
        res.json({ message: "Entrega eliminada" });
      } else {
        res.status(404).json({ message: "Entrega no encontrada" });
      }
    } catch (error) {
      console.error("Error al eliminar entrega:", error);
      res.status(500).json({ message: "Error al eliminar entrega" });
    }
  },
};

export default entregasController;
