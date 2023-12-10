module.exports = class AdventOfCode2023 extends cds.ApplicationService { init() {

    const { EngineSchematic } = cds.entities('mobi.astill.adventofcode2023')
    /**
     * 
     */
    this.on('GetSumOfPartNumbers', async () => {
        let entries = await SELECT.from(EngineSchematic)

        var sumOfPartNumbers = 0
        return sumOfPartNumbers
    })
  
    // Delegate requests to the underlying generic service
    return super.init()
  }}