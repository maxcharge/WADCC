const express = require("express");
const cors = require("cors");

const app = express();
const connection = require("./config/db");

var corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));

// database connection
connection();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// base route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EMS SERVER." });
});

const empRoutes = require("./routes/employee_routes");
app.use("/api/employees", empRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
