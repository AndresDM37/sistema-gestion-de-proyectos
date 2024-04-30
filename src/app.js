import express from "express";
import bodyParser from "body-parser"
import logger from "morgan";
import dotenv from "dotenv";
import { loginRoutes } from "./routes/routes.js";

dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = express()

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/', loginRoutes)


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
