/**
 * Ship board view
 */

Game.ShipsBoardView = function (modelObj, controllerObj) {
	var root = document.createElement('div'),
	    model = modelObj,
	    controller = controllerObj,
	    board = [];
	    
    root.classList.add('ships');
    root.classList.add('board');
    
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
			for (var i = 0, n = 10; i < n; ++i) {
				for (var j = 0; j < n; ++j) {
					if (model.hasShip(i, j)) 
					{
						board[i][j].classList.add('ship');
						
						if (model.hasValidShip(i, j))
							board[i][j].classList.add('validated');
						else 
							board[i][j].classList.remove('validated');
					}
					else 
					{
						board[i][j].classList.remove('ship');
						board[i][j].classList.remove('validated');
					}
				}			
			}
		},
		eventHandler = function (e) {
			e.preventDefault();
			controller.toggleShip(model, this.row, this.col);
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
		getRoot: function () { return root; }
	}
};

/**
 * Ship board buttons widget
 */

Game.ShipBoardButtonsWidget = function (shipModelObj, confirmCallback) {
	var root = document.createElement('div'),
		buttonSetDefaultDecks = document.createElement('a'),
		buttonClear = document.createElement('a'),
		buttonConfirm = document.createElement('a'),
	    model = shipModelObj,
	    buttonSetDefaultDecksHandler = function (e) {
	    	e.preventDefault();
	    	
	    	var board = [
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
			];
			
			for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j)
					if (board[i][j] == 's')
						model.setShip(i, j, true);
	    },
	    buttonClearHandler = function (e) {
	    	e.preventDefault();
	    	
	    	for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j)
					model.setShip(i, j, false);
	    }, 
	    buttonConfirmHandler = function (e) {
	    	e.preventDefault();
	    	
	    	confirmCallback();
	    },
	    update = function () {
	    	if (model.hasErrors())
	    	{
	    		buttonConfirm.classList.add('hide');
	    		buttonConfirm.classList.remove('show');
	    	}
	    	else
	    	{
	    		buttonConfirm.classList.add('show');
	    		buttonConfirm.classList.remove('hide');
	    	}
	    };
	
	root.classList.add('ships')
	root.classList.add('buttons')
	
	buttonSetDefaultDecks.classList.add('button');
	buttonSetDefaultDecks.addEventListener('click', buttonSetDefaultDecksHandler, false);
	buttonSetDefaultDecks.innerHTML = 'Set default';
	root.appendChild(buttonSetDefaultDecks);
	
	buttonClear.classList.add('button');
	buttonClear.addEventListener('click', buttonClearHandler, false);
	buttonClear.innerHTML = 'Clear';
	root.appendChild(buttonClear);
	
	buttonConfirm.classList.add('button');
	buttonConfirm.classList.add('hide');
	buttonConfirm.addEventListener('click', buttonConfirmHandler, false);
	buttonConfirm.innerHTML = 'Confirm';
	root.appendChild(buttonConfirm);
	
	model.addObserver('updated', update);
	
	return {
		getRoot: function () { return root; }
	}
};

/**
 * Ship board errors widget
 */

Game.ShipBoardErrorsWidget = function (shipModelObj) {
	var root = document.createElement('div'),
		model = shipModelObj,
		update = function () {
			root.innerHTML = '';
			
			if (model.hasErrors())
			{
				var errors = model.getErrors();
				for (var i = 0; i < errors.length; ++i)
				{
					var error = document.createElement('div');
					
					error.classList.add('error');
					error.innerHTML = errors[i].message;
					root.appendChild(error);
				}
			}
		};
	
	root.classList.add('ships');
	root.classList.add('errors');
	
	model.addObserver('updated', update);
	
	return {
		getRoot: function () { return root; }
	}
}















