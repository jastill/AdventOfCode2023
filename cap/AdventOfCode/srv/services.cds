using mobi.astill.adventofcode2023 as my from '../db/schema';

service AdventOfCode2023 {
    entity Calibration as projection on my.Calibration;

    function SumCalibrationValues() returns Integer;
}