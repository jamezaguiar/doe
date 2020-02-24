// Configurações do servidor
const express = require("express");
const server = express();
const port = 3000;

// Configuração do servidor para apresentação de arquivos estáticos
server.use(express.static("../public"));

// Habilitar body
server.use(express.urlencoded({ extended: true }));

// Configuração de conexão com o banco de dados
const Pool = require("pg").Pool;
const db = new Pool({
  user: "postgres",
  password: "docker",
  host: "localhost",
  port: "5432",
  database: "doe"
});

// Configurações da Template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("../frontend", {
  express: server,
  noCache: true
});

// Configuração da página
server.get("/", (req, res) => {
  const select_query = "SELECT * FROM donors";

  db.query(select_query, function(err, result) {
    if (err) return res.send("ERRO NO BANCO DE DADOS.");

    const donors = result.rows;
    return res.render("index.html", { donors });
  });
});

server.post("/", (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  const { blood } = req.body;

  if (name == "" || email == "" || blood == "") {
    return res.send("TODOS OS CAMPOS SÃO OBRIGATÓRIOS.");
  }

  const insert_query = `INSERT INTO donors ("name", "email", "blood") VALUES ($1, $2, $3)`;
  const values = [name, email, blood];

  db.query(insert_query, values, function(err) {
    if (err) return res.send("ERRO NO BANCO DE DADOS.");

    return res.redirect("/");
  });
});

// Ligar servidor
server.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}...`);
});
