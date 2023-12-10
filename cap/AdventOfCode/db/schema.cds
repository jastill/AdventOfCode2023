namespace mobi.astill.adventofcode2023;

using { cuid } from '@sap/cds/common';

Entity Calibration: cuid {
    line: String(1024);
}

/**
 * This is the raw game data
 */
Entity GameData: cuid {
    attempt: String(1024);
}

/**
 *  This Entity has the parsed input file 
 */
Entity Game: cuid {
    gameID: Integer;
    turnID: Integer;
    entryID: Integer;
    color: String(1024);
    count: Integer;
}