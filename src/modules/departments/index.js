const dbConn = require("../../db");
const { sendJSONResponse } = require("../../helpers/");
/**
 * Get all Departments
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.getDepartments = async (req, res) => {
  await dbConn.query("SELECT * from department", (error, results, fields) => {
    if (error) throw error;
    return sendJSONResponse(res, 200, { results }, "Departments Fetched");
  });
};

/**
 * Get Department by Id
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.getDepartmentById = async (req, res) => {
  const { department_id } = req.params;

  await dbConn.query(
    "SELECT * from department WHERE department_id = " + department_id,
    (error, results, fields) => {
      if (error) throw error;
      if (results.length < 1) {
        return sendJSONResponse(
          res,
          404,
          null,
          "Department with id " + department_id + " not found"
        );
      } else {
        return sendJSONResponse(
          res,
          200,
          { results },
          "Single Department Fetched"
        );
      }
    }
  );
};
