Game.StartScene = function () {
	var root = document.createElement('div');

	var buttonStart = document.createElement('a');
		buttonStart.classList.add('button');
		buttonStart.innerHTML = 'Start game';
		buttonStart.addEventListener('click', function (e) {
			//Game().gameMode = new PVPLocalModeModel();
			//Game().changeScene(Game.PlaceShipsScene());
			Game().setGameMode(new Game.PVPLocalModeModel(1, 2));
		}, false);
		root.appendChild(buttonStart);
	
	return {
		getRoot: function () { return root; }
	};
}

Game.PlaceShipsScene = function (playerID) {
	var root = document.createElement('div');

	var playerShipModel = new Game.PlayerBoardModel(playerID),
		playerShipController = new Game.PersonShipController(),
		playerShipView = new Game.PlayerBoardView(playerShipModel, playerShipController),
		shipButtons = new Game.ShipBoardButtonsWidget(playerShipModel, playerShipController),
		shipErrors = new Game.ShipBoardErrorsWidget(playerShipModel);

	root.appendChild(playerShipView.getRoot());
	root.appendChild(shipButtons.getRoot());
	root.appendChild(shipErrors.getRoot());
		
	return {
		getRoot: function () { return root; }
	};
}

Game.BattleScene = function () {
	var root = document.createElement('div'),
		playersID = Game().gameMode.getPlayersID(),
		activePlayerID = Game().gameMode.getActivePlayerID();
	
	
	
	var divPlayerBoard = document.createElement('div'),
		divPlayerCaption = document.createTextNode(''),
		playerShipModel = new Game.EnemyBoardModel(playersID[0]),
		battleShipController = new Game.BattleEnemyBoardController(),
		playerShipView = new Game.EnemyBoardView(playerShipModel, battleShipController);
		
	divPlayerBoard.classList.add('player');
	divPlayerBoard.appendChild(divPlayerCaption);
	if (activePlayerID == playersID[0])
	{
		divPlayerCaption.innerHTML = 'Your turn';
		playerShipView.unsubscribeEvents();
	}
	divPlayerBoard.appendChild(playerShipView.getRoot());
	root.appendChild(divPlayerBoard);



	var divEnemyBoard = document.createElement('div'),
		divEnemyCaption = document.createTextNode(''),
		enemyShipModel = new Game.EnemyBoardModel(playersID[1]),
		enemyShipViews = new Game.EnemyBoardView(enemyShipModel, battleShipController);
	
	divEnemyBoard.classList.add('enemy');
	divPlayerBoard.appendChild(divPlayerCaption);
	if (activePlayerID == playersID[1])
	{
		divPlayerCaption.innerHTML = 'Your turn';
		divEnemyBoard.appendChild(divEnemyCaption);
		playerShipView.unsubscribeEvents();
	}
	divEnemyBoard.appendChild(enemyShipViews.getRoot());
	root.appendChild(divEnemyBoard);
	
	
	var activePlayerChangedHandler = function () {
		playersID = Game().gameMode.getPlayersID(),
		activePlayerID = Game().gameMode.getActivePlayerID();
		
		if (activePlayerID == playersID[0])
		{
			divPlayerCaption.innerHTML = 'Your turn';
			divPlayerCaption.innerHTML = '';
			playerShipView.unsubscribeEvents();
			enemyShipViews.subscribeEvents();
			playerShipModel.setReady(true);
			enemyShipModel.setReady(false);
		}
		else
		{
			divPlayerCaption.innerHTML = '';
			divPlayerCaption.innerHTML = 'Your turn';
			playerShipView.subscribeEvents();
			enemyShipViews.unsubscribeEvents();
			playerShipModel.setReady(false);
			enemyShipModel.setReady(true);
		}
	}
	Game().gameMode.addObserver('activePlayerChanged', activePlayerChangedHandler);
	
	return {
		getRoot: function () { return root; }
	};
}
























