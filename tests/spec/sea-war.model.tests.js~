describe('Game.ShipBoardModel.', function () {
	
	
	xdescribe('Check ship placing.', function () {
		var model = new Game.ShipBoardModel();
	
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
			],
			tester = function (i, j) {
				var caption = 'i: ' + i + ', j:' + j + ' ';
			
				it(caption, function () 
				{
					expect(model.hasShip(i, j))
						.toBe(board[i][j] == 's');
				});
			};
			
		for (var i = 0, n = 10; i < n; ++i)
			for (var j = 0; j < n; ++j)
				model.setShip(i, j, board[i][j] == 's');
					
		for (var i = 0, n = 10; i < n; ++i)
			for (var j = 0; j < n; ++j) 
				tester(i, j);
	});
	
	
	describe('Check ship validation.', function () {
		var model = new Game.ShipBoardModel();
		
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
				model.setShip(i, j, board[i][j] == 's');
				
		it('Defaul deck placing', function () {
			expect(model.hasErrors()).toEqual(false);
		});
	})
})
