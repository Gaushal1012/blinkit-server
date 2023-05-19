const mongoose = require("mongoose");

const Database = process.env.DATABASE;

mongoose
  .connect(`mongodb://localhost:27017/${Database}`)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });