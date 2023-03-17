const {
  addUser,
  isUserAlreadyExist,
  generateToken,
  comparePwd,
} = require("./../service/user");

const createNewUser = async (req, res) => {
  const { fName, lName, email, password } = req.body;
  let isUserExist = await isUserAlreadyExist(email);
  try {
    if (isUserExist) {
      res.status(401).json({ message: "user is already exist" });
    } else {
      addUser(fName, lName, email, password);
      res.status(200).json({ message: "created user successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(501).json({ message: "something is wrong" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await isUserAlreadyExist(email);

  if (!user) {
    res.status(401).json({ message: "user not found" });
  }

  const match = await comparePwd(password, user.hash);

  if (!match) {
    res.status(401).json({ message: "Incorrect password." });
  }

  const token = generateToken(email);

  res.status(200).json({
    message: "successfully login",
    token: token,
    fName: user.fName,
    lName: user.lName,
    email: user.email,
  });
};

module.exports = { createNewUser, loginUser };
