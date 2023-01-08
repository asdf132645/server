const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

const PORT = process.env.port || 3000;

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "0000",
  database: "nodejs",
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/list", (req, res) => {
  const sqlQuery = "SELECT *FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  const sqlQuery =
    "INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?,?,'coin');";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
  });
});

app.post("/update", (req, res) => {
  var title = req.body.title;
  var content = req.body.content;

  const sqlQuery =
    "UPDATE BOARD SET BOARD_TITLE = ?, BOARD_CONTENT = ?, UPDATER_ID = ?";
  db.query(sqlQuery, [title, content], (err, result) => {
    res.send(result);
    console.log(err);
  });
}); 

app.post("/detail", (req, res) => {
  const id = req.body.id;

  const sqlQuery =
    "SELECT BOARD_ID, BOARD_TITLE, BOARD_CONTENT FROM BOARD WHERE BOARD_ID = ?;";
  db.query(sqlQuery, [id], (err, result) => {
    res.send(result);
  });
});

app.post("/delete", (req, res) => {
  const id = req.body.boardIdList;

  const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID IN (${id})`;
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
