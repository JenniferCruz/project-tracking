QUnit.module("Analysis", function () {
    var analysis;

    QUnit.module("grade()", function () {
        QUnit.test("returns 1 when there are more pointsReadyToDev than healthBase", function (assert) {
            analysis = new Analysis('{"pointsReadyToDev":100}');
            var grade = analysis.grade();
            assert.equal(1, grade, "must receive 1. Received " + grade);
        });
        QUnit.test("returns 1 when there are as many pointsReadyToDev as healthBase", function (assert) {
            analysis = new Analysis('{"pointsReadyToDev":40}');
            var grade = analysis.grade();
            assert.equal(1, grade, "must receive 1. Received " + grade);
        });
        QUnit.test("returns 0 when there are 0 pointsReadyToDev", function (assert) {
            analysis = new Analysis('{"pointsReadyToDev":0}');
            var grade = analysis.grade();
            assert.equal(0, grade, "must receive 1. Received " + grade);
        });
        QUnit.test("returns 0.5 when there are half pointsReadyToDev than healthBase", function (assert) {
            analysis = new Analysis('{"pointsReadyToDev":20}');
            var grade = analysis.grade();
            assert.equal(0.5, grade, "must receive 1. Received " + grade);
        });
        QUnit.test("returns a number in the range (0.5, 1) when pointsReadyToDev are more than half healthBase ", function (assert) {
            analysis = new Analysis('{"pointsReadyToDev":35}');
            var grade = analysis.grade();
            assert.ok(grade > 0.5 && grade < 1, "must receive 1. Received " + grade);
        });
        QUnit.test("returns a number in the range (0, 0.5) when pointsReadyToDev are less than half healthBase ", function (assert) {
            analysis = new Analysis('{"pointsReadyToDev":12}');
            var grade = analysis.grade();
            assert.ok(grade > 0 && grade < 0.5, "must receive 1. Received " + grade);
        });
    });
});

QUnit.module("Sprint", function(hooks) {
    var sprint;

    QUnit.module("'s calendar", function () {
        QUnit.test("is defined when sprint.update(...) is called.", function (assert) {
            sprint = new Sprint(jsonSprintEarly);
            assert.ok(sprint._calendar, "sprint's calendar object must be defined. Was " + sprint._calendar);
        });
    });

    QUnit.module("'s isTooEarly()", function () {
        QUnit.test("is true when Sprint is starting today and end date is at least 4 days apart", function (assert) {
            sprint = new Sprint(jsonSprintEarly);
            assert.ok(sprint.isTooEarly(), "must return true. Returned " + sprint.isTooEarly());
        });

        QUnit.test("is false when Sprint started already and end date ..............", function (assert) {
            sprint = new Sprint(jsonSprintDanger);
            assert.notOk(sprint.isTooEarly(), "must return false. Returned " + sprint.isTooEarly());
        })

    });

    QUnit.module("'s grade()", function () {
        // TODO: Are those values relevant?
        QUnit.test("is 1 when Sprint's early.", function (assert) {
            sprint = new Sprint(jsonSprintEarly);
            assert.equal(sprint.grade(), 1, "Sprint's grade must be 1. Was " + sprint.grade());
        });

        QUnit.test("is 1 when Sprint's ideal", function (assert) {
            sprint = new Sprint(jsonSprintIdeal);
            assert.equal(sprint.grade(), 1, "Sprint's grade must be 1. Was " + sprint.grade());
        });

        QUnit.test("is >= 0.8 when Sprint's ok", function (assert) {
            sprint = new Sprint(jsonSprintOk);
            assert.ok(sprint.grade() >= 0.8 && sprint.grade() < 1, "Sprint's grade must be >= 0.8. Was " + sprint.grade());
        });

        QUnit.test("is >= 0.6 when Sprint's bad", function (assert) {
            sprint = new Sprint(jsonSprintBad);
            assert.ok(sprint.grade() >= 0.6 && sprint.grade() < 0.8, "Sprint's grade must be >= 0.6. Was " + sprint.grade());
        });

        QUnit.test("is < 0.6 when Sprint's in Danger", function (assert) {
            sprint = new Sprint(jsonSprintDanger);
            assert.ok(sprint.grade() < 0.6, "Sprint's grade must be < 0.6. Was " + sprint.grade());
        });

    });
});

QUnit.module("App", function(hooks) {

    var vModel;

    hooks.beforeEach(function () {
        vModel = new LocationsViewModel();
    });

    QUnit.test("'s status is 4 when code, analysis and sprint are in ideal status", function (assert) {
        vModel.sprint = new Sprint(jsonSprintIdeal);
        vModel.analysis =new Analysis(jsonSprintIdeal);
        vModel.code.update(jsonJenkinsIdeal);
        vModel.code.update(jsonSonarIdeal);
        assert.equal(vModel.statusAvr(), 4, "Status average must be 4. Was " + vModel.statusAvr());
    });

    QUnit.test("'s status is 4 when code and analysis are in ideal status, and sprint at early stage", function (assert) {
        vModel.sprint = new Sprint(jsonSprintEarly);
        vModel.analysis = new Analysis(jsonSprintEarly);
        vModel.code.update(jsonJenkinsIdeal);
        vModel.code.update(jsonSonarIdeal);
        assert.equal(vModel.statusAvr(), 4, "Status average must be 4. Was " + vModel.statusAvr());
    });

    QUnit.test("'s status is equal to or more than 3 and less than 4", function (assert) {
        vModel.sprint = new Sprint(jsonSprintOk);
        vModel.analysis = new Analysis(jsonSprintOk);
        vModel.code.update(jsonJenkinsBad);
        vModel.code.update(jsonSonarBad);
        assert.ok((vModel.statusAvr() >= 3 && vModel.statusAvr() < 4), "Status average must be between 3 and 4. Was " + vModel.statusAvr());
    });

    QUnit.test("'s status is equal to or more than 2 and less than 3", function (assert) {
        vModel.sprint = new Sprint(jsonSprintBad);
        vModel.analysis = new Analysis(jsonSprintBad);
        vModel.code.update(jsonJenkinsBad);
        vModel.code.update(jsonSonarBad);
        assert.ok((vModel.statusAvr() >= 2 && vModel.statusAvr() < 3), "Status average must be between 2 and 3. Was " + vModel.statusAvr());
    });

    QUnit.test("'s status is less than 2", function (assert) {
        vModel.sprint = new Sprint(jsonSprintDanger);
        vModel.analysis = new Analysis(jsonSprintDanger);
        vModel.code.update(jsonJenkinsDanger);
        vModel.code.update(jsonSonarDanger);
        assert.ok((vModel.statusAvr() >= 1 && vModel.statusAvr() < 2), "Status average must be less than 2. Was " + vModel.statusAvr());
    });
});

QUnit.module("Calendar", function (hooks) {
    var daysAgo20;
    var daysAgo10;
    var daysAgo2;
    var in2Days;
    var in10Days;
    var today;

    hooks.beforeEach( function() {
        today = Date.now();
        daysAgo20 = today - (milisecondsInADay * 20);
        daysAgo10 = today - (milisecondsInADay * 10);
        daysAgo2  = today - (milisecondsInADay * 2);
        in2Days   = today + (milisecondsInADay * 2);
        in10Days  = today + (milisecondsInADay * 10);
    } );

    QUnit.module("getDaysLeft(...)", function () {
        QUnit.test("returns 0 | end date has passed", function (assert) {
            var cal = new Calendar(daysAgo10, daysAgo2);
            var result = cal.getDaysLeft();
            assert.ok(result == 0, "Result was " + result);
        });

        QUnit.test("returns 0 | end date is today", function (assert) {
            var cal = new Calendar(daysAgo10, today);
            var result = cal.getDaysLeft();
            assert.ok(result == 0, "Result was " + result);
        });

        QUnit.test("returns all days left | start date hasn't passed ", function (assert) {
            var cal = new Calendar(in2Days, in10Days);
            var result = cal.getDaysLeft();
            assert.ok(result == 10, "Result was " + result);
        });

        QUnit.test("returns all days left | start date is today", function (assert) {
            var cal = new Calendar(today, in10Days);
            var result = cal.getDaysLeft();
            assert.ok(result == 10, "Result was " + result);
        });

        QUnit.test("returns some days left", function (assert) {
            var cal = new Calendar(daysAgo2, in10Days);
            var result = cal.getDaysLeft();
            assert.ok(result == 10, "Result was " + result);
        });
    });

    QUnit.module("getDaysBetween(...)", function () {
        QUnit.test("returns 0 | start and end are the same day", function (assert) {
            var cal = new Calendar(today, today);
            var result = cal._getDaysBetween(today, today);
            assert.ok(result == 0, "Result was " + result);
        });

        QUnit.test("returns 0 | start and end are less than 1 day apart", function (assert) {
            var end = today + (milisecondsInADay * 0.2);
            var cal = new Calendar(today, end);
            var result = cal._getDaysBetween(Date.now(), end);
            assert.ok(result == 0, "Result was " + result);
        });

        QUnit.test("returns 1 | ", function (assert) {
            var end = today + milisecondsInADay;
            var cal = new Calendar(today, end);
            var result = cal._getDaysBetween(Date.now(), end);
            assert.ok(result == 1, "Result was " + result);
        });

        QUnit.test("returns all days | start date hasn't yet passed", function (assert) {
            var end = today + (milisecondsInADay * 20);
            var cal = new Calendar(in10Days, end);
            var result = cal._getDaysBetween(in10Days, end);
            assert.ok(result == 10, "Result was " + result);
        });

        QUnit.test("returns all days | start date is today", function (assert) {
            var end = today + (milisecondsInADay * 2);
            var cal = new Calendar(today, end);
            var result = cal._getDaysBetween(today, end);
            assert.ok(result == 2, "Result was " + result);
        });

        QUnit.test("returns some days", function (assert) {
            var cal = new Calendar(daysAgo2, in2Days);
            var result = cal._getDaysBetween(Date.now(), in2Days);
            assert.ok(result == 2, "Result was " + result);
        });
    });

    QUnit.module("isTooEarly(...)", function () {
        QUnit.test("returns true | start day hasnt passed", function (assert) {
            var cal = new Calendar(in2Days, in10Days);
            var result = cal.isTooEarly();
            assert.ok(result, "Result was " + result);
        });

        QUnit.test("returns true | end day is far", function (assert) {
            var end = today + (milisecondsInADay * 20);
            var cal = new Calendar(in2Days, end);
            var result = cal.isTooEarly();
            assert.ok(result, "Result was " + result);
        });

        QUnit.test("returns false | end day has passed", function (assert) {
            var cal = new Calendar(daysAgo20, daysAgo2);
            var result = cal.isTooEarly();
            assert.ok(!result, "Result was " + result);
        });

        QUnit.test("returns false | is almost done", function (assert) {
            var cal = new Calendar(daysAgo20, in2Days);
            var result = cal.isTooEarly();
            assert.ok(!result, "Result was " + result);
        });
    });

    QUnit.module("progress(...)", function () {
        QUnit.test("returns 0 | start date hasn't yet passed", function (assert) {
            var cal = new Calendar(in2Days, in10Days);
            var result = cal.progress();
            assert.ok(result === 0, "Result was " + result);
        });

        QUnit.test("returns 0 | start day is today", function (assert) {
            var cal = new Calendar(Date.now(), in10Days);
            var result = cal.progress();
            assert.ok(result === 0, "Result was " + result);
        });

        QUnit.test("returns 100 | end date has passed", function (assert) {
            var cal = new Calendar(daysAgo20, daysAgo2);
            var result = cal.progress();
            assert.ok(result === 100, "Result was " + result);
        });

        QUnit.test("returns 100 | end date is today", function (assert) {
            var cal = new Calendar(daysAgo20, Date.now());
            var result = cal.progress();
            assert.ok(result === 100, "Result was " + result);
        });

        QUnit.test("returns 25 | ", function (assert) {
            var start = Date.now() - (milisecondsInADay * 3);
            var end = Date.now() + (milisecondsInADay * 9);
            var cal = new Calendar(start, end);
            var result = cal.progress();
            assert.ok(result === 25, "Result was " + result);
        });

        QUnit.test("returns 50 | ", function (assert) {
            var start = Date.now() - (milisecondsInADay * 3);
            var end = Date.now() + (milisecondsInADay * 3);
            var cal = new Calendar(start, end);
            var result = cal.progress();
            assert.ok(result === 50, "Result was " + result);
        });

        QUnit.test("returns 75 | ", function (assert) {
            var start = Date.now() - (milisecondsInADay * 9);
            var end = Date.now() + (milisecondsInADay * 3);
            var cal = new Calendar(start, end);
            var result = cal.progress();
            assert.ok(result === 75, "Result was " + result);
        });
    });

});

// QUnit.test( "Test Code Class communicates Ideal Coverage Succesfuly", function( assert ) {
//     var code = new Code();
//     code.update('{"coverage":99,"criticals":1,"majors":0}');
//     assert.ok( code.coverage() == 99, "Passed!" );
//     assert.ok( code.isCoverageIdeal(), "Passed!" );
//     assert.ok( !code.isCoverageOk(), "Passed!" );
//     assert.ok( !code.isCoverageBad(), "Passed!" );
//     assert.ok( !code.isCoverageInDanger(), "Passed!" );
// });
//
// QUnit.test( "Test Code Class communicates Ok Coverage Succesfuly", function( assert ) {
//     var code = new Code();
//     code.update('{"coverage":92,"criticals":1,"majors":0}');
//     assert.ok( code.coverage() == 92, "Passed!" );
//     assert.ok( code.isCoverageOk(), "Passed!" );
//     assert.ok( !code.isCoverageIdeal(), "Passed!" );
//     assert.ok( !code.isCoverageBad(), "Passed!" );
//     assert.ok( !code.isCoverageInDanger(), "Passed!" );
// });
//
// QUnit.test( "Test Code Class communicates Bad Coverage Succesfuly", function( assert ) {
//     var code = new Code();
//     code.update('{"coverage":87,"criticals":1,"majors":0}');
//     assert.ok( code.coverage() == 87, "Passed!" );
//     assert.ok( code.isCoverageBad(), "Passed!" );
//     assert.ok( !code.isCoverageIdeal(), "Passed!" );
//     assert.ok( !code.isCoverageOk(), "Passed!" );
//     assert.ok( !code.isCoverageInDanger(), "Passed!" );
// });
//
// QUnit.test( "Test Code Class communicates In Danger Coverage Succesfuly", function( assert ) {
//     var code = new Code();
//     code.update('{"coverage":60.8,"criticals":1,"majors":0}');
//     assert.ok( code.coverage() == 60.8, "Passed!" );
//     assert.ok( code.isCoverageInDanger(), "Passed!" );
//     assert.ok( !code.isCoverageIdeal(), "Passed!" );
//     assert.ok( !code.isCoverageOk(), "Passed!" );
//     assert.ok( !code.isCoverageBad(), "Passed!" );
// });

