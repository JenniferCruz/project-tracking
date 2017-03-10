
// CLASSES
function Sprint() {
  var self = this;

  // DATA
  self.stages = ko.observableArray([]);;
  self.daysLeft = ko.observable();

  // returns a value from 0 to 100, representing the progress status of the Sprint
  self.progress = ko.computed(function() {
    var progress = 0;
    var totalPoints = 0;
    for (var i=0; i<self.stages().length; i++) {
      var s = self.stages()[i];
      progress += s.complexityPoints() * s.weight;
      totalPoints += s.complexityPoints();
    }
    // TODO: limit number of decimals
    var result = totalPoints != 0 ? progress/totalPoints : 0;
    return result;
  });

  // BEHAVIOR
  self.update = function(jsonStr) {
    var obj = JSON.parse(jsonStr);
    self._createStages(obj.allStatus);
    self._updateDaysLeft(obj.endDate);
    self._updateComplexityPointsInStages(obj.pointsPerState);
  }

  self._createStages = function(status) {
    // assumes status list comes in chronological order
    if (self.stages().length == 0)
      for (var i = 0; i < status.length; i++)
        self.stages.push({label: status[i],
                          complexityPoints: ko.observable(),
                          weight: self._getStageInfluence(i+1)});
  }

  self._updateDaysLeft = function(dueDate) {
    if (!dueDate) {
      self.daysLeft(0); // TODO: Is this default ok?
      return;
    }
    self.daysLeft(getDaysBetween(Date.now(), dueDate));
  }

  self._updateComplexityPointsInStages = function(pointsPerState) {
    for (var i = 0; i < self.stages().length; i++) {
      var stage = self.stages()[i];
      var newValue = pointsPerState[stage.label];
      stage.complexityPoints(newValue);
    }
  }

  self._getStageInfluence = function(factor){
    var stagesNumber = 8;
    return ((100/stagesNumber)*factor);
  }

  return self;
}

var getDaysBetween = function(fromDate, toDate) {
  // TODO: Do you wanna have 'decimal' days?
  var miliSecMinDaysProduct = (1000 * 60 * 60 * 24);
  return Math.round(Math.abs((toDate - fromDate) / miliSecMinDaysProduct));
}

// measures progress in relation to current date
// helps determines progress bar color
function SprintChecker(sprint) {
  // TODO: Color progress bar according to spring date. Will receive 'total days' and 'days left' in JSON.
  //       At first, bar is monochromatic.
  //       The less the days left, the more likely the bar is colored badly if % is below an expected range.
  //         ideal: over expected; ok: expected - 10%; bad: ok - 15%; danger-zone: >bad;
  //         so for example, if a sprint is almost done and % is low, should look warm
  var self = this;
  // status should be in range [1, 4],
  // where 1: In danger; 2: bad; 3: ok; 4 ideal;
  // 0 is default, to indicate is still too early to estimate
  self._status = ko.observable(0);
  self.isAsExpected = ko.computed(function() {
    return self._status() == 4;
  });
  self.isOK = ko.computed(function() {
    return self._status() == 3;
  });
  self.isBad = ko.computed(function() {
    return self._status() == 2;
  });
  self.isInDanger = ko.computed(function() {
    return self._status() == 1;
  });

  self.check = function(startDate, dueDate){
    var expected = self._getExpectedProgress(startDate, dueDate); // is scope right?
    if(self._isNotTooEarly())
      self._updateStatus(sprint.progress() - expected);
  };

  self._updateStatus = function(progressDiff){
    if (progressDiff >= 0) {
        self._status(4);
    } else {
      // TODO: Is this convention convenient for project management?
      progressDiff = Math.abs(progressDiff);
      if (progressDiff < 10)
        self._status(3);
      else if (progressDiff < 25)
        self._status(2);
      else
        this._status(1);
    }
  };

  self._getExpectedProgress = function(startDate, endDate) {
    var sprintLength = getDaysBetween(startDate, dueDate);
    var remainingDays = getDaysBetween(Date.now(), dueDate);
    return (sprintLength - remainingDays) / sprintLength;
  };

  self._isNotTooEarly = function(startDate, endDate) {
    var sprintLength = getDaysBetween(startDate, dueDate);
    var daysPassed = getDaysBetween(startDate, Date.now());
    return (daysPassed/sprintLength) > 0.25;
  }

  return self;
}


// KNOCKOUT VIEW MODEL
var LocationsViewModel = function() {
  // DATA OBJECTS
  this.sprint = new Sprint();
  this.sprintChecker = new SprintChecker(this.sprint);


};

var viewModel = new LocationsViewModel();
ko.applyBindings(viewModel);

viewModel.sprint.update(jsonSprint);
 // setInterval(function(){
//    $.get('...', function(){...});
 //   console.log(theJsonFile);
 //   viewModel.updateSprintIndicators(theJsonFile);
 // }, 100); // TODO: Increase time to reasonable production value

// TODO: Implement 'snapshots'
// TODO: Implement 'short view' of sprint. It should consist of:
         // NOT STARTED: 10 complexityPoints - (show if > 0)
         // DONE: 0 - (includes RSO and Done)
         // Almost there: 8 - (includes RQA and IQA)
         // Out of / TOTAL: 22
         // Progress bar
         // OR
         // SPRING COMPLETION: 45%
         // DAYS LEFT: 4e
// TODO: Background imag should be displayed according to an avrg of all boards, not just sprint's
