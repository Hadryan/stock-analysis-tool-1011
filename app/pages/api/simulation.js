const fs = require("fs");
const axios = require("axios");
const csv = require("fast-csv");
const moment = require("moment");
let filepath =
  "F:\\PracticumProject\\stock-analysis-tool-1011\\Data\\simulation\\secid_Next_30_days.csv";

export default async (req, res, next) => {
  try {
    const companywithidURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/companywithid.json";
    console.log(req.url, req.query);
    const date = moment(req.query["date"], "DD-MM-YYYY").unix();
    const days = req.query["days"];
    const investment = parseFloat(req.query["investment"]);
    const company = req.query["company"].toUpperCase();
    console.log(date, days, company, investment);
    axios
      .get(companywithidURL)
      .then(async (s) => {
        const resp = s.data;
        const secid = resp[company];
        filepath = filepath.replace("secid", secid);
        await compute(filepath, date, days, investment)
          .then((s) => {
            res.send(s);
          })
          .catch((e) => {
            res.status(404).send({ error: "error" });
            console.log(e);
          });
      })
      .catch((e) => {
        res.status(404).send({ error: "error" });
        console.log(e);
      });
  } catch (error) {
    res.status(404).send({ error: "error" });
  }
};

const compute = async (filepath, date, days, investment) => {
  console.log(filepath, date, days, investment);
  return new Promise((resolve, reject) => {
    let response = [];
    let stream = fs.createReadStream(filepath);
    let start = false;
    let num = 0;
    let invested = false;
    let shares = 0;
    csv
      .parseStream(stream, { headers: true })
      .on("data", (data) => {
        const cur = moment(data["date"], "YYYY-MM-DD").unix();
        if (cur === date) {
          start = true;
        }
        if (start) {
          num = num + 1;
          if (data["invest"] === "True") {
            if (invested == false) {
              shares = investment / parseFloat(data["close"]);
              invested = true;
              response.push({
                investment: investment,
                entrydate: data["date"],
                shares: shares,
              });
            }
          }
          if (data["exit"] === "True") {
            if (invested) {
              investment = parseFloat(data["close"]) * shares;
              response.push({
                investment: investment,
                exitdate: data["date"],
                shares: shares,
              });
              invested = false;
            }
          }
          if (num == days) {
            if (invested) {
              investment = parseFloat(data["close"]) * shares;
              invested = false;
              response.push({
                investment: investment,
                exitdate: data["date"],
                shares: shares,
              });
            }
            throw "reached";
          }
        }
      })
      .on("end", () => {
        console.log("end");
        if (invested) {
          investment = parseFloat(data["close"]) * shares;
          invested = false;
          response.push({
            profit: investment,
            exitdate: data["date"],
            shares: shares,
          });
        }
        resolve(response);
      })
      .on("error", (e) => {
        if (e === "reached") {
          resolve(response);
        } else {
          reject({});
        }
        console.log(e);
      });
  });
};
