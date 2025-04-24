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
        "SELECT * FROM Proveedores WHERE usuario_id = ?",
        [usuario_id]
      );

      if (existingProveedor.length > 0) {
        // Si existe, realizar una actualización
        const clienteId = existingProveedor[0].proveedor_id;
        const [updateResult] = await pool.query(
          "UPDATE Proveedores SET nombre_proveedor = ?, nit = ?, direccion = ?, telefono = ?, email = ?, usuario_id = ? WHERE proveedor_id = ?",
          [
            nombre_proveedor,
            nit,
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

  getProveedorById: async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Proveedores WHERE usuario_id = ?",
        [id]
      );
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res
          .status(404)
          .json({ message: "Proveedor no encontrado o aun no se a creado" });
      }
    } catch (error) {
      console.error("Error al obtener proveedor por ID:", error);
      res.status(500).json({ message: "Error al obtener proveedor" });
    }
  },
};

export default proveedoresController;
