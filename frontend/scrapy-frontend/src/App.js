import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import axios from "axios";

const App = () => {
  const startUrls = [
    //this is just an example of what it could be. Replace with your own startUrls
    "https://www.dcc-cdc.gc.ca",
    "https://catsa-acsta.gc.ca",
    "https://cb-cda.gc.ca",
    "https://cib-bic.ca",
    "https://cihr-irsc.gc.ca",
    "https://cmhc-schl.gc.ca",
    "https://cnsc-ccsn.gc.ca",
    "https://crcc-ccetp.gc.ca",
    "https://csa-asc.gc.ca",
    "https://csc-scc.gc.ca",
    "https://csps-efpc.gc.ca",
    "https://dfo-mpo.gc.ca",
    "https://fja-cmf.gc.ca",
    "https://fpcc-cpac.gc.ca",
    "https://irb-cisr.gc.ca",
    "https://mpcc-cppm.gc.ca",
    "https://ncc-ccn.gc.ca",
    "https://nserc-crsng.gc.ca",
    "https://nsira-ossnr.gc.ca",
    "https://oci-bec.gc.ca",
    "https://pmprb-cepmb.gc.ca",
    "https://ppa-app.gc.ca",
    "https://ppsc-sppc.gc.ca",
    "https://psic-ispc.gc.ca",
    "https://sshrc-crsh.gc.ca",
    "https://vrab-tacra.gc.ca",
    "https://www.cas-satj.gc.ca",
    "https://www.cer-rec.gc.ca",
    "https://www.debates-debats.ca",
    "https://www.infrastructure.gc.ca",
    "https://www.investcanada.ca",
    "https://www.justice.gc.ca",
    "https://www.oag-bvg.gc.ca",
    "https://www.tsb-bst.gc.ca",
    "https://www.ccbn-nbc.gc.ca",
    "https://www.cbsa-asfc.gc.ca",
    "https://www.ccohs.ca/",
    "https://lobbycanada.gc.ca",
    "https://www.clo-ocol.gc.ca",
    "https://www.oic-ci.gc.ca",
    "https://www.osfi-bsif.gc.ca",
    "https://www.publicsafety.gc.ca",
    "https://www.rcmp-grc.gc.ca",
  ];
  const allowedDomains = [
    //this is just an example of what it could be. Replace with your own allowedDomains
    "dcc-cdc.gc.ca",
    "catsa-acsta.gc.ca",
    "cb-cda.gc.ca",
    "cib-bic.ca",
    "cihr-irsc.gc.ca",
    "cmhc-schl.gc.ca",
    "cnsc-ccsn.gc.ca",
    "crcc-ccetp.gc.ca",
    "csa-asc.gc.ca",
    "csc-scc.gc.ca",
    "csps-efpc.gc.ca",
    "dfo-mpo.gc.ca",
    "fja-cmf.gc.ca",
    "fpcc-cpac.gc.ca",
    "irb-cisr.gc.ca",
    "mpcc-cppm.gc.ca",
    "ncc-ccn.gc.ca",
    "nserc-crsng.gc.ca",
    "nsira-ossnr.gc.ca",
    "oci-bec.gc.ca",
    "pmprb-cepmb.gc.ca",
    "ppa-app.gc.ca",
    "ppsc-sppc.gc.ca",
    "psic-ispc.gc.ca",
    "sshrc-crsh.gc.ca",
    "vrab-tacra.gc.ca",
    "cas-satj.gc.ca",
    "cer-rec.gc.ca",
    "debates-debats.ca",
    "infrastructure.gc.ca",
    "investcanada.ca",
    "justice.gc.ca",
    "oag-bvg.gc.ca",
    "tsb-bst.gc.ca",
    "ccbn-nbc.gc.ca",
    "cbsa-asfc.gc.ca",
    "ccohs.ca/",
    "lobbycanada.gc.ca",
    "clo-ocol.gc.ca",
    "oic-ci.gc.ca",
    "osfi-bsif.gc.ca",
    "publicsafety.gc.ca",
    "rcmp-grc.gc.ca",
  ];
  const time = 600;

  const query = async () => {
    for (let i = 31; i < startUrls.length; i++) {
      console.log("i am on", i);
      let scrapeRequest = {
        allowedDomains: [allowedDomains[i]],
        startUrls: [startUrls[i]],
        time,
        deny: ["search/"],
      };

      await axios
        .post("http://localhost:5000/scrapy", scrapeRequest)
        .then((response) => {
          const fileData = response.data;
          console.log(fileData);
          const blob = new Blob([fileData], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `${allowedDomains[i]}.txt`;
          link.href = url;
          link.click();
        })
        .catch((err) => {
          console.error("Error ", err);
        });
      await setTimeout(() => {}, 2000);

      // return new Promise((resolve) =>
      //   setTimeout(resolve, time * 1000 + buffer)
      // );
    }
  };

  return (
    <div>
      <button onClick={query}>Start Query</button>
    </div>
  );
};

export default App;
