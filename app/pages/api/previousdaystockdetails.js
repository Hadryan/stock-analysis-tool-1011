const fs = require("fs");
const csv = require("fast-csv");
const underscore = require("underscore");
const path = require("path");
const process = require("process");
const dirname = process.cwd();
const axios = require("axios");

export default async (req, res, next) => {
  console.log(req.url);
  try {
    const companywithidURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/companywithid.json";
    const previousdaystockdetailsURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/Stock/previousdaystockdetails.csv";
    let company = req.query["company"];
    if (company === undefined) {
      axios
        .get(companywithidURL)
        .then((s) => {
          if (s.status === 200) {
            const companywithid = underscore.invert(s.data);
            axios
              .get(previousdaystockdetailsURL)
              .then((t) => {
                if (t.status === 200) {
                  let previousdaystockdetail = [];
                  let rows = t.data.split("\n");
                  const header = rows[0].split(",");
                  for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    const cols = row.split(",");
                    var result = cols.reduce(function (result, field, index) {
                      result[
                        header[index].replace(/(\r\n|\n|\r)/gm, "")
                      ] = field.replace(/(\r\n|\n|\r)/gm, "");
                      return result;
                    }, {});
                    result["company"] = companywithid[result["company"]];
                    previousdaystockdetail.push(result);
                  }
                  res.send(previousdaystockdetail);
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
    } else {
      company = company.toUpperCase();
      axios
        .get(companywithidURL)
        .then((s) => {
          if (s.status === 200) {
            const companywithid = s.data;
            const code = parseInt(companywithid[company]);
            console.log(code);
            axios
              .get(previousdaystockdetailsURL)
              .then((t) => {
                if (t.status === 200) {
                  let rows = t.data.split("\n");
                  const header = rows[0].split(",");
                  for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const cols = row.split(",");
                    if (parseInt(cols[cols.length - 1]) === code) {
                      var result = cols.reduce(function (result, field, index) {
                        result[
                          header[index].replace(/(\r\n|\n|\r)/gm, "")
                        ] = field.replace(/(\r\n|\n|\r)/gm, "");
                        return result;
                      }, {});
                      res.send(result);
                      break;
                    }
                  }
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
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
};
