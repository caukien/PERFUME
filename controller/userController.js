const { model } = require("mongoose");
const User = require("../models/userModel.js");

exports.userController = {
  /*
   *GET ALL User
   */

  getAllUser: async (req, res) => {
    try {
      let perPage = 5;
      let page = req.query.page || 1;
      const count = await User.countDocuments({});
      const data = await User.find()
                              .skip(perPage * page - perPage)
                              .limit(perPage)
                              .exec();
      // res.status(200).json({ success: true, data: data });
      res.render("../views/admin/user/index", {
        data: data,
        current: page, 
        pages: Math.ceil(count / perPage),
      })
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /*
   *Get User ID
   */
  getUserByID: async (req, res) => {
    try {
      const data = await User.findById(req.params.id);
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /*
   * Delete User
   */

  deteleUser: async (req, res) => {
    try {
      const data = await User.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(404).json("User not found!");
      }else{
        res.redirect("/admin/getuser")
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  /*
   * Update User
   */

  updateUser: async (req, res) => {
    try {
      const data = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!data) {
        return res.status(404).json("User not found!");
      }

      res.status(200).json({ success: true, data: data });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};