const Coupen = require("../models/coupen");

class CoupenController {

  //Post Coupen
  async addCoupen(req, res) {
    try {

      const file = req.file;
      if (!file) return res.status(400).send("No image in the request");

      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;

      let coupen = new Coupen({
        image: `${basePath}${fileName}`,
        off: req.body.off,
        desc: req.body.desc,
        code: req.body.code,
      });
      coupen = await coupen.save();

      if (!coupen) {
        return res.status(500).send("The coupen cannot be created");
      }
      res.send(coupen);
    } catch (error) {
      console.log(error);
    }
  }

  //Get coupenList
  async coupenList(req, res) {
    try {
      const coupenList = await Coupen.find();
      if (!coupenList) {
        return res.status(500).json({
          success: false,
        });
      }
      res.send(coupenList);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CoupenController();