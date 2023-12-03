using mobi.astill.adventofcode2023 as my from '../db/schema';

service AdventOfCode2023 {
    entity Input as projection on my.Input;

    function SumCalibrationValues() returns Integer;
}