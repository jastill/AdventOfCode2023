module.exports = class AdventOfCode2023 extends cds.ApplicationService { init() {

    const { Game } = cds.entities('mobi.astill.adventofcode2023')
  
    /**
     * GetNumberOfValidGames
     * This should be done as a query....
     * 
     * Select the games where there are enough cubes in a turn and group by games.
     * 
     */
    this.on('GetNumberOfValidGames', async ({data:{r,g,b}}) => {
            let entries = await SELECT.from(Game).orderBy('gameID asc','turnID asc');

            const redLimit = r;
            const greenLimit = g;
            const blueLimit = b;

            var redCount = 0;
            var greenCount = 0;
            var blueCount = 0;

            var turn = -99;
            var currentGameID = -99;

            var sumOfGameIDs = 0;

            var validGame = true;

            entries.forEach(element => {
               // Loop through the entries and check each turn for a valid game
                console.log("Element: "+JSON.stringify(element))
                
                if (element.gameID != currentGameID) {
                    console.log("Game: "+currentGameID)
                    // New game reset the status
                    if (turn != -99 && redCount > redLimit || greenCount > greenLimit || blueCount > blueLimit) {
                        console.log("Invalid Game: "+currentGameID+ " Turn: "+turn)
                        validGame = false;
                    }

                    if (validGame == true && currentGameID != -99) {
                        console.log("Valid Game: "+currentGameID+ " Turn: "+turn)
                        sumOfGameIDs += currentGameID
                    }

                    redCount = 0;
                    greenCount = 0;
                    blueCount = 0;
                    currentGameID = element.gameID;
                    validGame = true;
                } else if (validGame == false) {
                    return
                } else if (element.turnID != turn) {
                    if (redCount > redLimit || greenCount > greenLimit || blueCount > blueLimit) {
                        console.log("Invalid Game: "+currentGameID+ " Turn: "+turn)
                        validGame = false;
                    }

                    redCount = 0;
                    greenCount = 0;
                    blueCount = 0;
                }

                turn = element.turnID;
                //console.log("Turn: "+turn)

                if (element.color == "red") {
                    redCount = element.count;
                } else if (element.color == "green") {
                    greenCount = element.count;
                } else if (element.color == "blue") {
                    blueCount = element.count;
                }   
            });

            if (validGame == true && redCount <= redLimit && greenCount <= greenLimit && blueCount <= blueLimit) {
                console.log("Valid Game: "+currentGameID+ " Turn: "+turn)
                sumOfGameIDs += currentGameID
            }

            return sumOfGameIDs
        }
    )
  
    // Delegate requests to the underlying generic service
    return super.init()
  }}