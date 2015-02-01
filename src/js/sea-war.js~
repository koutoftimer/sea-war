Game = function (wrapperQuery) {
	if (arguments.callee._singletoneInstance)
		return arguments.callee._singletoneInstance;
		
	arguments.callee._singletoneInstance = this;

	//this._gameMode = undefined;

    var self = this,
    	root = document.querySelector(wrapperQuery),
    	changeScene = function (scene) {
			root.innerHTML = '';
			root.appendChild(scene.getRoot());
		},
		sceneChandedHandler = function (scene) {
			//console.log('Scene changed to '+scene, 'Game mode ', self.gameMode.getActivePlayerID());
			if (scene == 'PlaceShipsScene') changeScene(new Game.PlaceShipsScene(self.gameMode.getActivePlayerID()));
			else if (scene == 'BattleScene') changeScene(new Game.BattleScene());
			else if (scene == 'StartScene') changeScene(new Game.StartScene());
		};
    
    this.start = function () {
    	changeScene(new Game.StartScene());
    }
    
    this.setGameMode = function (mode) {
    	self.gameMode = mode;
    	self.gameMode.addObserver('sceneChanded', sceneChandedHandler);
    	sceneChandedHandler(self.gameMode.getActiveScene());
    }
};

Game.EventManager = function (events) {
    var groups = { };
    
    var addEvent = function(event) {
        if (groups.hasOwnProperty(event)) {
            throw new Error('addEvent: Already an event named "'+event+'"');
        }
        
        groups[event] = [];
    };

    var addObserver = function(event, observer) {
        if (!groups.hasOwnProperty(event)) {
            throw new Error('addObserver: No event "'+event+'".');
        }
        
        if (typeof observer != 'function') {
        	throw new Error('addObserver: Observer is not a function object');
        }
        
        var group = groups[event];
        for (var i = 0, n = group.length; i < n; i++) {
            if (group[i] === observer) {
                throw new Error('Cannot add the same listener more than once.');
            }
        }
        group.push(observer);
    };
    
    var removeObserver = function(event, observer) {
        if (!groups.hasOwnProperty(event)) {
            throw new Error('removeObserver: No event "'+event+'".');
        }
        
        if (typeof observer != 'function') {
        	throw new Error('addObserver: Observer is not a function object');
        }
        
        var group = groups[event];
        for (var i = 0, n = group.length; i < n; i++) {
            if (group[i] === observer) {
                group.splice(i, 1);
                return;
            }
        }
        throw new Error('removeObserver: Did not find the observer and so'
        				+ 'could not remove it.');
    };
    
    var notifyObservers = function(event, data) {
        if (!groups.hasOwnProperty(event)) {
            throw new Error('notifyObservers: No event "'+event+'".');
        }
        var group = groups[event];
        for (var i = 0, n = group.length; i < n; i++) {
            group[i](data);
        }
    };
    
    // initialize
    for (var i = 0, n = events.length; i < n; i++) {
        var event = events[i];
        addEvent(event);
    };

    return {
        addEvent: addEvent,
        addObserver: addObserver,
        removeObserver: removeObserver,
        notifyObservers: notifyObservers
    };
};



















