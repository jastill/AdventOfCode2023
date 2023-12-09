const cds = require("@sap/cds");

const { GameData } = cds.entities('mobi.astill.adventofcode2023')
const { Game } = cds.entities('mobi.astill.adventofcode2023')

module.exports = cds.service.impl(async function (srv) {

    /**
     * 
     */
    srv.on('ProcessGameData', async (req)=>{
        req.data["AdditionalField"] = "AdditionalFieldValue";

        // Select Help https://cap.cloud.sap/docs/node.js/cds-ql#select-from
        let attempts = await SELECT.from (GameData)
        var gameDataEntries = []

        if (attempts.length <= 0) {
            return "No Game Data Found"
        }

        console.log("Attempts: "+attempts.length)

        let deleteRestul = await DELETE.from(Game);

        // Loop through the data extracting the game ID from the data and each entry seperated by a comma
        var gameDataArray = [];
        attempts.forEach(element => {
            console.log("Element: "+JSON.stringify(element))

            var gameData = element.attempt.split(":");
            var gameIDString = gameData[0];
            var gameID = gameIDString.split(" ")[1]
            var attempt = gameData[1];

            var entries = attempt.split(",");
        
            var count = 1
            // Loop through the entries and insert into the DB.
            entries.forEach(entry => {
                var entryArray = entry.trim().split(" ");
                var gameDataEntry = {
                    gameID: gameID,
                    entryID: count,
                    color: entryArray[1],
                    count: entryArray[0]
                }

                gameDataEntries.push(gameDataEntry);
                count++
            })

        });

        // https://cap.cloud.sap/docs/node.js/cds-ql#into
        console.log("Game Data Entries: "+JSON.stringify(gameDataEntries))

        let insertStatus = await INSERT.into(Game).entries(gameDataEntries);
        let insertResult = JSON.stringify(insertStatus.results)

        console.log("Insert Status: "+insertStatus)
        console.log("Insert Result: "+insertResult)

        return insertResult;
    })

    /**
     * Inserts the given calibration values into the database
     */
    srv.on('InsertCalibrationValues', async(req)=>{
        req.data["AdditionalField"] = "AdditionalFieldValue";
        return req.data;
    })
});
