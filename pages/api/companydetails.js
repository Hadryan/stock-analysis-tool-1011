const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const process = require("process");
const dirname = process.cwd();
const axios = require("axios");

export default (req, res, next) => {
  console.log(req.url, req.query);
  let company = req.query["company"];
  try {
    const companydetailsURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/companies.json";

    axios
      .get(companydetailsURL)
      .then((s) => {
        if (s.status === 200) {
          const companies = s.data;
          if (company === undefined) {
            res.send(companies);
          } else {
            company = company.toUpperCase();
            console.log(company);
            res.send(companies[company]);
          }
          res.send(companies);
        } else {
          res.status(404).send({ error: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send({ error: "error" });
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
};
