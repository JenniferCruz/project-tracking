
// CLASSES
function Sprint() {
  var self = this;

  self._getStageInfluence = function(factor){
    // there are 8 stages
      return ((100/8)*factor);
  }
  self._stages = ko.observableArray([]);;

  // html template loops through this array to display them all
  self.indicators = ko.observableArray([]);

  self.daysLeft = ko.observable();

  // returns a value from 0 to 100, representing the progress status of the Sprint
  self.progress = ko.computed(function() {
    var progress = 0;
    var totalPoints = 0;
    for (var i=0; i<self._stages().length; i++) {
      var s = self._stages()[i];
      progress += s.complexityPoints() * s.weight;
      totalPoints += s.complexityPoints();
    }
    // TODO: limit number of decimals
    var result = totalPoints != 0 ? progress/totalPoints : 0;
    return result;
  });

  self.update = function(jsonStr) {
    var obj = JSON.parse(jsonStr);
    self._createStages(obj.allStatus);
    self._updateDaysLeft(obj.endDate);
    self._updateComplexityPointsInStages(obj.pointsPerState);
  }

  self._createStages = function(status) {
    // assumes status list comes in chronological order
    if (self._stages().length == 0) {
      for (var i = 0; i < status.length; i++) {
        self._stages.push(
          {label: status[i], complexityPoints: ko.observable(), weight: self._getStageInfluence(i+1)});
      }
      self._registerIndicators();
    }
  }

  self._registerIndicators = function() {
    for (var i = 0; i < self._stages().length; i++) {
      var obj = self._stages()[i];
      self.indicators.push({label: obj.label, value: obj.complexityPoints});
    }
  }

  self._updateComplexityPointsInStages = function(pointsPerState) {
    for (var i = 0; i < self._stages().length; i++) {
      var newValue = pointsPerState[self._stages()[i].label];
      self._stages()[i].complexityPoints(newValue);
    }
  }

  self._updateDaysLeft = function(dueDate) {
    if (!dueDate) {
      // TODO: Is this default ok?
      self.daysLeft(0);
      return;
    }
    self.daysLeft(getDaysUntil(dueDate));
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
