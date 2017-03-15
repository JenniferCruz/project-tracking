// KNOCKOUT VIEW MODEL
var LocationsViewModel = function() {
  // DATA OBJECTS
  this.sprint = new Sprint();
  this.analysis = new Analysis();
  this.code = new Code();

  // TODO: * give better names... like 'sprintIsOk' but more generic
  this.isIdeal = function () {
      return !this.analysis.failed() && (this.sprint.isExpectedProgress() || this.sprint.isTooEarly()) && this.code.isIdeal();
  };

  this.isOk = function () {
      // TODO: * When is too early... how should be categorize: ok or ideal?
      // TODO: * Shoould we also have a isTooEarly ('white default') for the other boards as for Sprint?
      return !this.analysis.failed() &&
          (this.sprint.isExpectedProgress() || this.sprint.isOKProgress() || this.sprint.isTooEarly()) &&
          (this.code.isIdeal() || this.code.isOk());
  };

  this.isBad = function () {
      return this.analysis.failed() || this.sprint.isBadProgress() || this.code.isBad();
  };

  this.isCritical = function () {
      return this.analysis.failed() || this.sprint.isInDangerProgress() || this.code.isInDanger();
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
