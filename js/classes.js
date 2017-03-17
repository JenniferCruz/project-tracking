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
    // This status will be the base to determine progress bar colors
    self.status = ko.observable(0);
    self._calendar;

    self.progress = ko.computed(function() {
        // returns a value from 0 to 100, representing the progress status of the Sprint
        var progress = 0;
        var totalPoints = 0;
        for (var i=0; i<self.stages().length; i++) {
            var s = self.stages()[i];
            progress += s.complexityPoints() * s.weight;
            totalPoints += s.complexityPoints();
        }
        return totalPoints != 0 ? (progress/totalPoints).toFixed(1) : 0;
    });

    // BEHAVIOR
    self.update = function(jsonStr) {
        var obj = JSON.parse(jsonStr);
        if (!self._calendar)
            self._calendar = new Calendar(obj.startDate, obj.endDate);

        self._createStages(obj.allStatus);
        self.daysLeft(self._calendar.getDaysLeft());
        self._updateComplexityPointsInStages(obj.pointsPerState);
        self._updateStatus();
    };

    // Functions used by UI's prgress bar for styles
    self.isExpectedProgress = ko.computed(function() {
        return self.status() === 4;
    });
    self.isOKProgress = ko.computed(function() {
        return self.status() === 3;
    });
    self.isBadProgress = ko.computed(function() {
        return self.status() === 2;
    });
    self.isInDangerProgress = ko.computed(function() {
        return self.status() === 1;
    });
    self.isTooEarly = ko.computed(function() {
        return self.status() === 0;
    });


    self._createStages = function(status) {
        // assumes status list comes in chronological order
        if (self.stages().length == 0)
            for (var i = 0; i < status.length; i++)
                self.stages.push({label: status[i],
                    complexityPoints: ko.observable(),
                    weight: self._getStageInfluence(i+1)});
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
        // The status is updated according to current date, sprint duration, and sprint progress
        if(!self._calendar.isTooEarly()) {
            var expected = self._calendar.progress();
            self._changeStatus(self.progress() - expected);
        }
    };

    self._changeStatus = function(progressDiff){
        if (progressDiff >= 0) {
            self.status(4);
        } else {
            // TODO: * This is how you want to decide the status?
            progressDiff = Math.abs(progressDiff);
            if (progressDiff < 10)
                self.status(3);
            else if (progressDiff < 25)
                self.status(2);
            else
                self.status(1);
        }
    };

    return self;
}

function Calendar(from, to) {
    var self = this;

    self._start = from;
    self._end = to;

    self.getDaysLeft = function () {
        return self.getDaysBetween(Date.now(), self._end);
    };

    self.getDaysBetween = function(fromDate, toDate) {
        // TODO: * Do you wanna have 'decimal' days?
        var miliSecMinDaysProduct = (1000 * 60 * 60 * 24);
        toDate = toDate? toDate: to;
        return Math.round(Math.abs((toDate - fromDate) / miliSecMinDaysProduct));
    };

    self.isTooEarly = function() {
        var sprintLength = self.getDaysBetween(self._start, self._end);
        if(Date.now() - self._start < 0)
            return false;
        var daysPassed = self.getDaysBetween(self._start, Date.now());
        return (daysPassed/sprintLength) < 0.25;
    };

    self.progress = function () {
        var sprintLength = self.getDaysBetween(self._start, self._end);
        var remainingDays = self.getDaysBetween(Date.now(), self._end);
        return ((sprintLength - remainingDays) / sprintLength) * 100;
    };

    return self;
}


function Analysis() {
    var self = this;

    self.health = ko.observable();
    self.healthBase = 40; // TODO: * Supply the real base
    self.failed = ko.observable();

    self.update = function(jsonStr) {
        var obj = JSON.parse(jsonStr);
        self.health(obj.health);
        self.failed(obj.failed);
    };

}

function Code() {
    var self = this;

    self.coverage = ko.observable();
    self.criticBugs = ko.observable();
    self.majorBugs = ko.observable();

    // TODO: * What about 'Bill is broken'|| 'Bill is ok'?

    self.update = function (jsonStr) {
        var obj = JSON.parse(jsonStr);
        self.coverage(obj.coverage);
        self.criticBugs(obj.criticals);
        self.majorBugs(obj.majors);
    };

    // Communicate coverage status
    self.isIdeal = function (metric) {
        if (metric === 'coverage')
            return self.coverage() >= 95;
        if (metric === 'critic')
            return self.criticBugs() === 0;
        if (metric === 'major')
            return self.majorBugs() === 0;
        // else, all metrics must be ideal to report code as ideal
        return self.isIdeal('coverage') && self.isIdeal('critic') && self.isIdeal('major');
    };

    self.isOk = function (metric) {
        if (metric === 'coverage')
            return self.coverage() >= 90 && self.coverage() < 95;
        if (metric === 'critic')
            return self.criticBugs() > 0 && self.criticBugs() <= 4;
        if (metric === 'major')
            return self.majorBugs() > 0 && self.majorBugs() <= 8;
        // else, all metrics must be ok or better to report code as ok
        return (self.isOk('coverage') || self.isIdeal('coverage'))
            && (self.isOk('critic') || self.isIdeal('critic'))
            && (self.isOk('major') || self.isIdeal('major'))
            && !self.isBad() && !self.isInDanger();
    };

    self.isBad = function (metric) {
        if (metric === 'coverage')
            return self.coverage() >= 86 && self.coverage() < 90;
        if (metric === 'critic')
            return self.criticBugs() > 4 && self.criticBugs() <= 9;
        if (metric === 'major')
            return self.majorBugs() > 8 && self.majorBugs() <= 18;
        // else, if any metric is bad, code is reported as bad
        return self.isBad('coverage') || self.isBad('critic') || self.isBad('major');
    };


    self.isInDanger = function (metric) {
        if (metric === 'coverage')
            return self.coverage() < 86;
        if (metric === 'critic')
            return self.criticBugs() > 9;
        if (metric === 'major')
            return self.majorBugs() > 18;
        // else, if any metric is in danger, code is reported as in danger
        return self.isInDanger('coverage') || self.isInDanger('critic') || self.isInDanger('major');
    };

    return self;
}

