import bcrypt from "bcrypt";
import { createClient } from "@libsql/client";

const db = createClient({
  url: "libsql://cuddly-shadoweyes-andresdm37.turso.io",
  authToken:
    "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQ0MjU0NDAsImlkIjoiZWVkNmNmODMtMmY5NC00YTBkLWI4MTgtMmM1NWRmNTQyNGI5In0.79FLlKPJKEYxNtHQ1E4ZavV2FTaPUnbZSrVV_SV4xaSzYtCdk1ZeCADf40hCT8vjg7t-d4p9RcHORJ5vGVTvCA",
});

await db.execute(`
    
    CREATE TABLE IF NOT EXISTS empresas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255),
    nit VARCHAR(100) UNIQUE,
    telefono VARCHAR(50),
    direccion VARCHAR(255),
    email VARCHAR(100)
    );
`);

await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255),
    email VARCHAR(100),
    password VARCHAR(255)
    );
`);

export class LoginController {
  static async login(req, res) {
    res.sendFile(process.cwd() + "/src/views/login.html");
  }

  static async register(req, res) {
    res.sendFile(process.cwd() + "/src/views/signup.html");
  }

  static async home(req, res) {
    res.sendFile(process.cwd() + "/src/views/home.html");
  }

  static async registerPost(req, res) {
    const { username, email, password } = req.body;

    try {
      const result = await db.execute({
        sql: "SELECT email FROM usuarios WHERE email = ?",
        args: { email },
      });
    } catch (error) {
      console.error(error)
      return
    }

    if (result.length > 0) {
      res.send("Usuario ya existe");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.execute({
        sql: "INSERT INTO usuarios (nombre, email, password) VALUES (:username, :email, :hashedPassword)",
        args: { username, email, hashedPassword },
      });
      res.redirect("/home");
    }
  }
}
