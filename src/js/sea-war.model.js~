/**
 * Person with person game mode model
 *
 */

Game.PVPLocalModeModel = function (id1, id2) {
	var events = [
			'activePlayerChanged',
			'sceneChanded'
		],
		eventManager = new Game.EventManager(events)
		activeSceneIndex = 0,
		sceneOrder = [
			'PlaceShipsScene', 
			'BattleScene',
			'StartScene'
		],
		playersID = [
			id1 || 0, 
			id2 || 1
		],
		activePlayerIndex = 0,
		toggleActivePlayer = function () {
			activePlayerIndex = (activePlayerIndex + 1) % 2;
			eventManager.notifyObservers('activePlayerChanged');
		},
		boards = [],
		getBoard = function (id) {
			if (id == id1) return boards[0];
			if (id == id2) return boards[1];
			throw new Error('unknown id ' + id);
		},
		setBoard = function (id, value) {
			if (id == id1) 
			{
				boards[0] = value;
				activePlayerIndex = 1;
				eventManager.notifyObservers('sceneChanded', sceneOrder[activeSceneIndex]);
			}
			else if (id == id2)
			{
				boards[1] = value;
				activePlayerIndex = 0;
				activeSceneIndex++;
				eventManager.notifyObservers('sceneChanded', sceneOrder[activeSceneIndex]);
			}
			//else throw new Error('unknown id ' + id);
		};
		
	return {
		addObserver: eventManager.addObserver,
		removeObserver: eventManager.removeObserver,
		getActiveScene: function () { return sceneOrder[activeSceneIndex]; },
		getPlayersID: function () { return playersID; },
		getActivePlayerID: function () { return playersID[activePlayerIndex]; },
		getBoard: getBoard,
		setBoard: setBoard,
		toggleActivePlayer: toggleActivePlayer
	}
};

/**
 * Ship helper
 *
 * @param: number Number of ships of current type
 * @param: size   Number of decks
 * @param: hasShip Function with interface <bool(row,col)>
 */
 
Game.Ship = function (number, size, hasShip, hasValidShip) {
	var getNumber = function () {
			return number;
		},
		getSize = function () {
			return size;
		},
		hasHorizontalMatch = function (row, col) {
			for (var i = row - 1; i <= row + 1; ++i)
			{
				for (var j = col - 1; j <= col + size; ++j)
				{
					if (i == row && j >= col && j <= col + size - 1) 
					{
						if (!hasShip(i, j) || hasValidShip(i, j)) 
						{
							return false;
						}
					}
					else if (hasShip(i, j))
					{
						return false;
					}
				}
			}
			
			//console.log('hasHorizontalMatch', row, col, size);
			
			return true;
		},
		hasVerticalMatch = function (row, col) {
			for (var i = row - 1; i <= row + size; ++i)
			{
				for (var j = col - 1; j <= col + 1; ++j)
				{
					if (j == col && i >= row && i <= row + size - 1) 
					{
						if (!hasShip(i, j) || hasValidShip(i, j)) 
						{
							return false;
						}
					}
					else if (hasShip(i, j))
					{
						return false;
					}
				}
			}
			
			//console.log('hasVerticalMatch', row, col, size);
			
			return true;
		},
		hasMatch = function (row, col) {
			return hasHorizontalMatch(row, col) || hasVerticalMatch(row, col);
		};
		
	return {
		getNumber: getNumber,
		getSize: getSize,
		hasMatch: hasMatch,
		hasHorizontalMatch: hasHorizontalMatch, 
		hasVerticalMatch: hasVerticalMatch
	}
};

/**
 * Ship board model
 */
 
Game.BoardModel = function () {
	var board = [
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split(''),
			'..........'.split('')
		],
		cell = {
			empty: '.',
			invalidShip: 's',
			validShip: 'S',
			waterSplash: '-',
			fire: '*'
		};
		
	
		
	return {
		board: board,
		cell: cell
	};
};

/**
 * Player board model
 */

Game.PlayerBoardModel = function (playerID) {
	var board = new Game.BoardModel(),
		ready = false;
	
	board.hasInvalidShips = function () {
		for (var i = 0, n = 10; i < n; ++i)
			if (this.board[i].indexOf(board.cell.invalidShip) != -1)
				return true;
		return false;
	};
	
	var events = [
			'updated'
		],
		eventManager = new Game.EventManager(events),
		hasShip = function (i, j) {
			if (i < 0 || i > 9 || j < 0 || j > 9)
			{
				return false;
			}
			return (board.board[i][j] == board.cell.validShip) 
				|| (board.board[i][j] == board.cell.invalidShip);
		},
		hasValidShip = function (i, j) {
			if (i < 0 || i > 9 || j < 0 || j > 9)
			{
				return false;
			}
			return board.board[i][j] == board.cell.validShip;
		},
		invalidateAll = function () {
			for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j) 
					if (hasValidShip(i, j))
						board.board[i][j] = board.cell.invalidShip;
		},
		errors = [new Error('Board is empty.')],
		shipPatterns = [
			new Game.Ship(1, 4, hasShip, hasValidShip), 
			new Game.Ship(2, 3, hasShip, hasValidShip), 
			new Game.Ship(3, 2, hasShip, hasValidShip), 
			new Game.Ship(4, 1, hasShip, hasValidShip)
		],
		validate = function () {
			invalidateAll();
			
			var matchedShips = new Array(shipPatterns.length);
			
			//console.log('matchedShips', matchedShips);
			
			for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j)
					for (var k = 0; k < shipPatterns.length; ++k) 
					{
						//if (i == 0 && j == 0) 
							//console.log('validate', i, j, k, shipPatterns, matchedShips, board);
					
						var horizontal = shipPatterns[k].hasHorizontalMatch(i, j),
							vertical   = shipPatterns[k].hasVerticalMatch(i, j);
							
						matchedShips[k] = (horizontal || vertical) + (matchedShips[k] || 0);
							
						if (horizontal) 
						{
							for (var h = j; h < j + shipPatterns[k].getSize(); ++h)
								board.board[i][h] = board.cell.validShip;
						} 
						else if (vertical) 
						{
							for (var v = i; v < i + shipPatterns[k].getSize(); ++v)
								board.board[v][j] = board.cell.validShip;
						}
					}
			
			errors = [];
			
			//console.log(matchedShips);
			
			for (var i = 0; i < matchedShips.length; ++i)
				if (matchedShips[i] != shipPatterns[i].getNumber())
					errors.push(new Error('Incorrect number of ships size of: '
						+ shipPatterns[i].getSize()
						+ '. Must be: ' + shipPatterns[i].getNumber() + ', there are: '
						+ matchedShips[i]));
						
			if (board.hasInvalidShips())
				errors.push(new Error('Has invalid ships'));
			
			return errors;
		},
		setShip = function (i, j, value) {
			board.board[i][j] = value;
			validate();
			eventManager.notifyObservers('updated');
		},
		setReady = function (value) {
			ready = value;
			eventManager.notifyObservers('updated');
		}
	
	return {
		addObserver: eventManager.addObserver,
		removeObserver: eventManager.removeObserver,
		getPlayerID: function () { return playerID; },
		getErrors: function () { return errors; },
		hasErrors: function () { return errors.length != 0; },
		hasShip: hasShip,
		hasValidShip: hasValidShip,
		setShip: setShip,
		getCell: function () { return board.cell; },
		getBoard: function () { return board.board; },
		getReady: function () { return ready; },
		setReady: setReady
	};
}

/**
 * Enemy board model
 */

Game.EnemyBoardModel = function (playerID) {
	var firesBoard = new Game.BoardModel(),
		shipsBoard = new Game.PlayerBoardModel(playerID),
		ready = false;
		
	shipsBoard.board = 
	[
				'SSS.S.SSSS'.split(''),
				'..........'.split(''),
				'SS.S.S.SSS'.split(''),
				'..........'.split(''),
				'SS.SS.S...'.split(''),
				'..........'.split(''),
				'..........'.split(''),
				'..........'.split(''),
				'..........'.split(''),
				'..........'.split('')
	];
	
	var events = [
			'updated'
		],
		eventManager = new Game.EventManager(events),
		fire = function (i, j) {
			
			if (shipsBoard.board[i][j] == shipsBoard.getCell().validShip) 
			{
				firesBoard.board[i][j] = firesBoard.cell.fire;
			} 
			else 
			{
				firesBoard.board[i][j] = firesBoard.cell.waterSplash;
			}
			eventManager.notifyObservers('updated');
		},
		setReady = function (value) {
			ready = value;
			eventManager.notifyObservers('updated');
		};
	
	return {
		addObserver: eventManager.addObserver,
		removeObserver: eventManager.removeObserver,
		getPlayerID: function () { return playerID; },
		getCell: function () { return firesBoard.cell; },
		getBoard: function () { return firesBoard.board; },
		setReady: function (value) { ready = value; },
		getReady: function () { return ready; },
		fire: fire,
		getReady: function () { return ready; },
		setReady: setReady
	};
}

