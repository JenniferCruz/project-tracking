// KNOCKOUT VIEW MODEL
var LocationsViewModel = function () {
    // DATA OBJECTS
    var self = this;
    self.sprint = new Sprint();
    self.analysis = new Analysis();
    self.code = new Code();

    // TODO: Refactor these functions to worth with 'grades' instead of if/else
    self.statusAvr = ko.computed(function () {
        return (self.sprint.status() + self.analysis.status() + self.code.status())/3;
    });
    self.projectStats = {
        isIdeal: ko.computed(function () {
            return self.statusAvr() === 4;
        }),
        isOk: ko.computed(function () {
            // TODO: * When is too early... how should be categorize: ok or ideal? >> IDEAL
            return self.statusAvr() >= 3 && self.statusAvr() < 4;
        }),
        isBad: ko.computed(function () {
            return self.statusAvr() >= 2 && self.statusAvr() < 3;
        }),
        isCritical: ko.computed(function () {
            return self.statusAvr() < 2;
        })
    };
};

var viewModel = new LocationsViewModel();
ko.applyBindings(viewModel);

// TODO: refactor to use Promises and proper AJAX
viewModel.sprint.update(jsonSprint);
viewModel.analysis.update(jsonSprint);
viewModel.code.update(jsonJenkins);
viewModel.code.update(jsonSonar);

document.addEventListener('DOMContentLoaded', function () {
    var flip = document.getElementById('flip');
    setInterval(function () {
        flip.classList.toggle('flipping');
    }, 8000);
});

// TODO: ! Implement 'snapshots'
