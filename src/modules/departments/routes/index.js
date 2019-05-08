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

router.get("/", catchErrors(ctrlAdmin.getDepartments));

router.get("/:id", catchErrors(ctrlAdmin.getSingleCategory));
module.exports = router;
