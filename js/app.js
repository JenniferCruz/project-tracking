
// CLASSES
function Sprint() {
  var self = this;

  self._getStageInfluence = function(factor){
    // there are 8 stages
      return ((100/8)*factor);
  }
  self._stages = {
    'To Do': {complexityPoints: ko.observable(), weight: self._getStageInfluence(1)},
    'In Dev': {complexityPoints: ko.observable(), weight: self._getStageInfluence(2)},
    'Code Review': {complexityPoints: ko.observable(), weight: self._getStageInfluence(3)},
    'Desk Check': {complexityPoints: ko.observable(), weight: self._getStageInfluence(4)},
    'Ready for QA': {complexityPoints: ko.observable(), weight: self._getStageInfluence(5)},
    'In QA': {complexityPoints: ko.observable(), weight: self._getStageInfluence(6)},
    'Ready for Sign Off': {complexityPoints: ko.observable(), weight: self._getStageInfluence(7)},
    'Done': {complexityPoints: ko.observable(), weight: self._getStageInfluence(8)}
  }

  // html template loops through this array to display them all
  self.indicators = ko.observableArray([]);
  for (var stageName in self._stages) {
    self.indicators.push({label: stageName, value: self._stages[stageName].complexityPoints});
  }

  self.daysLeft = ko.observable();

  // returns a value from 0 to 100, representing the progress status of the Sprint
  self.progress = ko.computed(function() {
    var progress = 0;
    var totalPoints = 0;
    for (var stage in self._stages) {
      var s = self._stages[stage];
      progress += s.complexityPoints() * s.weight;
      totalPoints += s.complexityPoints();
    }
    // TODO: limit number of decimals
    return totalPoints != 0 ? progress/totalPoints : 0;
  });

  self.update = function(jsonStr) {
    var obj = JSON.parse(jsonStr);
    self.daysLeft(obj.daysLeft);
    for (var label in obj.statusCount) {
      var newValue = obj.statusCount[label];
      self._stages[label].complexityPoints(newValue);
    }
  }

  return self;
}


//

// KNOCKOUT VIEW MODEL
var LocationsViewModel = function() {
  // DATA OBJECTS
  this.sprint = new Sprint();


};

var viewModel = new LocationsViewModel();
ko.applyBindings(viewModel);

viewModel.sprint.update(theJsonFile);
 // setInterval(function(){
 //   console.log(theJsonFile);
 //   viewModel.updateSprintIndicators(theJsonFile);
 // }, 100); // TODO: Increase time to reasonable production value

// TODO: Implement 'snapshots'
// TODO: Color progress bar according to spring date. Will receive 'total days' ad 'days left' in JSON.
//       At first, bar is monochromatic.
//       The less the days left, the more likely the bar is colored badly if % is below an expected range.
//         ideal: over expected; ok: expected - 10%; bad: ok - 15%; danger-zone: >bad;
// TODO: Implement 'short view' of sprint. It should consist of:
         // NOT STARTED: 10 complexityPoints - (show if > 0)
         // DONE: 0 - (includes RSO and Done)
         // Almost there: 8 - (includes RQA and IQA)
         // Out of / TOTAL: 22
         // Progress bar
         // OR
         // SPRING COMPLETION: 45%
         // DAYS LEFT: 4
