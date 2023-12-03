module.exports = function AdventOfCode2023(){
    this.on('SumCalibrationValues', () => 99)
    this.on('add', ({data:{x,to}}) => stocks[to] += x)
    this.on('stock', ({data:{id}}) => stocks[id])
    this.on('getStock','Foo', ({params:[id]}) => stocks[id])
    this.on('order','Foo', ({params:[id],data:{x}}) => stocks[id] -= x)
  }