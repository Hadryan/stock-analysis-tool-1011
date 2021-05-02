const fs = require("fs");
const csv = require("fast-csv");
const underscore = require("underscore");
const path = require("path");
const process = require("process");
const dirname = process.cwd();
const axios = require("axios");

export default async (req, res, next) => {
  try {
    console.log(req.url, req.query);
    const query = req.query;
    const days = parseInt(query["days"]);
    const rate = parseFloat(query["rate"]) / 100;
    let company = req.query["company"];
    company = company.toUpperCase();
    console.log(company, days, rate);

    const companywithidURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/companywithid.json";
    const grstockdetailsURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/GRStock";
    axios
      .get(companywithidURL)
      .then((s) => {
        if (s.status === 200) {
          const companywithid = s.data;
          const code = parseInt(companywithid[company]);
          axios
            .get(grstockdetailsURL + "/" + "gr" + code + ".csv")
            .then((t) => {
              if (t.status === 200) {
                let nums = 0;
                let stockdetails = [];
                let rows = t.data.split("\n");
                const header = rows[0].split(",");
                const cpgr = header.indexOf("Close Price GR");
                for (let i = 1; i < days + 1; i++) {
                  const row = rows[i];
                  const cols = row.split(",");
                  if (cols[cpgr] > rate) {
                    nums = nums + 1;
                  }
                }
                const resp = {
                  company: company,
                  numberOfDays: nums,
                  percentOfDays: ((nums / days) * 100).toFixed(3),
                  totalNumberOfDays: days,
                  rate: rate,
                };
                res.send(resp);
              }
            })
            .then((error) => {
              console.log(error);
              res.status(404).send({ error: "error" });
            });
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
