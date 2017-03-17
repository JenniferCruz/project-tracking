// KNOCKOUT VIEW MODEL
var LocationsViewModel = function() {
  // DATA OBJECTS
  var self = this;
  self.sprint = new Sprint();
  self.analysis = new Analysis();
  self.code = new Code();
    self.projectStats = {
      isIdeal: ko.computed(function () {
          return !self.analysis.failed() && (self.sprint.isExpectedProgress() || self.sprint.isTooEarly()) && self.code.isIdeal();
      }),
      isOk: ko.computed(function () {
          // TODO: * When is too early... how should be categorize: ok or ideal?
          // TODO: * Should we also have a isTooEarly ('white default') for the other boards as for Sprint?
          return !self.analysis.failed() &&
              (self.sprint.isExpectedProgress() || self.sprint.isOKProgress() || self.sprint.isTooEarly()) &&
              (self.code.isIdeal() || self.code.isOk());
      }),
      isBad: ko.computed(function () {
          return self.analysis.failed() || self.sprint.isBadProgress() || self.code.isBad();
      }),
      isCritical: ko.computed(function () {
          return self.analysis.failed() || self.sprint.isInDangerProgress() || self.code.isInDanger();
      })
  };


};

var viewModel = new LocationsViewModel();
ko.applyBindings(viewModel);

// TODO: remove these when ready
viewModel.sprint.update(jsonSprint);
viewModel.analysis.update(jsonJenkins);
viewModel.code.update(jsonSonar);

// setInterval(function(){
//      // TODO: * What are the request URLs?
//    $.get('...', function(data){
//        // ....
//        viewModel.sprint.update(data);
//    });
//
//    $.get('...', function(data){
//        // ....
//        viewModel.analysis.update(data);
//    });
//
//    $.get('...', function(data){
//        // ....
//        viewModel.code.update(data);
//    });
//
//  }, 100); // TODO: * what should be a good timing?

document.addEventListener('DOMContentLoaded', function() {
    var flip = document.getElementById('flip');
    setInterval(function () {
        flip.classList.toggle('flipping');
    }, 8000); // TODO: * Is this timing good?
});

// TODO: ! Implement 'snapshots'
