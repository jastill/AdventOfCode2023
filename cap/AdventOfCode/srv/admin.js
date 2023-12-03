const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (srv) {

    srv.on('InsertCalibrationValues', async(req)=>{
        req.data["AdditionalField"] = "AdditionalFieldValue";
        return req.data;
    })
});
