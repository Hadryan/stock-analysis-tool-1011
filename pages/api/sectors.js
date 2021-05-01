const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const process = require("process");
const dirname = process.cwd();

export default (req, res, next) => {
  try {
    const sectors = JSON.parse(
      fs.readFileSync(path.join(dirname, "Data", "sectors.json"), "utf8")
    );
    res.send(sectors);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error" });
  }
};
