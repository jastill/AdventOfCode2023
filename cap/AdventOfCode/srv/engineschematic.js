module.exports = class AdventOfCode2023 extends cds.ApplicationService {
  init() {
    const { EngineSchematic } = cds.entities("mobi.astill.adventofcode2023");
    /**
     *
     */
    this.on("GetSumOfPartNumbers", async () => {
      let entries = await SELECT.from(EngineSchematic);

      console.log("GetSumOfPartNumbers");

      var sumOfPartNumbers = 0;

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

      // Find the symbol in the line.
      entries.forEach((entry, index) => {
        // Search this line of text for each symbol
        // If we find a symbol, then we need to look around it to see if we can find a part number
        let line = entry.entry;
        let lineLength = line.length;

        console.log("line " + index + ":" + line);

        for (var i = 0; i < lineLength; i++) {
          // If character is a symbol, then we need to look around it to see if we can find a part number
          if (
            line[i] === "*" ||
            line[i] === "/" ||
            line[i] === "-" ||
            line[i] === "%" ||
            line[i] === "&" ||
            line[i] === "#" ||
            line[i] === "$" ||
            line[i] === "+"
          ) {
            console.log(
              "Found a symbol " +
                line[i] +
                " at position " +
                i +
                " in line " +
                index
            );

            // There are numbers above, below, left and right of the symbol.
            // Above and below also include the diagonals.

            // End of left part number
            var getLeftNumber = (aLine) => {
              if (i > 0) {
                let digit = aLine[i - 1];
                if (!isNaN(digit)) {
                  console.log(
                    "Found a digit at position " + (i - 1) + " in line " + index
                  );

                  let str = aLine.substring(0,i);
                  const lastNum = str.match(/\d+$/);

                  return parseInt(lastNum);
                }
              }
              return 0;
            };

            let leftNumber = parseInt(getLeftNumber(line));
            sumOfPartNumbers += parseInt(leftNumber);

            // Start of right part number
            var getRightNumber = (aLine) => {
              console.log("Getting right part number");
              if (i < lineLength - 1) {
                let digit = aLine[i + 1]
                if (!isNaN(digit)) {
                  console.log(
                    "Found a digit at position " + (i + 1) + " in line " + index
                  );

                  let str = aLine.substring(i);
                  const firstNum = str.match(/\d+/)

                  console.log("str: " + str)
                  console.log("firstNum: " + firstNum)
                  return parseInt(firstNum);
                }
              }
              return 0;
            };
            sumOfPartNumbers += getRightNumber(line);

            // Numbers above
            var getNumbersAbove = (aLine) => {
              console.log("Getting above part numbers");
              let digit = aLine[i + 1];
              if (digit >= "0" && digit <= "9") {
                console.log(
                  "Found a digit at position " + i + 1 + " in line " + index
                );
              }
              return 0;
            };
            //sumOfPartNumbers += getRightNumber(line);

            // Numbers below
          }
        }

        // If we find a part number, then we need to add it to the sumOfPartNumbers

        // console.log(entry)
        // console.log(index)
        // console.log(entry.partNumber)
      });

      return sumOfPartNumbers;
    });

    // Delegate requests to the underlying generic service
    return super.init();
  }
};
