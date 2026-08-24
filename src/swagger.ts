import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API de Estudiantes",
    description: "Documentación de la API REST de estudiantes",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);
