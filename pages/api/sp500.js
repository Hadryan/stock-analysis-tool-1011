const fs = require("fs");
const csv = require("fast-csv");
const underscore = require("underscore");
const path = require("path");
const process = require("process");
const dirname = process.cwd();

export default async (req, res, next) => {
  try {
    await compute()
      .then((s) => {
        res.send(s);
      })
      .catch((e) => {
        console.log(e);
        res.status(404).send({ error: "error" });
      });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
};

const compute = async function () {
  return new Promise((resolve, reject) => {
    try {
      let stream = fs.createReadStream(path.join(dirname, "Data", "sp500.csv"));
      let mydata = [];
      csv
        .parseStream(stream, { headers: true })
        .on("data", (data) => {
          mydata.push(data);
        })
        .on("end", () => {
          resolve(mydata);
        });
    } catch (error) {
      reject("error");
    }
  });
};
