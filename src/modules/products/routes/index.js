const express = require("express");
const expressValidator = require("express-joi-validator");
const ctrlAdmin = require("../index");
const validateInput = require("../policies");
const {
  catchErrors,
  verifyToken,
  checkTokenExists,
  checkAdmin
} = require("../../../helpers");

const router = express.Router();

router.post(
  "/:product_id/reviews",
  // checkTokenExists,
  // verifyToken,
  // checkAdmin,
  // expressValidator(validateInput.create),
  catchErrors(ctrlAdmin.createReviews)
);

router.get("/", catchErrors(ctrlAdmin.getProducts));
router.get("/search", catchErrors(ctrlAdmin.searchProducts));
router.get("/:product_id", catchErrors(ctrlAdmin.getProductById));
router.get(
  "/inCategory/:category_id",
  catchErrors(ctrlAdmin.getProductsOfCategory)
);
router.get(
  "/inDepartment/:department_id",
  catchErrors(ctrlAdmin.getProductsOfDepartment)
);
router.get("/:product_id/details", catchErrors(ctrlAdmin.getProductDetails));
router.get(
  "/:product_id/locations",
  catchErrors(ctrlAdmin.getProductLocations)
);
router.get("/:product_id/reviews", catchErrors(ctrlAdmin.getProductReviews));

module.exports = router;
