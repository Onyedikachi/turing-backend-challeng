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
