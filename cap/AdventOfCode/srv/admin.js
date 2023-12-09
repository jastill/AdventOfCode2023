const cds = require("@sap/cds");

const { GameData } = cds.entities('mobi.astill.adventofcode2023')

module.exports = cds.service.impl(async function (srv) {

    /**
     * 
     */
    srv.on('ProcessGameData', async(req)=>{
        req.data["AdditionalField"] = "AdditionalFieldValue";
            // Select Help https://cap.cloud.sap/docs/node.js/cds-ql#select-from
            let attempts = await SELECT.from (GameData)

            req.data.attempts = attempts;
        return req.data;
    })

    /**
     * 
     */
    srv.on('InsertCalibrationValues', async(req)=>{
        req.data["AdditionalField"] = "AdditionalFieldValue";
        return req.data;
    })
});
