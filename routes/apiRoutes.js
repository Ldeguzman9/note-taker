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

// delete a note from the array of notes
router.delete("/notes/:id", function (req, res) {
  //array to hold notes that we want to keep
  var notesToKeep = [];
  //for loop that iterates over the database and
  //pushes all the notes that DO NOT have the id of the note we want to delete into
  //the notesToKeep array
  for (var i = 0; i < database.length; i++) {
    if (database[i].id != req.params.id) {
      notesToKeep.push(database[i]);
    }
  }
  //set database array to the notesToKeep array
  database = notesToKeep;
  //write newly updated array as the database and then render
  fs.writeFileSync(
    "./db/db.json",
    JSON.stringify(database),
    function (err, res) {
      if (err) {
        throw err;
      }
    }
  );
  res.json(database);
});

module.exports = router;
