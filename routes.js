const express = require("express");
const router = express.Router();
const api = process.env.API_URL;
const multer = require("multer");

const UserController = require("./controller/users");
const CategoryController = require("./controller/categories");
const ProductContoller = require("./controller/products");
const OrderController = require("./controller/orders");
const CoupenController = require("./controller/coupens");

router.get("/", (req, res) => {
  res.send("Hello ab hogi meri shadi");
});

//File upload
FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/avif": "avif",
  "image/webp": "webp",
};

storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/upload");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extention}`);
  },
});

upload = multer({ storage: storage });

//Product
router.get(`${api}/products/`, ProductContoller.productList);
router.get(`${api}/productlist/`, ProductContoller.getProductList);
router.get(`${api}/products/categories/:id`, ProductContoller.productListByCategory);
router.get(`${api}/products/:id`, ProductContoller.productById);
router.post(
  `${api}/products/`,
  upload.single("image"),
  ProductContoller.uploadImage
);
router.delete(`${api}/products/:id`, ProductContoller.deleteProduct);
router.get(`${api}/products/get/count`, ProductContoller.totalProduct);
router.get(
  `${api}/products/get/featured/:count`,
  ProductContoller.featuredProduct
);
router.put(
  `${api}/products/gallery-images/:id`,
  upload.array("images", 10),
  ProductContoller.uploadImages
);

//Category
router.get(`${api}/categories/`, CategoryController.categoryList);
router.get(`${api}/categories/:id`, CategoryController.categoryById);
router.post(`${api}/categories/`, CategoryController.addCategory);
router.put(`${api}/categories/:id`, CategoryController.updateCategory);
router.delete(`${api}/categories/:id`, CategoryController.deleteCategory);

//Order
router.get(`${api}/orders/`, OrderController.orderList);
router.get(`${api}/orders/:id`, OrderController.orderById);
router.post(`${api}/orders/`, OrderController.addOrder);
router.put(`${api}/orders/:id`, OrderController.updateOrder);
router.delete(`${api}/orders/:id`, OrderController.deleteOrder);
router.get(`${api}/orders/get/totalsales`, OrderController.totalSales);
router.get(`${api}/orders/get/count`, OrderController.totalOrder);
router.get(`${api}/orders/get/userorders/:userid`, OrderController.userOrder);

//User
router.get(`${api}/users/`, UserController.userList);
router.get(`${api}/users/:id`, UserController.userById);
router.post(`${api}/users/register`, UserController.adminRegistretion);
router.post(`${api}/users/`, UserController.userRegistretion);
router.post(`${api}/users/login`, UserController.userLogin);
router.delete(`${api}/users/:id`, UserController.deleteUser);
router.get(`${api}/users/get/count`, UserController.totalUser);

//Coupen
router.post(`${api}/coupens/`, upload.single("image"), CoupenController.addCoupen);
router.get(`${api}/coupens/`, CoupenController.coupenList);

module.exports = router;
