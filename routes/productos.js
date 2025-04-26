// routes/productos.js
import express from "express";
import productosController from "../controllers/productosController.js";
import proveedoresController from "../controllers/proveedorController.js";

const router = express.Router();

router.get("/productos", productosController.getAllProductos);
router.get("/productos/:id", productosController.getProductById);
router.get(
  "/productosConStockMinimo",
  productosController.getAllproductInStockMinimun
);
router.post("/productos", productosController.createProducto);
router.put("/productos/:id", productosController.updateProducto);
router.delete("/productos/:id", productosController.deleteProducto);

export default router;
