const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();
// const apiRoutes = require("./routes/apiRoutes");
// const htmlRoutes = require("./routes/htmlRoutes");
// const fs = require("fs");
// const path = require("path");
// const { db } = require("./Develop/db/db.json");

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use apiRoutes
app.use("./routes", apiRoutes);
app.use("./routes", htmlRoutes);

// listener
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
