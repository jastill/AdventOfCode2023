module.exports = class AdventOfCode2023 extends cds.ApplicationService { init() {

    const { Calibration } = cds.entities('mobi.astill.adventofcode2023')
    const { CalibrationValues } = this.entities
  
    /**
     * SumCalibrationValues
     * 
     * The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value 
     * that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last 
     * digit (in that order) to form a single two-digit number.
     * For example:
     *   1abc2
     *   pqr3stu8vwx
     *   a1b2c3d4e5f
     *   treb7uchet
     * In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
     */
    this.on('SumCalibrationValues', async () => {
            //let { book:id, quantity } = req.data
            let calibrations = await SELECT.from (Calibration)

            console.log(calibrations)
            return calibrations.reduce((sum, row) => sum + row.CalibrationValue, 0)
        }
    )
  
    // Delegate requests to the underlying generic service
    return super.init()
  }}