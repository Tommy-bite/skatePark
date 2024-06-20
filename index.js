import express from "express";
import { engine } from "express-handlebars";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import verificarToken from './middlewares/auth.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

// Middlewares body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar Handlebars
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", verificarToken,(req, res) => {
  res.render("login");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const token = jwt.sign({ email: agent.email, id: agent.id }, 'secretkey', { expiresIn: '2m' });
  
    const redirectUrl = `/autenticado.html?email=${encodeURIComponent(email)}&token=${token}`;
    res.redirect(login);
  });

app.get("/registrate", (req, res) => {
  res.render("Registro");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutandose en http://localhost:${port}`);
});
