const router = require("express").Router();
const path = require("path");
const fs = require("fs");
let database = require("../db/db.json");

router.get("/notes", (req, res) => {
  database = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  res.json(database);
});

router.post("/notes", (req, res) => {
  let noteModel = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 5000),
  };
  database.push(noteModel);
  fs.writeFileSync("./db/db.json", JSON.stringify(database), function (err) {
    if (err) throw err;
  });
  res.json(database);
});

module.exports = router;
