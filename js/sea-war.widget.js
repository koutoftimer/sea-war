/**
 * Ship board buttons widget
 *
 */

Game.ShipBoardButtonsWidget = function (shipModelObj, controllerObj) {
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
			
			for (var i = 0, n = 10, cell = model.getCell(); i < n; ++i)
				for (var j = 0; j < n; ++j)
					if (board[i][j] == 's')
						model.setShip(i, j, cell.validShip);
	    },
	    buttonClearHandler = function (e) {
	    	e.preventDefault();
	    	
	    	for (var i = 0, n = 10; i < n; ++i)
				for (var j = 0; j < n; ++j)
					model.setShip(i, j, model.getCell().empty);
	    }, 
	    buttonConfirmHandler = function (e) {
	    	e.preventDefault();
	    	
	    	controllerObj.confirmCallback(model);
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
 *
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

