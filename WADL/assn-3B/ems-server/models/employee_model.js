const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    exp: { type: Number, required: true },
    dept: { type: String, required: true },
    sal: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = { Employee };
