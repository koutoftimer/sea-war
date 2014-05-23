Game.StateModel = function (id1, id2) {
	var events = [
			'activePlayerChanged'
		],
		eventManager = new Game.EventManager(events)
		playersID = [
			id1 || 0, 
			id2 || 1
		],
		activePlayerIndex = 0,
		getPlayersID = function () {
			return playerID;
		},
		getActivePlayerIndex = function () {
			return activePlayerIndex;
		},
		setActivePlayerIndex = function (index) {
			activePlayerIndex = index;
			eventManager.notifyObservers('activePlayerChanged', index);
		};
		
	return {
		addObserver: eventManager.addObserver,
		removeObserver: eventManager.removeObserver,
		getPlayersID: getPlayersID,
		getActivePlayerIndex: getActivePlayerIndex,
		setActivePlayerIndex: setActivePlayerIndex
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
 
Game.ShipBoardModel = function (playerID) {
	var events = [
			'updated'
		],
		eventManager = new Game.EventManager(events),
		// '.' means empty
		// 's' means invalidated deck site
		// 'S' means validated deck site
			/*board = [
				'sss.s.ssss'.split(''),
				'..........'.split(''),
				'ss.s.s.sss'.split(''),
				'..........'.split(''),
				'ss.ss.s...'.split(''),
				'..........'.split(''),
				'..........'.split(''),
				'..........'.split(''),
				'..........'.split(''),
				'..........'.split('')
			],*/
		board = [
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
		getPlayerID = function () {
			return playerID;
		},
		hasShip = function (i, j) {
			if (i < 0 || i > 9 || j < 0 || j > 9)
			{
				return false;
			}
			return board[i][j] == 's' || board[i][j] == 'S';
		},
		hasValidShip = function (i, j) {
			if (i < 0 || i > 9 || j < 0 || j > 9)
			{
				return false;
			}
			return board[i][j] == 'S';
		},
		shipPatterns = [
			new Game.Ship(1, 4, hasShip, hasValidShip), 
			new Game.Ship(2, 3, hasShip, hasValidShip), 
			new Game.Ship(3, 2, hasShip, hasValidShip), 
			new Game.Ship(4, 1, hasShip, hasValidShip)
		],
		invalidateAll = function () {
			for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j) 
					if (hasValidShip(i, j))
						board[i][j] = 's';
		},
		errors = [new Error('Board is empty.')],
		getErrors = function () {
			return errors;
		},
		hasErrors = function () {
			return errors.length != 0;
		},
		validate = function () {
			invalidateAll();
			
			var matchedShips = new Array(shipPatterns.length);
			
			console.log(matchedShips);
			
			for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j)
					for (var k = 0; k < shipPatterns.length; ++k) 
					{
						var horizontal = shipPatterns[k].hasHorizontalMatch(i, j),
							vertical   = shipPatterns[k].hasVerticalMatch(i, j);
							
						matchedShips[k] = (horizontal || vertical) + matchedShips[k] || 0;
							
						if (horizontal) 
						{
							for (var h = j; h < j + shipPatterns[k].getSize(); ++h)
								board[i][h] = 'S';
						} 
						else if (vertical) 
						{
							for (var v = i; v < i + shipPatterns[k].getSize(); ++v)
								board[v][j] = 'S';
						}
					}
			
			errors = [];
			
			console.log(matchedShips);
			
			for (var i = 0; i < matchedShips.length; ++i)
				if (matchedShips[i] != shipPatterns[i].getNumber())
					errors.push(new Error('Incorrect number of ships size of: ' +
						shipPatterns[i].getSize()));
						
			return errors;
		},
		setShip = function (i, j, value) {
			board[i][j] = value ? 's' : '.';
			validate();
			eventManager.notifyObservers('updated');
		}
	
	return {
		addObserver: eventManager.addObserver,
		removeObserver: eventManager.removeObserver,
		getPlayerID: getPlayerID,
		hasShip: hasShip,
		hasValidShip: hasValidShip,
		getErrors: getErrors,
		hasErrors: hasErrors,
		validate: validate,
		setShip: setShip
	};
};

/**
 * Fires board model
 */

Game.FiresBoardModel = function () {
	var events = [
			'fired'
		],
		eventManager = new Game.EventManager(events),
		// '.' means empty
		// 'f' means ship in fire
		// 'm' means miss
		fires = [
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
		getFire = function (i, j) {
			return fires[i][j];
		},
		setFire = function (i, j, value) {
			fires[i][j] = value;
			eventManager.notifyObservers('fired', {i: i, j: j, value: value});
		};
};


Game.ModelClassic = function () {
	var events = 
		[
			'myBoardChanged',
			'enemyBoardChanged',
			'activePlayerChanged'
		],
		eventManager = new Game.EventManager(events);

	var board = {
			playersID: [0, 1],
			activePlayer: 0, // 0 - I, 1 - enemy
			my: [
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
			enemy: [
				'sss.......'.split(''),
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
			setEnemy: function (i, j, value) {
				var enemy = activePlayer ? board.enemy : board.my;
				enemy[i][j] = value;
				eventManager.notifyObservers('enemyBoardChanged', enemy);
				changeActivePlayer();
			},
			changeActivePlayer: function () {
				board.activePlayer = 1 ^ board.activePlayer;
				eventManager.notifyObservers('activePlayerChanged');
			},
			init: function () {
				eventManager.notifyObservers('activePlayerChanged');
				eventManager.notifyObservers('enemyBoardChanged', board.enemy);
				eventManager.notifyObservers('myBoardChanged', board.enemy);
			}
		};
		
	return {
		addObserver: eventManager.addObserver,
		removeObserver: eventManager.removeObserver,
		init: board.init,
		getBoardMy: function () {
			return board.my;
		},
		getBoardEnemy: function () {
			return board.enemy;
		},
		setEnemy: board.setEnemy
	}
};

