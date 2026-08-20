import { Router } from "express";

const router = Router();

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [];

let siguienteId = 1;

// GET /api/estudiantes
router.get("/", (req, res) => {
  const bootcamp = req.query.bootcamp;

  if (bootcamp) {
    const estudiantesFiltrados = estudiantes.filter(
      (estudiante) => estudiante.bootcamp === bootcamp,
    );

    res.json(estudiantesFiltrados);
    return;
  }

  res.json(estudiantes);
});

// GET /api/estudiantes/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find((estudiante) => estudiante.id === id);

  if (!estudiante) {
    res.status(404).json({
      error: "Estudiante no encontrado",
    });
    return;
  }

  res.json(estudiante);
});

// POST /api/estudiantes
router.post("/", (req, res) => {
  const { nombre, email, bootcamp } = req.body;

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

// PUT /api/estudiantes/:id
router.put("/:id", (req, res) => {
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

// DELETE /api/estudiantes/:id
router.delete("/:id", (req, res) => {
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

export default router;
