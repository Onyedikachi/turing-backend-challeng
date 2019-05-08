const express = require("express");
const attributesRoutes = require("../modules/attributes/routes/");
const categoriesRoutes = require("../modules/categories/routes/");
const customerRoutes = require("../modules/customer/routes");
const customersRoutes = require("../modules/customers/routes");
const departmentsRoutes = require("../modules/departments/routes");
const productsRoutes = require("../modules/products/routes");
const shoppingcartRoutes = require("../modules/shoppingcart/routes");
const stripeRoutes = require("../modules/stripe/routes");
const taxRoutes = require("../modules/tax/routes");

const router = express.Router();

router.use("/attributes", attributesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/customer", customerRoutes);
router.use("/customers", customersRoutes);
router.use("/departments", departmentsRoutes);
router.use("/products", productsRoutes);
router.use("/shoppingcartRoutes", shoppingcartRoutes);
router.use("/stripe", stripeRoutes);
router.use("/tax", taxRoutes);

module.exports = router;
