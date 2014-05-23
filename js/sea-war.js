Game = function (wrapperQuery) {
    var root = document.querySelector(wrapperQuery);
    
    this.init = function () {
    	var // player 1
    		shipModel1 = new Game.ShipBoardModel(1),
    		shipController1 = new Game.PersonShipController(),
    		shipView1 = new Game.ShipsBoardView(shipModel1, shipController1),
    		shipButtons = new Game.ShipBoardButtonsWidget(shipModel1);
    		shipErrors = new Game.ShipBoardErrorsWidget(shipModel1);
    		
    	root.appendChild(shipView1.getRoot());
    	root.appendChild(shipButtons.getRoot());
    	root.appendChild(shipErrors.getRoot());
    }
    
    return this;
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



















