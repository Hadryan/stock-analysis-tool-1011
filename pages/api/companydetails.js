const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const process = require("process");
const dirname = process.cwd();

export default (req, res, next) => {
  console.log(req.url, req.query);
  let company = req.query["company"];
  try {
    const companies = JSON.parse(
      fs.readFileSync(path.join(dirname, "Data", "companies.json"), "utf8")
    );
    if (company === undefined) {
      res.send(companies);
    } else {
      company = company.toUpperCase();
      console.log(company);
      res.send(companies[company]);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
};
