const fs = require("fs");
const csv = require("fast-csv");
const underscore = require("underscore");
const path = require("path");
const process = require("process");
const dirname = process.cwd();

export default async (req, res, next) => {
  let company = req.query["company"];
  company = company.toUpperCase();

  var companywithid = JSON.parse(
    fs.readFileSync(path.join(dirname, "Data", "companywithid.json"), "utf8")
  );

  const filename = companywithid[company] + ".csv";
  let filepath = path.join(dirname, "Data", "Stock", filename);
  if (fs.existsSync(filepath)) {
    try {
      await compute(filepath)
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
  } else {
    res.status(404).send({ error: "error" });
  }
};

const compute = async function (filepath) {
  return new Promise((resolve, reject) => {
    try {
      let stream = fs.createReadStream(filepath);
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
