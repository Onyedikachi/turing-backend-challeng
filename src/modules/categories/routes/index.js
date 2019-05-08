const express = require("express");
const expressValidator = require("express-joi-validator");
const ctrlAdmin = require("../index");
const validateInput = require("../policies/");
const {
  catchErrors,
  verifyToken,
  checkTokenExists,
  checkAdmin
} = require("../../../helpers");

const router = express.Router();

router.get("/", catchErrors(ctrlAdmin.getCategories));
router.get("/:category_id", catchErrors(ctrlAdmin.getCategoryById));
router.get(
  "/inProduct/:product_id",
  catchErrors(ctrlAdmin.getCategoriesOfProduct)
);
router.get(
  "/inDepartment/:department_id",
  catchErrors(ctrlAdmin.getCategoriesOfDepartment)
);
module.exports = router;
