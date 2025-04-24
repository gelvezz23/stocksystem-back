// controllers/productosController.js
import pool from "../config/db.js";

const productosController = {
  getAllProductos: async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM Productos");
      res.json(rows);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Productos WHERE producto_id = ?",
        [id]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      res.status(500).json({ message: "Error al obtener producto" });
    }
  },

  createProducto: async (req, res) => {
    const {
      nombre_producto,
      descripcion,
      precio_costo,
      precio_venta,
      stock,
      categoria_id,
      proveedor_id,
      estado = "activo",
      marca,
      stock_minimo,
      codigo,
      image_url,
    } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO Productos (nombre_producto, descripcion, precio_costo, precio_venta, stock, categoria_id, ubicacion_id, proveedor_id, estado, marca, stock_minimo, codigo, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)",
        [
          nombre_producto,
          descripcion,
          precio_costo,
          precio_venta,
          stock,
          categoria_id,
          ubicacion_id,
          proveedor_id,
          estado,
          marca,
          stock_minimo,
          codigo,
          image_url,
        ]
      );
      res
        .status(201)
        .json({ message: "Producto creado", producto_id: result.insertId });
    } catch (error) {
      console.error("Error al crear producto:", error);
      res.status(500).json({ message: "Error al crear producto" });
    }
  },

  updateProducto: async (req, res) => {
    const { id } = req.params;
    const {
      nombre_producto,
      descripcion,
      precio_costo,
      precio_venta,
      stock,
      categoria_id,
      ubicacion_id,
      proveedor_id,
    } = req.body;
    try {
      const [result] = await pool.query(
        "UPDATE Productos SET nombre_producto = ?, descripcion = ?, precio_costo = ?, precio_venta = ?, stock = ?, categoria_id = ?, ubicacion_id = ?, proveedor_id = ? WHERE producto_id = ?",
        [
          nombre_producto,
          descripcion,
          precio_costo,
          precio_venta,
          stock,
          categoria_id,
          ubicacion_id,
          proveedor_id,
          id,
        ]
      );
      if (result.affectedRows > 0) {
        res.json({ message: "Producto actualizado" });
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      res.status(500).json({ message: "Error al actualizar producto" });
    }
  },

  deleteProducto: async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        "DELETE FROM Productos WHERE producto_id = ?",
        [id]
      );
      if (result.affectedRows > 0) {
        res.json({ message: "Producto eliminado" });
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ message: "Error al eliminar producto" });
    }
  },
};

export default productosController;
