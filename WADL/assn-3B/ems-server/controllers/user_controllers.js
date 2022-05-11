const { User } = require("../models/user_model");

// create new user
createUser = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  try {
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    }).save();

    console.log(user);
    res.send({
      message: "User Created Sucessfully",
      data: {
        user, //shorthand used
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "User Saving Failed", details: e.msg });
  }
};

// login user
loginUser = async (req, res) => {
  try {
    let filter = {
      name: req.body.name,
      password: req.body.password,
    };
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

module.exports = {
  createUser,
  loginUser,
};
