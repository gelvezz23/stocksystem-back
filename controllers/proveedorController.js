import pool from "../config/db.js";

const proveedoresController = {
  createProveedor: async (req, res) => {
    const {
      nombre_proveedor,
      telefono,
      email,
      direccion,
      nit,
      estado = "activo",
      usuario_id,
    } = req.body;

    try {
      // Verificar si ya existe un proveedor con el mismo NIT (debería ser único)
      const [existingProveedor] = await pool.query(
        "SELECT proveedor_id FROM Proveedores WHERE nit = ?",
        [nit]
      );

      if (existingProveedor.length > 0) {
        return res
          .status(409)
          .json({ message: "Ya existe un proveedor con este NIT" }); // Conflict
      }

      // Insertar el nuevo proveedor en la base de datos
      const [result] = await pool.query(
        "INSERT INTO Proveedores (nombre_proveedor, telefono, email, direccion, nit, estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nombre_proveedor, telefono, email, direccion, nit, estado, usuario_id]
      );

      res.status(201).json({
        message: "Proveedor creado exitosamente",
        proveedor_id: result.insertId,
      });
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      res.status(500).json({ message: "Error al crear proveedor" });
    }
  },

  getProveedores: async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT
            Usuarios.*,
            rol.name_rol
        FROM
            Usuarios
        JOIN rol ON Usuarios.rol_id = rol.id 
        WHERE Usuarios.rol_id = 5
        `);

      if (rows.length > 0) {
        const data = rows.filter((item) => item.rol_id !== 1);
        res.json(data);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error("Error al buscar usuario por email:", error);
      res.status(500).json({ message: "Error al buscar usuario" });
    }
  },
};

export default proveedoresController;
