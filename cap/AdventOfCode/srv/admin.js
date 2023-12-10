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
        let games = await SELECT.from (GameData)
        var gameDataEntries = []

        if (games.length <= 0) {
            return "No Game Data Found"
        }

        console.log("Games: "+games.length)

        let deleteRestul = await DELETE.from(Game);

        var gameDataArray = [];

        // Loop through the data extracting the game ID from the data and each entry seperated by a comma
        games.forEach(element => {
            console.log("Element: "+JSON.stringify(element))

            var gameData = element.attempt.split(":");
            var gameIDString = gameData[0];
            var gameID = gameIDString.split(" ")[1]
            var attempt = gameData[1];

            // Each turn is seperated by a semi-colon
            let turns = attempt.split(";");

            console.log("Turns: "+turns.length)
        
            var turnCount = 1;
            turns.forEach(turn => {
                var count = 1
                var entries = turn.split(",");
                // Loop through the entries and insert into the DB.
                entries.forEach(entry => {
                    console.log("Entry: "+entry)
                    var entryArray = entry.trim().split(" ");
                    var gameDataEntry = {
                        gameID: gameID,
                        turnID: turnCount,
                        entryID: count,
                        color: entryArray[1],
                        count: entryArray[0]
                    }

                    gameDataEntries.push(gameDataEntry);
                    count++
                })

                turnCount++;
            });

        });

        // https://cap.cloud.sap/docs/node.js/cds-ql#into
        console.log("Game Data Entries: "+JSON.stringify(gameDataEntries))

        let insertStatus = await INSERT.into(Game).entries(gameDataEntries);
        let insertResult = JSON.stringify(insertStatus.results)

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
