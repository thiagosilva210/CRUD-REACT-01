const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.NODE_HOST,
  user: process.env.NODE_USER,
  database: process.env.NODE_DATABASE,
  password: process.env.NODE_PASSWORD,
});

connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Conection Failed", err);
  }
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name } = req.body;
  const { price } = req.body;
  const { category } = req.body;

  let SQL = "INSERT INTO produto(name, price, category) VALUES(?,?,?)";
  connection.query(SQL, [name, price, category], (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.get("/search/:name", (req, res) => {
  let SQL = "SELECT * FROM produto WHERE name LIKE ? ";
  connection.query(SQL, ["%" + req.params.name + "%"], (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.get("/getProduct/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "SELECT * FROM produto WHERE id LIKE ? ";
  connection.query(SQL, [req.params.id], (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { price } = req.body;
  const { category } = req.body;

  let SQL = "UPDATE produto SET name = ?, price = ?, category = ? WHERE id = ?";

  connection.query(SQL, [name, price, category, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const SQL = "DELETE from produto WHERE id = ?";
  connection.query(SQL, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => console.log("rodando na porta 3001"));
