using mobi.astill.adventofcode2023 as my from '../db/schema';

service EngineSchematic {
    entity EngineSchematic as projection on my.EngineSchematic;

    function GetSumOfPartNumbers() returns Integer;
}