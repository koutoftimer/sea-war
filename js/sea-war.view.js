/**
 * Player Board View
 *
 */

Game.PlayerBoardView = function (modelObj, controllerObj) {
	var root = document.createElement('div'),
	    model = modelObj,
	    controller = controllerObj,
	    board = [];
	    
    root.classList.add('player');
    root.classList.add('board');
    root.innerHTML = 'Player ID: ' + model.getPlayerID();
    if (model.getReady()) {
    	root.classList.add('ready');
    }
    
    var init = function () {    	
			for (var row = 0, n = 10; row < n; ++row) {
				board[row] = [];
				
				var divRow = document.createElement('div');
				divRow.classList.add('row');
				root.appendChild(divRow);
				
				// caption
				if (!row)
				{
					var divField = document.createElement('a');
						divField.classList.add('button');
						divField.classList.add('caption');
						divRow.appendChild(divField);
						
					for (var col = 'A'.charCodeAt(0); col <= 'J'.charCodeAt(0); ++col) {
						var divField = document.createElement('a');
							divField.classList.add('button');
							divField.classList.add('caption');
							divField.innerHTML = String.fromCharCode(col);
							divRow.appendChild(divField);
					}
					
					divRow = document.createElement('div');
					divRow.classList.add('row');
					root.appendChild(divRow);
				}
				
				var divField = document.createElement('a');
					divField.classList.add('button');
					divField.classList.add('caption');
					divField.innerHTML = row + 1;
					divRow.appendChild(divField);
				
				// grid
				for (var col = 0; col < n; ++col) {
					divField = document.createElement('a');
					divField.classList.add('button');
					
					board[row][col] = divField;
					board[row][col].row = row;
					board[row][col].col = col;
				
					divRow.appendChild(divField);
				}
			}
		},
		update = function () {
			if (model.getReady()) {
				root.classList.add('ready');
			} else {
				root.classList.remove('ready');
			}
		
			cell = model.getCell();
			
			for (var i = 0, n = 10; i < n; ++i) 
			{
				for (var j = 0; j < n; ++j) 
				{
					board[i][j].className = 'button';
					
					switch (model.getBoard()[i][j]) 
					{
					case cell.validShip:
						board[i][j].classList.add('ship');
						board[i][j].classList.add('validated');
						break;
					case cell.invalidShip:
						board[i][j].classList.add('ship');
						break;
					case cell.waterSplash:
						board[i][j].classList.add('miss');
						break;
					case cell.fire:
						board[i][j].classList.add('fire');
						break;
					}
				}	
			}
		},
		eventHandler = function (e) {
			e.preventDefault();
			controller.toggleShip(model, this.row, this.col);
			board[this.row][this.col].removeEventListener('click', eventHandler);
		},
		subscribeEvents = function () {
			for (var i = 0; i < board.length; ++i) 
				for (var j = 0; j < board[i].length; ++j) 
					board[i][j].addEventListener('click', eventHandler, false);
		},
		unsubscribeEvents = function () {
			for (var i = 0; i < board.length; ++i) 
				for (var j = 0; j < board[i].length; ++j) 
					board[i][j].removeEventListener('click', eventHandler);
		};
		
	init();
	update();
	subscribeEvents();
	
	model.addObserver('updated', update);
	
	return {
		getRoot: function () { return root; },
		unsubscribeEvents: unsubscribeEvents
	}
};

/**
 * Enemy Board View
 *
 */

Game.EnemyBoardView = function (modelObj, controllerObj) {
	var root = document.createElement('div'),
	    model = modelObj,
	    controller = controllerObj,
	    board = [];
	    
    root.classList.add('enemy');
    root.classList.add('board');
    root.innerHTML = 'Player ID: ' + model.getPlayerID();
    if (model.getReady()) {
		root.classList.add('ready');
	}
    
    var init = function () {    	
			for (var row = 0, n = 10; row < n; ++row) {
				board[row] = [];
				
				var divRow = document.createElement('div');
				divRow.classList.add('row');
				root.appendChild(divRow);
				
				// caption
				if (!row)
				{
					var divField = document.createElement('a');
						divField.classList.add('button');
						divField.classList.add('caption');
						divRow.appendChild(divField);
						
					for (var col = 'A'.charCodeAt(0); col <= 'J'.charCodeAt(0); ++col) {
						var divField = document.createElement('a');
							divField.classList.add('button');
							divField.classList.add('caption');
							divField.innerHTML = String.fromCharCode(col);
							divRow.appendChild(divField);
					}
					
					divRow = document.createElement('div');
					divRow.classList.add('row');
					root.appendChild(divRow);
				}
				
				var divField = document.createElement('a');
					divField.classList.add('button');
					divField.classList.add('caption');
					divField.innerHTML = row + 1;
					divRow.appendChild(divField);
				
				// grid
				for (var col = 0; col < n; ++col) {
					divField = document.createElement('a');
					divField.classList.add('button');
					
					board[row][col] = divField;
					board[row][col].row = row;
					board[row][col].col = col;
				
					divRow.appendChild(divField);
				}
			}
		},
		update = function () {
			if (model.getReady()) {
				root.classList.add('ready');
			} else {
				root.classList.remove('ready');
			}
		
			cell = model.getCell();
			
			for (var i = 0, n = 10; i < n; ++i) 
			{
				for (var j = 0; j < n; ++j) 
				{
					board[i][j].className = 'button';
					
					switch (model.getBoard()[i][j]) 
					{
					case cell.waterSplash:
						board[i][j].classList.add('miss');
						break;
					case cell.fire:
						board[i][j].classList.add('fire');
						break;
					}
				}	
			}
		},
		eventHandler = function (e) {
			e.preventDefault();
			controller.toggleShip(model, this.row, this.col);
			board[this.row][this.col].removeEventListener('click', eventHandler);
		},
		subscribeEvents = function () {
			for (var i = 0; i < board.length; ++i) 
				for (var j = 0; j < board[i].length; ++j) 
					if (model.getBoard()[i][j] != model.getCell().waterSplash
						&& model.getBoard()[i][j] != model.getCell().fire)
					{
						board[i][j].addEventListener('click', eventHandler, false);
					}
		},
		unsubscribeEvents = function () {
			for (var i = 0; i < board.length; ++i) 
				for (var j = 0; j < board[i].length; ++j) 
					board[i][j].removeEventListener('click', eventHandler);
		};
		
	init();
	update();
	subscribeEvents();
	
	model.addObserver('updated', update);
	
	return {
		getRoot: function () { return root; },
		subscribeEvents: subscribeEvents,
		unsubscribeEvents: unsubscribeEvents
	}
};















