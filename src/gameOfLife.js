const {zipper, validateNeighbours, contains} = require('./gameOfLifeUtil.js');

const findNeighboursOfCell = function(cell,bounds) {
  let xCoordinates = [cell[0]-1, cell[0], cell[0]+1];
  let yCoordinates = [cell[1]-1, cell[1], cell[1]+1];
  let zip = zipper(yCoordinates);
  let allNeighbours = xCoordinates.reduce(zip, []);
  allNeighbours.splice(4,1);
  validateNeighbour = validateNeighbours.bind(null,bounds);
  let allValidNeighbours = allNeighbours.filter(validateNeighbour);
  return allValidNeighbours;
}

const findAllNeighbours = function(bounds){
  let allNeighbours = {}
  let rowStartPoint= bounds.topLeft[0];
  let columnStartPoint= bounds.topLeft[1];
  let rowEndPoint= bounds.bottomRight[0];
  let columnEndPoint= bounds.bottomRight[1];
  for (let row = rwoStartPoint; row<=rowEndPoint;row++) {
    for (let column = columnStartPoint; column<=columnEndPoint ; column++) {
      allNeighbours["["+row+", "+column+"]"] = findNeighboursOfCell([row, column], bounds);
    }
  }
  return allNeighbours;
}

const calculateAliveNeighboursOfCell = function(allNeighbours, currentGeneration, cell){
  let numberOfAliveNeighbours = 0;
  let neighboursOfCell = allNeighbours[cell];
  for (let neighbour of neighboursOfCell){
    let isAlive = contains(currentGeneration, neighbour); 
    if(isAlive) { numberOfAliveNeighbours++; }
  }
  return numberOfAliveNeighbours;
}

const aliveNeighboursCalculator = function(allNeighbours, currentGeneration) {
  return function(result, cell) {
    result[cell] = calculateAliveNeighboursOfCell(allNeighbours, currentGeneration, cell);
    return result;
  }
}


const calculateAliveNeighbours = function(allNeighbours, currentGeneration){
  let cells = Object.keys(allNeighbours);
  let aliveNeighboursOfEachCell = aliveNeighboursCalculator(allNeighbours, currentGeneration);
  let neighboursState = cells.reduce(aliveNeighboursOfEachCell, {});
  return neighboursState;
}

const nextGeneration = function(currentGeneration,bounds){
  let allNeighbours = findAllNeighbours(bounds);
  console.log(allNeighbours);
  let neighboursState = calculateAliveNeighbours(allNeighbours,currentGeneration);
  let aliveCells = [];
  let allCells = Object.keys(neighboursState);
  for (let cell of allCells){
    if(neighboursState[cell] == 3 ){
      aliveCells.push(JSON.parse(cell));
    }
    if(neighboursState[cell] == 2 && contains(currentGeneration,JSON.parse(cell))){
      aliveCells.push(JSON.parse(cell));
    }
  }
  return aliveCells;
}

module.exports = {findNeighboursOfCell, findAllNeighbours, calculateAliveNeighbours, nextGeneration};
