using mobi.astill.adventofcode2023 as my from '../db/schema';

service CubeConundrum {
    entity GameData as projection on my.GameData;
    entity Game as projection on my.Game;

    function GetNumberOfValidGames(r:Integer, g:Integer, b:Integer) returns Integer;
}