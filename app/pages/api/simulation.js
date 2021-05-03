const fs = require("fs");
const axios = require("axios");
const csv = require("fast-csv");
const moment = require("moment");

export default async (req, res, next) => {
  try {
    let filepath =
      "F:\\PracticumProject\\stock-analysis-tool-1011\\Data\\simulation\\secid_Next_30_days.csv";
    const companywithidURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/companywithid.json";
    let simulationURL =
      "https://raw.githubusercontent.com/saikr789/stock-analysis-tool-1011/master/Data/simulation/secid_Next_30_days.csv";
    console.log(req.url, req.query);
    const date = moment(req.query["date"], "DD-MM-YYYY").unix();
    const days = req.query["days"];
    const investment = parseFloat(req.query["investment"]);
    const company = req.query["company"].toUpperCase();
    axios
      .get(companywithidURL)
      .then(async (s) => {
        if (s.status === 200) {
          const resp = s.data;
          const secid = resp[company];
          await computeFromURL(
            simulationURL.replace("secid", secid),
            date,
            days,
            investment
          )
            .then((s) => {
              res.send(s);
            })
            .catch((e) => {
              res.status(404).send({ error: "error" });
              console.log(e);
            });
          // await compute(
          //   filepath.replace("secid", secid),
          //   date,
          //   days,
          //   investment
          // )
          //   .then((s) => {
          //     res.send(s);
          //   })
          //   .catch((e) => {
          //     res.status(404).send({ error: "error" });
          //     console.log(e);
          //   });
        } else {
          res.status(404).send({ error: "error" });
        }
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

const computeFromURL = async (simulationURL, date, days, investment) => {
  return new Promise((resolve, reject) => {
    axios
      .get(simulationURL)
      .then((s) => {
        if (s.status == 200) {
          let response = [];
          let start = false;
          let num = 0;
          let invested = false;
          let shares = 0;
          let rows = s.data.split("\n");
          const header = rows[0].split(",");
          const investindex = header.indexOf("invest");
          const exitindex = header.indexOf("exit");
          const dateindex = header.indexOf("date");
          const closeindex = header.indexOf("close");
          for (let i = 1; i < rows.length; i++) {
            const data = rows[i].split(",");
            const cur = moment(data[dateindex], "YYYY-MM-DD").unix();
            if (cur == date) {
              start = true;
            }

            if (start) {
              num = num + 1;
              if (data[investindex] === "True") {
                if (invested == false) {
                  shares = investment / parseFloat(data[closeindex]);
                  invested = true;
                  response.push({
                    investment: investment,
                    entrydate: data[dateindex],
                    shares: shares,
                  });
                }
              }
              if (data[exitindex] === "True") {
                if (invested) {
                  investment = parseFloat(data[closeindex]) * shares;
                  response.push({
                    investment: investment,
                    exitdate: data[dateindex],
                    shares: shares,
                  });
                  invested = false;
                }
              }
              if (num == days) {
                if (invested) {
                  investment = parseFloat(data[closeindex]) * shares;
                  invested = false;
                  response.push({
                    investment: investment,
                    exitdate: data[dateindex],
                    shares: shares,
                  });
                }
                break;
              }
            }
          }
          if (invested) {
            investment = parseFloat(data[closeindex]) * shares;
            response.push({
              investment: investment,
              exitdate: data[dateindex],
              shares: shares,
            });
            invested = false;
          }
          resolve(response);
        }
      })
      .catch((e) => {
        console.log(e);
        reject({});
      });
  });
};
