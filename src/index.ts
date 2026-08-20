import express from "express";

const app = express();
const PORT = 3000;

// Middleware para poder recibir JSON
app.use(express.json());

// Interface Estudiante
interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

// Arreglo en memoria
const estudiantes: Estudiante[] = [];

// Contador para generar IDs
let siguienteId = 1;

// GET - Obtener todos los estudiantes
app.get("/api/estudiantes", (req, res) => {
  res.json(estudiantes);
});

// POST - Crear un estudiante
app.post("/api/estudiantes", (req, res) => {
  const { nombre, email, bootcamp } = req.body;

  // Verificar que exista email
  if (!email) {
    res.status(400).json({
      error: "El email es obligatorio",
    });
    return;
  }

  const nuevoEstudiante: Estudiante = {
    id: siguienteId,
    nombre,
    email,
    bootcamp,
  };

  estudiantes.push(nuevoEstudiante);
  siguienteId++;

  res.status(201).json(nuevoEstudiante);
});

// PUT - Actualizar un estudiante
app.put("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    res.status(404).json({
      error: "Estudiante no encontrado",
    });
    return;
  }

  const { nombre, email, bootcamp } = req.body;

  estudiante.nombre = nombre;
  estudiante.email = email;
  estudiante.bootcamp = bootcamp;

  res.json(estudiante);
});

// DELETE - Eliminar un estudiante
app.delete("/api/estudiantes/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex((estudiante) => estudiante.id === id);

  if (indice === -1) {
    res.status(404).json({
      error: "Estudiante no encontrado",
    });
    return;
  }

  const estudianteEliminado = estudiantes.splice(indice, 1);

  res.json({
    mensaje: "Estudiante eliminado",
    estudiante: estudianteEliminado[0],
  });
});

// Endpoint de estado
app.get("/api/status", (req, res) => {
  res.json({
    status: "Servidor en línea",
    version: "1.0.0",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
