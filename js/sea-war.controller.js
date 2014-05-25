Game.PersonShipController = function () {
    var toggleShip = function (model, row, col) {
			model.setShip(row, col, !model.hasShip(row, col));
		}
    
    return {
    	toggleShip: toggleShip
    }
};
