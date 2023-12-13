const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const dotenv = require("dotenv");
const session = require('../middleware/session.js');
const User = require("../models/userModel.js");
const { render } = require("ejs");

let refreshTokens = [];
dotenv.config();



exports.authController = {
  /*
  * Login form
  */
getloginform: async(req, res) =>{
  try {
    res.render('../views/admin/login');
  } catch (error) {
    return res.status(500).json(err);
  }
},
loginform4user: async(req, res) =>{
  try {
    res.render('../views/client/account');
  } catch (error) {
    return res.status(500).json(err);
  }
},

  /*
   * Register
   */

  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
        lastname: req.body.lastname,
        firtname: req.body.firtname,
      });

      const data = await newUser.save();
      res.status(201).json({ success: true, data });
    } catch (e) {
      res.status(500).json(e);
    }
  },

  /*
   *  Generate Access Token
   */

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "1d",
      }
    );
  },

  /*
   *  Generate Resfresh Token
   */

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "1d",
      }
    );
  },
  /*
   * Login
   */
  signinUser: async (req, res) =>{
        try {
          const check = await User.findOne({ username: req.body.username });
          if (!check) {
            return res.send("User name cannot found")
          }
          // Compare the hashed password from the database with the plaintext password
          const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
          if (!isPasswordMatch) {
            return res.send("wrong Password");
          }
          else {
            if(check.isAdmin === true){
              req.session.
              req.session.isAuth = true;
              res.render("../views/admin/home",{userid: check});
            }else{
              res.render('../views/admin/login');
            }
          }
        } catch (error) {
          return res.status(400).json(error)
        }
  },
  // signinUser: async (req, res) => {
  //   try {
  //     const user = await User.findOne({
  //       username: req.body.username,
  //     });
  //     if (!user) {
  //       return res
  //         .status(401)
  //         .json({ message: "Authentication failed. User not found." });
  //     }

  //     const validPassword = await bcrypt.compare(
  //       req.body.password,
  //       user.password
  //     );
  //     if (!validPassword) {
  //       return res.status(401).json({ message: "Invalid Password!" });
  //     }
  //     if (user && validPassword) {
  //       const accessToken = this.authController.generateAccessToken(user);
  //       const refreshToken = this.authController.generateRefreshToken(user);
  //       refreshTokens.push(refreshToken);
  //       // Cookies
  //       res.cookie("refreshToken", refreshToken, {
  //         httpOnly: true,
  //         path: "/",
  //         secure: false,
  //         sameSite: "strict", // den tu sameSite
  //       });

  //       // Response
  //       const { password, ...others } = user._doc;
  //       res.status(200).json({
  //         success: true,
  //         data: { ...others, accessToken },
  //       });
  //       // res.redirect('../views/admin/home', {
  //       //   data_token: { ...others, accessToken }
  //       // })
  //     }
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },

  /*
   * Refresh Token
   */

  requestRefreshToken: async (req, res) => {
    // lấy resfresh token from user
    const refreshToken = req.cookies.refreshToken;
    res.status(200).json(refreshToken);

    if (!refreshToken)
      return res.status(401).json({ message: "You're not authoricated" });

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Resfresh token is not valid" });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log("🚀 jwt.verify ~ err:", err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      /*
       * create new access token,  refresh token is valid
       */

      const newAccessToken = this.authController.generateAccessToken(user);
      const newResfreshToken = this.authController.generateRefreshToken(user);

      refreshTokens.push(newResfreshToken);
      res.cookie("refreshToken", newResfreshToken, {
        httpOnly: true,
        path: "/",
        secure: false,
        sameSite: "strict", //chanwj den tu sameSite
      });
      res.status(200).json({
        success: true,
        data: { accessToken: newAccessToken },
      });
    });
  },
  /*
   * Logout
   */
  logoutUser: async (req, res) => {
    try {
      // res.clearCookie("refreshToken");
      // res.status(200).json({ success: true, message: "Logout successfully" });
      req.session.destroy();
      res.render("../views/admin/login");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
