function createMinefield() {
    let minefield = {};
    minefield.rows = [];

    for (let y = 0; y < 9; y++) {
        let row = {};
        row.spots= [];

        for (let x = 0; x < 9; x++) {
            let spot = {};
            spot.isCovered = true;
            spot.content = "empty";
            row.spots.push(spot);
        }
        minefield.rows.push(row);
    }
    placeRandomMines(minefield);
    calculateAllNumbers(minefield);
    return minefield;
}

const minesweeperModule = angular.module('minesweeperApp', []);

const minesweeperController = function($scope) {
    $scope.minefield = createMinefield();
    $scope.uncoverSpot = function(spot) {
        spot.isCovered = false;

        if (spot.content == "mine") {
            $scope.hasLostMessageVisible = true;
        }
        else {
            if(hasWon($scope.minefield)) {
                $scope.isWinMessageVisible = true;
            }
        }
    }
}

minesweeperModule.controller("minesweeperController", minesweeperController);

function getSpot(minefield, row, column) {

    return minefield.rows[row].spots[column];

}

function placeRandomMines(minefield) {
    for (let i = 0; i < 10; i++) {
        let row = Math.round(Math.random() * 8);
        let column = Math.round(Math.random() * 8);
        let spot = getSpot(minefield, row, column);
        spot.content = "mine";
    }
}

function calculateNumber(minefield, row, column) {
    let thisSpot = getSpot(minefield, row, column);

    //if this spot contains a mine then we can't place a number here
    if(thisSpot.content == "mine") {
        return;
    }

    let mineCount = 0;

    //check row above if this is not the first row
    if (row > 0) {
        //check column to the left if this is not the first column
        if (column > 0) {
            // get the spot above and to the left
            let spot = getSpot(minefield, row - 1, column - 1);
            if(spot.content == "mine") {
                mineCount++;
            }
        }

        //get the spot right above
        let spot = getSpot(minefield, row - 1, column);
        if (spot.content == "mine") {
            mineCount++;
        }

        //check column to the right if this is not the last column
        if (column < 8) {
            //get the spot above and to the right
            let spot = getSpot(minefield, row - 1, column + 1);
            if (spot.content == "mine") {
                mineCount++;
            }
        }
    }

        //check column to the left if this is not the first column
        if (column > 0) {
            //get the spot to the left
            let spot = getSpot(minefield, row, column - 1);
            if (spot.content == "mine") {
                mineCount++;
            }
        }

        //check column to the right if this is not the last column
        if (column < 8) {
            //get the spot to the right
            let spot = getSpot(minefield, row, column + 1);
            if (spot.content == "mine") {
                mineCount++;
            }
        }

        //check row below if this is not the last row
        if (row < 8) {
            //check column to the left if this is not the first column
            if (column > 0) {
                //get the spot below and to the left
                let spot = getSpot(minefield, row + 1, column - 1);
                if (spot.content == "mine") {
                    mineCount++;
                }
            }
            
            //get the spot right below
            let spot = getSpot(minefield, row + 1, column);
            if (spot.content == "mine") {
                mineCount++;
            }
            //check column to the right if this is not the last column
            if (column < 8) {
                //get the spot below and to the right
                let spot = getSpot(minefield, row + 1, column + 1);
                if (spot.content == "mine") {
                    mineCount++;
                }
            }
        }

    if (mineCount > 0) {
        thisSpot.content = mineCount;
    }
}

function calculateAllNumbers(minefield) {
    for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
            calculateNumber(minefield, x, y);
        }
    }
}

function hasWon(minefield) {
    for (let y = 0; y < 9; y++) {
        for(let x = 0; x < 9; x++) {
            let spot = getSpot(minefield, x, y);
            if (spot.isCovered && spot.content != "mine") {
                return false;
            }
        }
    }
    return true;
}