var router = require("express").Router();

const emp_cntl = require("../controllers/employee_controllers");

// Create a new employee
router.post("/", emp_cntl.createEmp);

// Retrieve all employees
router.get("/", emp_cntl.findAllEmp);

// Retrieve a single employee with id
router.get("/:id", emp_cntl.findOneEmp);

// Update a employee with id
router.put("/:id", emp_cntl.updateEmp);

// Delete a employee with id
router.delete("/:id", emp_cntl.deleteEmp);

// Create a new employee
router.delete("/", emp_cntl.deleteAllEmp);

module.exports = router;
