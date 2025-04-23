// routes/clientes.js
import express from "express";
import clientesController from "../controllers/clientesController.js";

const router = express.Router();

router.get("/clientes", clientesController.getAllClientes);
router.get("/clientes/:id", clientesController.getClienteById);
router.post("/clientes", clientesController.createCliente);
router.put("/clientes/:id", clientesController.updateCliente);
router.delete("/clientes/:id", clientesController.deleteCliente);

export default router;
