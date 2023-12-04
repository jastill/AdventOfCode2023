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

            // Function to replace numbers spelt out with digits
            // The is very order specific as the Input.txt file has number words
            // that have overlapping numbers e.g. eightwo  
            // two1nine
            // eightwothree - 83
            // abcone2threexyz
            // xtwone3four
            // 4nineeightseven2
            // zoneight234 = 14
            // 7pqrstsixteen
            // In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76
            // So it is the first number it finds in the string that get replaced, not order based of the numbers
            let numreplace = (str) => {
              let numberValues = [{number: 'one', value: '1'}, {number: 'two', value: '2'}, {number: 'three', value: '3'}, {number: 'four', value: '4'}, {number: 'five', value: '5'}, {number: 'six', value: '6'}, {number: 'seven', value: '7'}, {number: 'eight', value: '8'}, {number: 'nine', value: '9'}]              

              // Loop over string looking for match at the beginning of the string
              // If found replace with the number and return the string
              // If not found return the string
              let text = str
              
              var returntext = str

              // Loop over each character in the string looking for a first text
              var found = false
              while (text.length>0) {
                for (let j = 0; j < numberValues.length; j++) {
                  let character = text.charAt(0)
                  if (character >= '1' && character <= '9') {
                    var found = true
                    break
                  }
                  if (text.startsWith(numberValues[j].number)) {
                    text = text.replace(numberValues[j].number, numberValues[j].value)
                    returntext = returntext.replace(numberValues[j].number, numberValues[j].value)
                    
                    var found = true
                    break
                  }
                }
                if (found) {
                  break
                }
                text = text.substring(1)
              }

              // Now loop over each character in the string looking for a last text
              var found = false
              text = returntext
              for (let i = 0; i < returntext.length; i++) {
                text = returntext.substring(returntext.length-i, returntext.length)
                //console.log(text+" "+i)
                for (let j = 0; j < numberValues.length; j++) {
                  let character = text.charAt(0)
                  if (character >= '1' && character <= '9') {
                    var found = true
                    break
                  }
                  if (text.endsWith(numberValues[j].number)) {
                    text = text.replace(numberValues[j].number, numberValues[j].value)
                    returntext = returntext.replace(numberValues[j].number, numberValues[j].value)
                    
                    var found = true
                    break
                  }
                }
                if (found) {
                  break
                }
              }

              console.log(str)
              console.log(returntext)

              return returntext
              //return str.replace(/one/g, '1').replace(/two/g, '2').replace(/three/g, '3').replace(/four/g, '4').replace(/five/g, '5').replace(/six/g, '6').replace(/seven/g, '7').replace(/eight/g, '8').replace(/nine/g, '9') // 55266
            }

            // Process each line, may be an easier way to do this.
            let process  = (line) => {
              // Replace text digits with the numbers.
              let digits = numreplace(line).match(/\d+/g).join('')
              if (digits.length < 1) {
                console.log('No digits found in line: ' + line)
                return 0
              } 
              let firstDigit = digits.charAt(0)
              let lastDigit = digits.charAt(digits.length - 1)
              let number = firstDigit + lastDigit

              console.log(number)
              return parseInt(number)
            }

            return calibrations.reduce((sum, row) => sum + process(row.line), 0)
        }
    )
  
    // Delegate requests to the underlying generic service
    return super.init()
  }}