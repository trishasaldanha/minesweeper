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
    return minefield;
}

const minesweeperModule = angular.module('minesweeperApp', []);

const minesweeperController = function($scope) {
    $scope.minefield = createMinefield();
}

minesweeperModule.controller("minesweeperController", minesweeperController);