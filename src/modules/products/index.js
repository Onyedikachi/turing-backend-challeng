const dbConn = require("../../db");
const { sendJSONResponse } = require("../../helpers/");
/**
 * Get all Products
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.getProducts = async (req, res) => {
  const queryString = "SELECT * FROM product";
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        { count: results.length, rows: results },
        req.method,
        "All products Fetched"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "No products returned",
        field: "product"
      };
      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    }
  });
};

module.exports.searchProducts = async (req, res) => {
  const searchTerm = req.query.find;
  const queryString = `SELECT * FROM product WHERE name LIKE '%${searchTerm}%'`;
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) {
      const errorObject = {
        code: error.code,
        message: "Invalid search term",
        field: "product"
      };
      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    }
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        { count: results.length, rows: results },
        req.method,
        "All products Fetched"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "Product Not found",
        field: "product"
      };
      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    }
  });
};
module.exports.getProductById = async (req, res) => {
  const product_id = req.params.product_id;
  const queryString = `SELECT * FROM product where product_id = ${product_id}`;
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) {
      const errorObject = {
        code: error.code,
        message: "Invalid query Parameter",
        field: "product"
      };
      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    }
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "All products Fetched"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "Product Not found",
        field: "product"
      };
      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    }
  });
};
module.exports.getProductsOfCategory = async (req, res) => {
  const category_id = req.params.category_id;
  const queryString = `SELECT p.product_id, p.name, p.description, p.price, 
  p.discounted_price, p.thumbnail FROM product_category pc INNER JOIN product p 
  ON p.product_id = pc.product_id WHERE pc.category_id =${category_id}`;

  dbConn.query(queryString, (error, results, fields) => {
    const errorObject = {};
    if (error) {
      errorObject.code = error.code;
      errorObject.message = "Invalid Category Id";
      errorObject.field = "Product";

      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    } else {
      if (results.length >= 1) {
        return sendJSONResponse(
          res,
          200,
          { count: results.length, rows: results },
          req.method,
          "All products Fetched"
        );
      } else {
        errorObject.code = "USR_02";
        errorObject.message = "Product By Category Id not";
        errorObject.field = "product";

        return sendJSONResponse(res, 400, errorObject, req.method, "error");
      }
    }
  });
};
module.exports.getProductsOfDepartment = async (req, res) => {
  const department_id = dbConn.escape(req.params.department_id);
  let queryString = `SELECT pc.product_id, p.name, p.description,p.price,
  p.discounted_price, p.image, p.image_2, p.thumbnail, p.display FROM
  category c INNER JOIN product_category pc ON pc.category_id = c.category_id
  INNER JOIN product p ON p.product_id = pc.product_id WHERE c.department_id
  = ${department_id}`;

  queryString = "" + queryString;
  console.log(queryString);

  dbConn.query(queryString, (error, results, fields) => {
    const errorObject = {};
    if (error) {
      errorObject.code = error.code;
      errorObject.message = "Invalid Department Id";
      errorObject.field = "product";
      errorObject.status = 500;

      return sendJSONResponse(
        res,
        500,
        errorObject,
        req.method,
        errorObject.message
      );
    } else {
      if (results.length > 0) {
        return sendJSONResponse(
          res,
          200,
          { count: results.length, rows: results },
          req.method,
          `Products in the Department with ID ${product_id} fetched`
        );
      } else {
        errorObject.code = "USR_02";
        errorObject.message = "No Product attached to that Department Id";
        errorObject.field = "product";
        errorObject.status = 401;

        return sendJSONResponse(
          res,
          401,
          errorObject,
          req.method,
          errorObject.message
        );
      }
    }
  });
};
module.exports.getProductDetails = async (req, res) => {
  const product_id = dbConn.escape(req.params.product_id);
  let queryString = `SELECT * FROM product WHERE product_id = ${product_id}`;

  await dbConn.query(queryString, (error, results, fields) => {
    const errorObject = {};
    if (error) {
      errorObject.code = error.code;
      errorObject.message = "Invalid Product Id";
      errorObject.field = "product";
      errorObject.status = 500;

      return sendJSONResponse(
        res,
        500,
        errorObject,
        req.method,
        errorObject.message
      );
    } else {
      if (results.length > 0) {
        return sendJSONResponse(
          res,
          200,
          results,
          req.method,
          `Products with ID ${product_id} fetched`
        );
      } else {
        errorObject.code = "USR_02";
        errorObject.message = "No Product attached to that Product Id";
        errorObject.field = "product";
        errorObject.status = 401;

        return sendJSONResponse(
          res,
          401,
          errorObject,
          req.method,
          errorObject.message
        );
      }
    }
  });
};
module.exports.getProductLocations = async (req, res) => {
  const product_id = dbConn.escape(req.params.product_id);
  let queryString = `SELECT c.category_id, c.name, d.department_id, d.name FROM 
  product_category pc INNER JOIN category c ON pc.category_id = c.category_id
  INNER JOIN department d ON c.department_id = d.department_id 
  WHERE product_id = ${product_id}`;

  await dbConn.query(queryString, (error, results, fields) => {
    const errorObject = {};
    if (error) {
      errorObject.code = error.code;
      errorObject.message = "Invalid Product Id";
      errorObject.field = "product";
      errorObject.status = 500;

      return sendJSONResponse(
        res,
        500,
        errorObject,
        req.method,
        errorObject.message
      );
    } else {
      if (results.length > 0) {
        return sendJSONResponse(
          res,
          200,
          results,
          req.method,
          `Product Location with ID ${product_id} fetched`
        );
      } else {
        errorObject.code = "USR_02";
        errorObject.message = "No Location attached to that Product Id";
        errorObject.field = "product";
        errorObject.status = 401;

        return sendJSONResponse(
          res,
          401,
          errorObject,
          req.method,
          errorObject.message
        );
      }
    }
  });
};
module.exports.getProductReviews = async (req, res) => {
  const product_id = dbConn.escape(req.params.product_id);
  let queryString = `SELECT cu.name, r.review, r.rating, r.created_on FROM review r
  INNER JOIN customer cu ON r.customer_id =  cu.customer_id 
  WHERE r.product_id = ${product_id}`;

  await dbConn.query(queryString, (error, results, fields) => {
    const errorObject = {};
    if (error) {
      errorObject.code = error.code;
      errorObject.message = "Invalid Product Id";
      errorObject.field = "product";
      errorObject.status = 500;

      return sendJSONResponse(
        res,
        500,
        errorObject,
        req.method,
        errorObject.message
      );
    } else {
      if (results.length > 0) {
        return sendJSONResponse(
          res,
          200,
          results,
          req.method,
          `Product review with ID ${product_id} fetched`
        );
      } else {
        errorObject.code = "USR_02";
        errorObject.message = "No Product review attached to that Product Id";
        errorObject.field = "product";
        errorObject.status = 401;

        return sendJSONResponse(
          res,
          401,
          errorObject,
          req.method,
          errorObject.message
        );
      }
    }
  });
};
module.exports.createReviews = async (req, res) => {
  const product_id = req.params.product_id;
  const postData = req.body;
  const errorObject = {};
  console.log(postData);
  if (
    postData &&
    typeof postData.product_id != "undefined" &&
    typeof postData.customer_id != "undefined" &&
    typeof postData.review != "undefined" &&
    typeof postData.created_on != "undefined"
  ) {
    dataArray = [];
    for (let k in postData) {
      dataArray.push(postData[k]);
    }
    console.log(dataArray);
    const queryString = `INSERT INTO review (review_id, customer_id, product_id, review, 
      rating, created_on) VALUES (NULL, ${postData.customer_id}, ${
      postData.product_id
    }, 
      ${postData.review}, ${postData.rating}, ${postData.date});`;

    dbConn.query(queryString, (error, results, fields) => {
      if (error) {
        errorObject.code = "USR_02";
        errorObject.message = "error occured";
        errorObject.field = "review";
        errorObject.status = 500;

        return sendJSONResponse(
          res,
          200,
          errorObject,
          req.method,
          errorObject.message
        );
      } else {
        return sendJSONResponse(
          res,
          200,
          results,
          req.method,
          `Product review sent for the product with id ${product_id}`
        );
      }
    });
  } else {
    // errorObject.code = ;
    errorObject.message = "No Data";
    errorObject.field = "product";
    errorObject.status = 200;

    return sendJSONResponse(
      res,
      200,
      errorObject,
      req.method,
      errorObject.message
    );
  }
};
