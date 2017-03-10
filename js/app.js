
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
    self.daysLeft(getDaysUntil(dueDate));
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

var getDaysUntil = function(date) {
  var now = Date.now();
  // TODO: Do you wanna have 'decimal' days?
  return Math.round(Math.abs((date - now) / (1000 * 60 * 60 * 24)));
}
//

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
// TODO: Color progress bar according to spring date. Will receive 'total days' ad 'days left' in JSON.
//       At first, bar is monochromatic.
//       The less the days left, the more likely the bar is colored badly if % is below an expected range.
//         ideal: over expected; ok: expected - 10%; bad: ok - 15%; danger-zone: >bad;
//         so for example, if a sprint is almost done and % is low, should look warm
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
