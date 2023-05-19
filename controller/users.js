const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secret_key = process.env.SECRET_KEY;

class UserController {
  //Get userList
  async userList(req, res) {
    const userList = await User.find().select("-passwordHash");
    if (!userList) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send(userList);
  }

  //Get user by Id
  async userById(req, res) {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      return res.status(500).json({
        message: "The user with the given ID was not found",
      });
    }
    return res.status(200).send(user);
  }

  //It is for admin registretion
  async adminRegistretion(req, res) {
    let {
      name,
      email,
      passwordHash,
      phone,
      isAdmin,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    // if ( !name || !email || !passwordHash || !phone ||  !isAdmin || !apartment || !zip || !city || !country ) {
    //   return res.status(400).json({ error: "Plz filled the data" });
    // }

    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "User already Exist" });
      } else {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(passwordHash, salt);

        const user = new User({
          name,
          email,
          passwordHash,
          phone,
          isAdmin,
          apartment,
          zip,
          city,
          country,
        });
        await user.save();
        return res.status(201).send(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //It is for user registretion
  async userRegistretion(req, res) {
    let {
      name,
      email,
      passwordHash,
      phone,
      isAdmin,
      apartment,
      zip,
      city,
      country,
    } = req.body;

    // if ( !name || !email || !passwordHash || !phone ||  !isAdmin || !apartment || !zip || !city || !country ) {
    //   return res.status(400).json({ error: "Plz filled the data" });
    // }

    try {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        res.status(422).json({ error: "User already Exist" });
      } else {
        const salt = await bcrypt.genSalt(10);
        passwordHash = await bcrypt.hash(passwordHash, salt);

        const user = new User({
          name,
          email,
          passwordHash,
          phone,
          isAdmin,
          apartment,
          zip,
          city,
          country,
        });
        await user.save();
        return res.status(201).send(user);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //User login
  async userLogin(req, res) {
    let { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
      return res.status(422).json({ error: "Plz Enter valid credentials1" });
    }

    try {
      const userLogin = await User.findOne({ email: email });
      const userExistPassword = await bcrypt.compare(
        passwordHash,
        userLogin.passwordHash
      );

      if (userLogin && userExistPassword) {
        let token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        console.log(token);

        res.status(200).json({ error: "Login successfully" });
      } else {
        res.status(422).json({ error: "Plz Enter valid credentials2" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Delete user by Id
  deleteUser(req, res) {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "The user is deleted!" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "user not found!" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  }

  //Get total user count
  async totalUser(req, res) {
    const usertCount = await User.countDocuments();
    if (!usertCount) {
      return res.status(500).json({
        success: false,
      });
    }
    res.send({ usertCount: usertCount });
  }
}

module.exports = new UserController();
