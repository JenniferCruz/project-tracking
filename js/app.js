
// CLASSES
function SprintIndicator(name, value) {
  this.lable = ko.observable(name);
  this.value = ko.observable(value);
  return this;
}

function Sprint() {
  // NOT SURE ABOUT THIS OBJ
  // this.status = {
  //   readyForQA: ko.observable(),
  //   toDo: ko.observable();
  //   done: ko.observable();
  //   readyForSignOff: ko.observable();
  //   inDev: ko.observable();
  //   codeReview: ko.observable();
  //   inQA: ko.observable();
  //   deskCheck: ko.observable();
  // }
  var self = this;
  self.indicators = ko.observableArray([]);
  self.progress = ko.computed(function() {
    // TODO:
  });
  self.updateSprintIndicators = function(jsonStr) {
    // TODO:
  }
}


//

// KNOCKOUT VIEW MODEL
var LocationsViewModel = function() {
  var self = this;

  // DATA OBJECTS
  // TODO: Encapsulate all sprint-related things in its own class
  self.sprintIndicators = ko.observableArray([new SprintIndicator('loading','...')]); // placeholder
  self.sprintProgress = ko.observable(0);
  // BEHAVIOUR
  self.updateSprintIndicators = function(jsonStr) {
    self.sprintIndicators.removeAll();

    var obj = JSON.parse(jsonStr);
    for (var label in obj.statusCount) {
      var value = obj.statusCount[label];
      self.sprintIndicators.push(new SprintIndicator(label, value));
    }

    self.sprintProgress(90); // TODO: create function to calculate real progress
  }

  self.getSprintStatus = ko.computed(function(){
    if (self.sprintProgress() < 25)
      return 1;
    if (self.sprintProgress() < 50)
      return 2;
    if (self.sprintProgress() < 75)
      return 3;
    return 4;
  });


};

var viewModel = new LocationsViewModel();
ko.applyBindings(viewModel);

viewModel.updateSprintIndicators(theJsonFile);
 // setInterval(function(){
 //   console.log(theJsonFile);
 //   viewModel.updateSprintIndicators(theJsonFile);
 // }, 100); // TODO: Increase time to reasonable production value
