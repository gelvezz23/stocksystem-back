import express from "express";
import proveedoresController from "../controllers/proveedorController.js";

const router = express.Router();

router.get("/proveedores", proveedoresController.getProveedores);

router.post("/proveedores", proveedoresController.createProveedor);

export default router;
