const fs = require("fs");
const path = require("path");
const process = require("process");
const dirname = process.cwd();
export default (req, res) => {
  console.log(path.join(dirname, "Data", "companywithid.json"))
  try {
    const companywithid = JSON.parse(
      fs.readFileSync(path.join(dirname, "Data", "companywithid.json"), "utf8")
    );
    const companyNames = Object.keys(companywithid);
    console.log(__dirname);
    res.send(companyNames);
  } catch (error) {
    console.log(error);
    res.status(404).send({ error: path.join(dirname, "Data", "companywithid.json") });
  }
};
