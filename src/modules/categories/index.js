const dbConn = require("../../db");
const { sendJSONResponse } = require("../../helpers/");
/**
 * Get all Categories
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.getCategories = async (req, res) => {
  await dbConn.query("SELECT * from category", (error, results, fields) => {
    if (error) throw error;
    return sendJSONResponse(
      res,
      200,
      results,
      req.method,
      "Categories Fetched"
    );
  });
};
/**
 * Get Category by Id
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.getCategoryById = async (req, res) => {
  const { category_id } = req.params;

  await dbConn.query(
    "SELECT * from category WHERE category_id = " + category_id,
    (error, results, fields) => {
      if (error) throw error;
      if (results.length < 1) {
        return sendJSONResponse(
          res,
          404,
          null,
          req.method,
          "Category with id " + category_id + " not found"
        );
      } else {
        return sendJSONResponse(
          res,
          200,
          results,
          req.method,
          "Single Category Fetched"
        );
      }
    }
  );
};
module.exports.getCategoriesOfProduct = async (req, res) => {
  const { product_id } = req.params;
  const queryString = `SELECT c.category_id, department_id, name FROM category c INNER JOIN product_category pc ON pc.product_id = ${product_id} AND pc.category_id = c.category_id`;
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length < 1) {
      return sendJSONResponse(
        res,
        404,
        null,
        req.method,
        "Category for Product Id " + product_id + " not found"
      );
    } else {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "Category Fetched"
      );
    }
  });
};
module.exports.getCategoriesOfDepartment = async (req, res) => {
  const { department_id } = req.params;
  const queryString = `SELECT category_id, name,description, department_id FROM category WHERE department_id =  ${department_id}`;
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length < 1) {
      return sendJSONResponse(
        res,
        404,
        null,
        req.method,
        "Category for Product Id " + product_id + " not found"
      );
    } else {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "Categories Fetched"
      );
    }
  });
};
