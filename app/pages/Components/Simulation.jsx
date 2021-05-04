import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, Chip, Grid, Typography } from "@material-ui/core";
import axios from "axios";
class Simulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyNames: [
        "ABB INDIA LIMITED",
        "AEGIS LOGISTICS LTD",
        "AGRO TECH FOODS LTD",
        "AMARA RAJA BATTERIES LTD",
        "AMBALAL SARABHAI ENTERPRISES LTD",
        "AMBUJA CEMENTS LTD",
        "ANDHRA PETROCHEMICALS LTD",
        "ANSAL PROPERTIES  INFRASTRUCTURE LTD",
        "ARVIND LTD",
        "ASIAN HOTELS NORTH LIMITED",
        "ATUL LTD",
        "ATV PROJECTS INDIA LTD",
        "AUTOLITE INDIA LTD",
        "BAJAJ ELECTRICALS LTD",
        "BAJAJ FINANCE LIMITED",
        "BAJAJ HINDUSTHAN SUGAR LIMITED",
        "BALLARPUR INDUSTRIES LTD",
        "BALRAMPUR CHINI MILLS LTD",
        "BANCO PRODUCTS INDIA LTD",
        "BANNARI AMMAN SUGARS LTD",
        "BASF INDIA LTD",
        "BATA INDIA LTD",
        "BEML LTD",
        "BHANSALI ENGINEERING POLYMERS LTD",
        "BHARAT ELECTRONICS LTD",
        "BHARAT HEAVY ELECTRICALS LTD",
        "BIRLA CABLE LTD",
        "BLUE STAR LTD",
        "BNK CAPITAL MARKETS LTD",
        "BOMBAY BURMAH TRADING CORPLTD",
        "BOMBAY DYEING  MFGCOLTD",
        "BPL LTD",
        "BRITANNIA INDUSTRIES LTD",
        "CAREER POINT LTD",
        "CENTURY ENKA LTD",
        "CENTURY EXTRUSIONS LTD",
        "CENTURY TEXTILES  INDUSTRIES LTD",
        "CESC LTD",
        "CG POWER AND INDUSTRIAL SOLUTIONS LTD",
        "CHAMBAL FERTILISERS  CHEMICALS LTD",
        "CHENNAI PETROLEUM CORPORATION LTD",
        "CIPLA LTD",
        "CITY UNION BANK LTD",
        "COROMANDEL INTERNATIONAL LTD",
        "CRISIL LTD",
        "DABUR INDIA LTD",
        "DALMIA BHARAT SUGAR AND INDUSTRIES LTD",
        "DCW LTD",
        "DHAMPUR SUGAR MILLS LTD",
        "DIAMINES  CHEMICALS LTD",
        "DIC INDIA LTD",
        "DISA INDIA LTD",
        "DIVIS LABORATORIES LTD",
        "DRREDDYS LABORATORIES LTD",
        "EIDPARRY INDIA LTD",
        "ELANTAS BECK INDIA LTD",
        "ELECTROSTEEL CASTINGS LTD",
        "ENVAIR ELECTRODYNE LTD",
        "EPL LTD",
        "ESAB INDIA LTD",
        "ESTER INDUSTRIES LTD",
        "EXIDE INDUSTRIES LTD",
        "FINOLEX CABLES LTD",
        "FORCE MOTORS LTD",
        "FOSECO INDIA LTD",
        "GANESH BENZOPLAST LTD",
        "GFL LTD",
        "GHCL LTD",
        "GODFREY PHILLIPS INDIA LTD",
        "GODREJ INDUSTRIES LTD",
        "GOLDEN TOBACCO LTD",
        "GOODRICKE GROUP LTD",
        "GOODYEAR INDIA LTD",
        "GTL LTD",
        "GTN INDUSTRIES LTD",
        "GUJARAT LEASE FINANCING LTD",
        "HCL INFOSYSTEMS LTD",
        "HDFC BANK LTD",
        "HERO MOTOCORP LTD",
        "HFCL LTD",
        "HIMADRI SPECIALITY CHEMICAL LTD",
        "HINDUSTAN CONSTRUCTION COLTD",
        "HINDUSTAN OIL EXPLORATION COLTD",
        "HINDUSTAN PETROLEUM CORPORATION LTD",
        "HINDUSTAN ZINC LTD",
        "HLV LTD",
        "HMT LTD",
        "HOUSING DEVELOPMENT FINANCE CORPLTD",
        "HSIL LTD",
        "I G PETROCHEMICALS LTD",
        "ICICI BANK LTD",
        "IDBI BANK LTD",
        "IFCI LTD",
        "INDIA GLYCOLS LTD",
        "INDIA LEASE DEVELOPMENT LTD",
        "INDIAN OIL CORPORATION LTD",
        "INDO RAMA SYNTHETICS INDIA LTD",
        "INFOSYS LTD",
        "INGERSOLLRAND INDIA LTD",
        "INOX LEISURE LTD",
        "INSILCO LTD",
        "INTEGRATED FINANCIAL SERVICES LTD",
        "INTERNATIONAL TRAVEL HOUSE LTD",
        "ION EXCHANGE INDIA LTD",
        "JAIN IRRIGATION SYSTEMS LTD",
        "JASCH INDUSTRIES LTD",
        "JCT LTD",
        "JINDAL POLY FILMS LTD",
        "JOHN COCKERILL INDIA LTD",
        "JSW STEEL LTD",
        "JUBILANT FOODWORKS LTD",
        "KAJARIA CERAMICS LTD",
        "KAKATIYA CEMENT SUGAR  INDUSTRIES LTD",
        "KALYANI STEELS LTD",
        "KANEL INDUSTRIES LIMITED",
        "KANSAI NEROLAC PAINTS LTD",
        "KAVERI SEED COMPANY LTD",
        "KG DENIM LTD",
        "KINETIC ENGINEERING LTD",
        "KIRLOSKAR BROTHERS LTD",
        "KIRLOSKAR FERROUS INDUSTRIES LTD",
        "KIRLOSKAR INDUSTRIES LTD",
        "KOTAK MAHINDRA BANK LTD",
        "KRISHNA FILAMENT INDUSTRIES LTD",
        "KSB LTD",
        "LAKSHMI MACHINE WORKS LTD",
        "LGBALAKRISHNAN  BROSLTD",
        "LIC HOUSING FINANCE LTD",
        "LORDS CHLORO ALKALI LTD",
        "LUPIN LTD",
        "LYKA LABS LTD",
        "MAFATLAL INDUSTRIES LTD",
        "MAHANAGAR TELEPHONE NIGAM LTD",
        "MAHARASHTRA SCOOTERS LTD",
        "MAHARASHTRA SEAMLESS LTD",
        "MAJESTIC AUTO LTD",
        "MANALI PETROCHEMICAL LTD",
        "MANGALORE REFINERY  PETROCHEMICALS LTD",
        "MARGO FINANCE LIMITED",
        "MAX FINANCIAL SERVICES LTD",
        "METROGLOBAL LIMITED",
        "MID INDIA INDUSTRIES LTD",
        "MIRC ELECTRONICS LTD",
        "NATH BIOGENES INDIA LTD",
        "NESTLE INDIA LTD",
        "NXTDIGITAL LTD",
        "ORIENTAL AROMATICS LTD",
        "PFIZER LTD",
        "PH CAPITAL LTD",
        "PRAG BOSIMI SYNTHETICS LTD",
        "PROCTER  GAMBLE HEALTH LTD",
        "PVR LTD",
        "RELIANCE CAPITAL LTD",
        "RELIANCE INDUSTRIES LTD",
        "SAREGAMA INDIA LTD",
        "SHREE CEMENT LTD",
        "SPICEJET LTD",
        "STATE BANK OF INDIA",
        "STEEL AUTHORITY OF INDIA LTD",
        "SUN PHARMACEUTICAL INDUSTRIES LTD",
        "TATA CHEMICALS LTD",
        "TATA CONSULTANCY SERVICES LTD",
        "TATA STEEL BSL LTD",
        "THE RAMCO CEMENTS LIMITED",
        "TITAN COMPANY LIMITED",
        "TRENT LTD",
        "UFLEX LTD",
        "ULTRATECH CEMENT LTD",
        "UMANG DAIRIES LTD",
        "UTIQUE ENTERPRISES LTD",
        "WHIRLPOOL OF INDIA LTD",
        "WIPRO LTD",
        "ZEE LEARN LTD",
      ],
      selectedCompany: "",
      days: 1,
      investment: 1,
      startdate: "2017-03-10",
      response: [],
      earnings: 0,
    };
  }

  componentDidMount = () => {
    console.log("Simulation");
  };

  onClickSubmit = () => {
    const params =
      "company=" +
      this.state.selectedCompany +
      "&" +
      "investment=" +
      this.state.investment +
      "&" +
      "days=" +
      this.state.days +
      "&" +
      "date=" +
      this.state.startdate;
    axios
      .get("/api/simulation?" + params)
      .then((s) => {
        if (s.status === 200) {
          let res = s.data;
          let earnings =
            res[res.length - 1]["investment"] - res[0]["investment"];
          this.setState({ response: s.data, earnings: earnings }, () => {});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const today = new Date();
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item>
            <Autocomplete
              style={{ width: "200px" }}
              value={this.state.selectedCompany}
              onChange={(e, val) => {
                if (val == null) {
                  this.setState(
                    { response: [], selectedCompany: "" },
                    () => {}
                  );
                } else {
                  this.setState({ selectedCompany: val }, () => {});
                }
              }}
              id="search for companies"
              freeSolo
              options={this.state.companyNames.map(
                (companyname) => companyname
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="search for companies"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ paddingTop: "15px" }}
              variant="outlined"
              id="date"
              label="start date"
              type="date"
              defaultValue="2017-03-10"
              value={this.state.startdate}
              onChange={(e) => {
                this.setState({ startdate: e.target.value });
              }}
              InputProps={{
                inputProps: { min: "2017-03-10", max: "2021-03-19" },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              style={{ width: "100%", paddingTop: "15px" }}
              inputProps={{ min: "1", max: "800", step: "1" }}
              label="days"
              variant="outlined"
              value={this.state.days}
              onChange={(e) => {
                this.setState({ days: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              type="number"
              style={{ width: "100%", paddingTop: "15px" }}
              inputProps={{ min: "1", max: "1000000", step: "1" }}
              label="investment"
              variant="outlined"
              value={this.state.investment}
              onChange={(e) => {
                this.setState({ investment: e.target.value });
              }}
            />
          </Grid>
          <Grid item>
            <Button
              style={{ width: "100%", marginTop: "15px" }}
              variant="outlined"
              size="large"
              onClick={this.onClickSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {this.state.response.map((row) => {
          return (
            <div>
              {Object.keys(row).map((key) => {
                let res = key + " : " + row[key];
                return (
                  <Chip
                    color="primary"
                    variant="outlined"
                    label={res}
                    style={{ margin: "5px" }}
                  />
                );
              })}
            </div>
          );
        })}
        {this.state.earnings !== 0 ? (
          <Typography>
            {"total earnings "}
            {this.state.earnings}
          </Typography>
        ) : (
          <span />
        )}
      </React.Fragment>
    );
  }
}

export default Simulation;
