const fs = require("fs");
const path = require("path");
const process = require("process");
const dirname = process.cwd();
fs.readdir(dirname, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

fs.readdir(__dirname, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

export default (req, res) => {
  try {
    const companywithid = JSON.parse(
      fs.readFileSync(path.join(dirname, "Data", "companywithid.json"), "utf8")
    );
    const companyNames = Object.keys(companywithid);
    res.send(companyNames);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: "error"});
  }
};
