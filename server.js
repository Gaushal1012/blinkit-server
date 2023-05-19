const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

//Dotenv file path
dotenv.config({ path: "./config.env" });

//connection
require("./DB/conn");

//Handle json data from the server side
app.use(bodyParser.json());

//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// we link the router files to make our route easy
app.use(require("./routes"));

app.use('/public/upload', express.static(__dirname + '/public/upload'));

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Home page!!!");
  console.log("home page!!!");
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:3000`);
});
