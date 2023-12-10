service InputAdmin {

    /**
     * 
     */
    action InsertCalibrationValues(input : String) returns String;

    /**
     * Parses the game data and inserts it into the database.
     */
    action ProcessGameData() returns String;
}
