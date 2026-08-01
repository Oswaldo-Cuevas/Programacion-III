import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Datos en memoria
let productos = [];

// GET todos
app.get("/api/productos", (req, res) => {
  res.json(productos);
});

// POST nuevo
app.post("/api/productos", (req, res) => {
  const nuevo = {
    id: Date.now().toString(),
    ...req.body
  };
  productos.push(nuevo);
  res.json(nuevo);
});

// PUT editar
app.put("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(p => p.id === id);

  if (index !== -1) {
    productos[index] = { ...productos[index], ...req.body };
    res.json(productos[index]);
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

// DELETE eliminar
app.delete("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  productos = productos.filter(p => p.id !== id);
  res.json({ mensaje: "Producto eliminado correctamente" });
});

// Puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});