// routes/roles.js
import express from "express";
import rolesController from "../controllers/rolesController.js";

const router = express.Router();

router.get("/roles", rolesController.getAllRoles);
router.put("/empresa/:id", rolesController.empresa);
router.get("/empresa/:id", rolesController.getEmpresa);

export default router;
