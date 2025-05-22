import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerSpec.js";
import path from "path";
import YAML from "yamljs";
import { cwd } from "process";
import dotenv from "dotenv";

dotenv.config();

export const setupSwagger = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

const userSwagger = YAML.load(path.join(cwd(), "/swagger/user_swagger.yaml"));


export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Swagger",
    version: "1.0.0",
    description: "UMC 8th Node.js",
  },
  paths: {
    ...userSwagger.paths,
    ...roomSwagger.paths,
    ...adminSwagger.paths,
  },
  components: {
    schemas: {
      ...userSwagger.components?.schemas,
      ...roomSwagger.components?.schemas,
      ...adminSwagger.components?.schemas,
    },
  },
};