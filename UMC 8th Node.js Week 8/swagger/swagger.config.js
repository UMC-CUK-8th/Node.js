import swaggerUi from "swagger-ui-express";
import path from "path";
import YAML from "yamljs";
import { cwd } from "process";
import dotenv from "dotenv";

dotenv.config();

//YAML 불러오기
const userSwagger = YAML.load(path.join(cwd(), "/swagger/user_swagger.yaml"));
const regionSwagger = YAML.load(path.join(cwd(), "swagger/region_swagger.yaml"));
const reviewSwagger = YAML.load(path.join(cwd(), "swagger/review_swagger.yaml"));
const missionSwagger = YAML.load(path.join(cwd(), "swagger/mission_swagger.yaml"));


//swagger 객체 구성성
export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Swagger",
    version: "1.0.0",
    description: "UMC 8th Node.js",
  },
  paths: {
    ...userSwagger.paths,
    ...regionSwagger.paths,
    ...reviewSwagger.paths,
    ...missionSwagger.paths,
  },
  components: {
    schemas: {
      ...userSwagger.components?.schemas,
      ...regionSwagger.components?.schemas,
      ...reviewSwagger.components?.schemas,
      ...missionSwagger.components?.schemas,
    },
  },
};

export const setupSwagger = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};