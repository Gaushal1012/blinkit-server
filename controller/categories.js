const  Category  = require("../models/category");

class CategoryController {
  //Get categoryList
  async categoryList(req, res) {
    const categoryList = await Category.find();
    if (!categoryList) {
      res.status(500).json({
        success: false,
      });
    }
    res.send(categoryList);
  }

  //Get category by Id
  async categoryById(req, res) {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(500)
        .json({ message: "The category with the given ID was not found" });
    }
    res.send(category);
  }

  //Post category
  async addCategory(req, res) {
    let { name, icon, color } = req.body;
    try {
      const category = new Category({ name, icon, color });
      await category.save();

      if (!category) {
        return res.status(404).send("The category cannot be created!");
      }
      res.send(category);
    } catch (error) {
      console.log(error);
    }
  }

  //Update category by Id
  async updateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color,
        },
        {
          new: true,
        }
      );

      if (!category) {
        return res.status(404).send("The category cannot be created!");
      }
      res.send(category);
    } catch (error) {
      console.log(error);
    }
  }

  //Delete category by Id
async  deleteCategory(req, res) {
    await Category.findByIdAndRemove(req.params.id)
      .then((category) => {
        if (category) {
          return res
            .status(200)
            .json({ success: true, message: "The category is deleted!" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "category not found!" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
  }
}

module.exports = new CategoryController();
