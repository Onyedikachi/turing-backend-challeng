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

router.get("/", catchErrors(ctrlAdmin.getAttributes));
router.get("/:attribute_id", catchErrors(ctrlAdmin.getAttributesById));

router.get("/values/:attribute_id", catchErrors(ctrlAdmin.getAttributeValues));

router.get(
  "/inProduct/:product_id",
  catchErrors(ctrlAdmin.getAttributesByProductId)
);
module.exports = router;
