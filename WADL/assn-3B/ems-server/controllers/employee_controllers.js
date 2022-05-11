const { Employee } = require("../models/employee_model");

// Create and Save a new Employee
createEmp = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    const employee = await new Employee({
      name: req.body.name,
      dept: req.body.dept,
      sal: req.body.sal,
      exp: req.body.exp,
    }).save();

    console.log(employee);
    res.send({
      message: "Employee Created Sucessfully",
      data: {
        employee, //shorthand used
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Wmployee Saving Failed", details: e.msg });
  }
};

// Retrieve all Tutorials from the database.
findAllEmp = async (req, res) => {
  try {
    let filter = {};
    const employees = await Employee.find(filter);

    res.send({
      message: "Employees Fetched Sucessfully",
      data: {
        employees,
      },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Employees Fetching Failed", details: e.msg });
  }
};

// Find a single Tutorial with an id
findOneEmp = async (req, res) => {
  const empId = req.params.id;
  try {
    const employee = await Employee.findById(empId);
    res.send({
      message: "Employee Fetched Sucessfully",
      data: {
        employee,
      },
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Employee Fetching Failed", details: e.msg });
  }
};

// Update a Employee by the id in the request
updateEmp = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  try {
    const data = await Employee.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
      new: true,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`,
      });
    } else
      res.send({
        message: "Employee was updated successfully.",
        employee: data,
      });
  } catch (err) {
    res.status(500).send({
      message: "Error updating Employee with id:" + id,
    });
  }
};

// Delete a Employee with the specified id in the request
deleteEmp = async (req, res) => {
  const empId = req.params.id;

  try {
    const data = await Employee.findByIdAndDelete(empId);

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`,
      });
    } else {
      res.send({
        message: "Employee was deleted successfully!",
      });
    }
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Employee Deleting Failed", details: e.msg });
  }
};

// Delete all Employees from the database.
deleteAllEmp = async (req, res) => {
  try {
    const data = await Employee.deleteMany({});

    if (data) {
      res.send({
        message: `${data.deletedCount} Employees were deleted successfully!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all employees.",
    });
  }
};

module.exports = {
  createEmp,
  findAllEmp,
  findOneEmp,
  updateEmp,
  deleteEmp,
  deleteAllEmp,
};
