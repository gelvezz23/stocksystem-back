// controllers/ventasController.js
import pool from "../config/db.js";

const ventasController = {
  getAllVentas: async (req, res) => {
    try {
      const [rows] = await pool.query(
        "SELECT v.*, c.nombre_cliente, u.nombre_usuario AS auxiliar_nombre FROM Ventas v JOIN Clientes c ON v.cliente_id = c.cliente_id JOIN Usuarios u ON v.auxiliar_ventas_id = u.usuario_id"
      );
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      res.status(500).json({ message: "Error al obtener ventas" });
    }
  },

  getVentaById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT v.*, c.nombre_cliente, u.nombre_usuario AS auxiliar_nombre FROM Ventas v JOIN Clientes c ON v.cliente_id = c.cliente_id JOIN Usuarios u ON v.auxiliar_ventas_id = u.usuario_id WHERE v.venta_id = ?",
        [id]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: "Venta no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener venta por ID:", error);
      res.status(500).json({ message: "Error al obtener venta" });
    }
  },

  createVenta: async (req, res) => {
    const { cliente_id, total_venta, auxiliar_ventas_id } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO Ventas (cliente_id, total_venta, auxiliar_ventas_id) VALUES (?, ?, ?)",
        [cliente_id, total_venta, auxiliar_ventas_id]
      );
      res
        .status(201)
        .json({ message: "Venta creada", venta_id: result.insertId });
    } catch (error) {
      console.error("Error al crear venta:", error);
      res.status(500).json({ message: "Error al crear venta" });
    }
  },

  // ... (Implementar updateVenta y deleteVenta si es necesario)
};

export default ventasController;
