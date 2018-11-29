const assert = require('assert');
const {nextGeneration} = require('../src/gameOfLife.js');

const contains = (list,element) => list.some(e=>e[0]===element[0] && e[1]===element[1]);
const isSame = (actualList,expectedList) => actualList.every(contains.bind(null,expectedList));
const isSameArity = (actualList,expectedList) => actualList.length == expectedList.length;

describe('nextGeneration',() => {
  it("should return an verical blinker when given horizontal blinker with negative coordinates", () => {
    let currentGeneration = [[0, 0], [0, 1], [0, 2]];
    let expectedNextGen = [[-1,1], [0,1], [1, 1]];
    let bounds = {topLeft: [-1, -1], bottomRight: [2, 2]};
    let actualNextGen = nextGeneration(currentGeneration, bounds);
    assert.ok(isSame(actualNextGen, expectedNextGen));
    assert.ok(isSameArity(actualNextGen, expectedNextGen));
  });
});

