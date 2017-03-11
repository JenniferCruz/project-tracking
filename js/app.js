
// CLASSES
function Sprint() {
  var self = this;
  // DATA
  self.stages = ko.observableArray([]);;
  self.daysLeft = ko.observable();
// sprint status:
    //  0: is too early to tell
    //  1: sprint is in danger
    //  2: sprint is progressing at slower pace than expected
    //  3: sprint is at an acceptable progress
    //  4: sprint progresses as expected or better
    // The status is updated according to current date, sprint duration, and sprint progress
    // This status will be the base to determine progress bar colors
  self.status = 0;
  self._calendar;

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
    if (!self._calendar)
      self._calendar = new Calendar(obj.startDate, obj.endDate);
    self._createStages(obj.allStatus);
    self._updateDaysLeft(obj.endDate);
    self._updateComplexityPointsInStages(obj.pointsPerState);
    self._updateStatus();
  };

  self.isExpectedProgress = ko.computed(function() {
    return self.status == 4;
  });
  self.isOKProgress = ko.computed(function() {
    return self.status == 3;
  });
  self.isBadProgress = ko.computed(function() {
    return self.status == 2;
  });
  self.isInDangerProgress = ko.computed(function() {
    return self.status == 1;
  });


  self._createStages = function(status) {
    // assumes status list comes in chronological order
    if (self.stages().length == 0)
      for (var i = 0; i < status.length; i++)
        self.stages.push({label: status[i],
                          complexityPoints: ko.observable(),
                          weight: self._getStageInfluence(i+1)});
  };

  self._updateDaysLeft = function(dueDate) {
    if (!dueDate) {
      self.daysLeft(0); // TODO: Is this default ok?
      return;
    }
    self.daysLeft(self._calendar.getDaysBetween(self._calendar._start, self._calendar._end));
  };

  self._updateComplexityPointsInStages = function(pointsPerState) {
    for (var i = 0; i < self.stages().length; i++) {
      var stage = self.stages()[i];
      var newValue = pointsPerState[stage.label];
      stage.complexityPoints(newValue);
    }
  };

  self._getStageInfluence = function(factor){
    var stagesNumber = 8;
    return ((100/stagesNumber)*factor);
  };

  self._updateStatus = function(){
      if(self._calendar.isNotTooEarly()) {
          var expected = self._calendar.progress();
          self._changeStatus(self.progress() - expected);
      }
  };

  self._changeStatus = function(progressDiff){
      if (progressDiff >= 0) {
          self.status = 4;
      } else {
          // TODO: Is this convention convenient for project management?
          progressDiff = Math.abs(progressDiff);
          if (progressDiff < 10)
              self.status = 3;
          else if (progressDiff < 25)
              self.status = 2;
          else
              this.status = 1;
      }
  };

  return self;
}

function Calendar(from, to) {
  var self = this;

  self._start = from;
  self._end = to;

  self.getDaysBetween = function(fromDate, toDate) {
        // TODO: Do you wanna have 'decimal' days?
        var miliSecMinDaysProduct = (1000 * 60 * 60 * 24);
        toDate = toDate? toDate: to;
        fromDate = fromDate ? fromDate : fromDate;
        return Math.round(Math.abs((toDate - fromDate) / miliSecMinDaysProduct));
  };

  self.isNotTooEarly = function() {
      var sprintLength = self.getDaysBetween(self._start, self._end);
      var daysPassed = self.getDaysBetween(self._start, Date.now());
      return (daysPassed/sprintLength) > 0.25;
  };

  self.progress = function () {
      var sprintLength = self.getDaysBetween(self._start, self._end);
      var remainingDays = self.getDaysBetween(Date.now(), self._end);
      return ((sprintLength - remainingDays) / sprintLength) * 100;
  };

  return self;
}


// KNOCKOUT VIEW MODEL
var LocationsViewModel = function() {
  // DATA OBJECTS
  this.sprint = new Sprint();


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
