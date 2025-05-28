// routes/entregas.js
import express from "express";
import entregasController from "../controllers/entregasController.js";

const router = express.Router();

router.get("/entregas", entregasController.getAllEntregas);
router.get("/entregas/:id", entregasController.getEntregaById);
router.post("/entregas", entregasController.createEntrega);
//router.put("/entregas/:id", entregasController.updateEntrega);
router.delete("/entregas/:id", entregasController.deleteEntrega);
router.put("/entregas/:id", entregasController.updateEstado);
export default router;
