const dbConn = require("../../db");
const { sendJSONResponse } = require("../../helpers/");
/**
 * Get all Attributes
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.getAttributes = async (req, res) => {
  const queryString = "SELECT attribute_id, name FROM attribute";
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "All Attributes Fetched"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "No attributes returned",
        field: "attributes"
      };
      return sendJSONResponse(res, 400, errorObject, req.method, "error");
    }
  });
};
module.exports.getAttributesById = async (req, res) => {
  const { attribute_id } = req.params;
  const queryString = `SELECT attribute_id, name from attribute WHERE attribute_id = ${attribute_id}`;

  dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "Attribute fetched by Id"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "No attributes returned",
        field: "attributes"
      };
      return sendJSONResponse(
        res,
        400,
        errorObject,
        req.method,
        "Attributed Id not found"
      );
    }
  });
};
module.exports.getAttributeValues = async (req, res) => {
  const { attribute_id } = req.params;
  const queryString = `SELECT attribute_value_id, value FROM attribute_value WHERE attribute_id = ${attribute_id}`;
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "Attribute fetched by Id"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "No attributes returned",
        field: "attributes"
      };
      return sendJSONResponse(
        res,
        400,
        errorObject,
        req.method,
        "Attributed Id not found"
      );
    }
  });
};
module.exports.getAttributesByProductId = async (req, res) => {
  const { product_id } = req.params;
  const queryString = `SELECT pa.attribute_value_id, a.name attribute_name, av.value attribute_value FROM 
  product_attribute pa INNER JOIN attribute_value av ON 
  av.attribute_value_id = pa.attribute_value_id INNER JOIN 
  attribute a ON a.attribute_id = av.attribute_id WHERE pa.product_id = ${product_id}`;
  await dbConn.query(queryString, (error, results, fields) => {
    if (error) throw error;
    if (results.length >= 1) {
      return sendJSONResponse(
        res,
        200,
        results,
        req.method,
        "Attribute fetched by Product Id"
      );
    } else {
      const errorObject = {
        code: "USR_02",
        message: "No attributes returned",
        field: "attributes"
      };
      return sendJSONResponse(
        res,
        400,
        errorObject,
        req.method,
        "No Attribute is Associate with this productId"
      );
    }
  });
};
