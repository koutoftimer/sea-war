Game.PersonShipController = function () 
{
    var toggleShip = function (model, row, col) {
    		var cell = model.getCell();
			model.setShip(row, col, !model.hasShip(row, col) ? cell.invalidShip : cell.empty);
		},
		confirmCallback = function (model) {
			Game().gameMode.setBoard(model.getPlayerID(), model.getBoard());
		}
    
    return {
    	toggleShip: toggleShip,
    	confirmCallback: confirmCallback
    }
}

Game.BattleEnemyBoardController = function () 
{
	var fire = function (model, row, col) {
			model.fire(row, col);
			Game().gameMode.toggleActivePlayer();
		};
	
	return {
		toggleShip: fire
	}
}
