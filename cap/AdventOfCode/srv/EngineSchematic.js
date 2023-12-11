module.exports = class AdventOfCode2023 extends cds.ApplicationService { init() {

    const { EngineSchematic } = cds.entities('mobi.astill.adventofcode2023')
    /**
     * 
     */
    this.on('GetSumOfPartNumbers', async () => {
        let entries = await SELECT.from(EngineSchematic)

        var sumOfPartNumbers = 0

        // Take 3 rows at a time so that we can look around the part number.
        // 467..114..
        // ...*......
        // ..35..633.
        // ......#...
        // 617*......
        // .....+.58.
        // ..592.....
        // ......755.
        // ...$.*....
        // .664.598..


        // Which are the relevant symbols
        // https://stackoverflow.com/questions/46479169/check-if-value-is-a-symbol-in-javascript
        // Javascript can use typeof x === 'symbol'

        // Find the first number in the string

        return sumOfPartNumbers
    })
  
    // Delegate requests to the underlying generic service
    return super.init()
  }}