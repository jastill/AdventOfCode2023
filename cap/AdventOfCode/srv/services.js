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
            // Select Help https://cap.cloud.sap/docs/node.js/cds-ql#select-from
            let calibrations = await SELECT.from (Calibration)

            //console.log(calibrations)

            var sum = 0;

            // Simple way, do it here, better way, push it down to the database
            calibrations.forEach(row => {
                //let firstDigit = row.match(/\d/)
                console.log(row)
                let digits = row.line.match(/\d+/g).join('')
                console.log(digits)
                let firstDigit = digits.charAt(0)
                let lastDigit = digits.charAt(digits.length - 1)
                let number = firstDigit + lastDigit
                console.log(firstDigit+" + "+lastDigit+" = "+number)
                sum += parseInt(number)
            })
            

            //return calibrations.reduce((sum, row) => sum + row.CalibrationValue, 0)
            return sum
        }
    )
  
    // Delegate requests to the underlying generic service
    return super.init()
  }}