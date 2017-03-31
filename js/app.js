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
            return self.statusAvr() >= 3 && self.statusAvr() < 4;
        }),
        isBad: ko.computed(function () {
            return self.statusAvr() >= 2 && self.statusAvr() < 3;
        }),
        isCritical: ko.computed(function () {
            return self.statusAvr() < 2;
        })
    };

    self.update = function () {
        // DEV: setTimeOuts simulate ajax requests
        setTimeout(function () {
            self.sprint = new Sprint();
        },50);
        setTimeout(function () {
            self.analysis = new Analysis();
        },50);

        Promise.all(
            setTimeout(function () {return {a: 'placeholder content'};},50), setTimeout(function() {return {b: 'placeholder content too'}}, 50)
        ).then(function (jenkinsData, sonnarData) {
            var data = mergeJSON(jenkinsData, sonnarData);
            self.code = new Code(data);
        });

        // PRODUCTION
        // TODO: Add proper request URLs
        //    $.get('...', function(data){
        // ....
        // viewModel.sprint.update(data);
        // });
        //
        // $.get('...', function(data){
        // ....
        // viewModel.analysis.update(data);
        // });
        //    $.get('...', function(data){
        // ....
        // viewModel.code.update(data);
        // });
    };

    self.updateCode = function(jsonSonar, jsonJenkins) {
        Promise.all(
            setTimeout(function () {return jsonSonar;},50), setTimeout(function() {return jsonJenkins}, 50)
        ).then(function (jenkinsData, sonnarData) {
            var data = mergeJSON(jenkinsData, sonnarData);
            self.code = new Code(data);
        });
    }


};

function mergeJSON(json1, json1) {
    var result = {};
    for(var key in json1)
        result[key] = json1[key];
    for(var key in json2)
        result[key] = json2[key];
    return result;
}

// COMMENT OUT FOR TESTING
// var viewModel = new LocationsViewModel();
// ko.applyBindings(viewModel);
//
// setInterval(function(){
//     viewModel.update();
//  }, 100); // TODO: Add a proper timing?
// document.addEventListener('DOMContentLoaded', function () {
//     var flip = document.getElementById('flip');
//     setInterval(function () {
//         flip.classList.toggle('flipping');
//     }, 8000);
// });

// TODO: ! Implement 'snapshots'
