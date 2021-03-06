// TESTS ON APP's status
QUnit.module("App", function() {
    QUnit.test("App's status is 4 when code, analysis and sprint are in ideal status", function (assert) {
        var viewModel = new LocationsViewModel();

    });

    QUnit.test("App's status is 4 when code and analysis are in ideal status, and sprint at early stage", function (assert) {

    });

    QUnit.test("App's status is 3", function (assert) {

    });

    QUnit.test("App's status is 2", function (assert) {

    });

    QUnit.test("App's status is 1", function (assert) {

    });
});

QUnit.module("Calendar", function () {
    // TESTS ON CALENDAR's getDaysLeft()
    QUnit.test("Test Calendar: getDaysLeft() returns 0 | end date has passed", function (assert) {
        var start = Date.now() - (milisecondsInADay * 10);
        var end = Date.now() - (milisecondsInADay * 2);
        var cal = new Calendar(start, end);
        var result = cal.getDaysLeft();
        assert.ok(result == 0, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysLeft() returns 0 | end date is today", function (assert) {
        var start = Date.now() - (milisecondsInADay * 10);
        var end = Date.now();
        var cal = new Calendar(start, end);
        var result = cal.getDaysLeft();
        assert.ok(result == 0, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysLeft() returns all days left | start date hasn't passed ", function (assert) {
        var start = Date.now() + (milisecondsInADay * 2);
        var end = Date.now() + (milisecondsInADay * 10);
        var cal = new Calendar(start, end);
        var result = cal.getDaysLeft();
        assert.ok(result == 10, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysLeft() returns all days left | start date is today", function (assert) {
        var start = Date.now();
        var end = Date.now() + (milisecondsInADay * 10);
        var cal = new Calendar(start, end);
        var result = cal.getDaysLeft();
        assert.ok(result == 10, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysLeft() returns some days left", function (assert) {
        var start = Date.now() - (milisecondsInADay * 2);
        var end = Date.now() + (milisecondsInADay * 10);
        var cal = new Calendar(start, end);
        var result = cal.getDaysLeft();
        assert.ok(result == 10, "Result was " + result);
    });

    // TESTS ON CALENDAR's getDaysBetween()
    QUnit.test("Test Calendar: getDaysBetween() returns 0 | start and end are the same day", function (assert) {
        var cal = new Calendar(Date.now(), Date.now());
        var result = cal._getDaysBetween(Date.now(), Date.now());
        assert.ok(result == 0, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysBetween() returns 0 | start and end are less than 1 day apart", function (assert) {
        var end = Date.now() + (milisecondsInADay * 0.2);
        var cal = new Calendar(Date.now(), end);
        var result = cal._getDaysBetween(Date.now(), end);
        assert.ok(result == 0, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysBetween() returns 1 | ", function (assert) {
        var end = Date.now() + milisecondsInADay;
        var cal = new Calendar(Date.now(), end);
        var result = cal._getDaysBetween(Date.now(), end);
        assert.ok(result == 1, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysBetween() returns all days | start date hasn't yet passed", function (assert) {
        var start = Date.now() + (milisecondsInADay * 10);
        var end = Date.now() + (milisecondsInADay * 20);
        var cal = new Calendar(start, end);
        var result = cal._getDaysBetween(start, end);
        assert.ok(result == 10, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysBetween() returns all days | start date is today", function (assert) {
        var end = Date.now() + (milisecondsInADay * 2);
        var cal = new Calendar(Date.now(), end);
        var result = cal._getDaysBetween(Date.now(), end);
        assert.ok(result == 2, "Result was " + result);
    });

    QUnit.test("Test Calendar: getDaysBetween() returns some days", function (assert) {
        var start = Date.now() - (milisecondsInADay * 2);
        var end = Date.now() + (milisecondsInADay * 2);
        var cal = new Calendar(start, end);
        var result = cal._getDaysBetween(Date.now(), end);
        assert.ok(result == 2, "Result was " + result);
    });


    // TESTS ON CALENDAR's isTooEarly()
    QUnit.test("Test Calendar: isTooEarly() returns true | start day hasnt passed", function (assert) {
        var start = Date.now() + (milisecondsInADay * 2);
        var end = Date.now() + (milisecondsInADay * 10);
        var cal = new Calendar(start, end);
        var result = cal.isTooEarly();
        assert.ok(result, "Result was " + result);
    });

    QUnit.test("Test Calendar: isTooEarly() returns true | end day is far", function (assert) {
        var start = Date.now() + (milisecondsInADay * 2);
        var end = Date.now() + (milisecondsInADay * 20);
        var cal = new Calendar(start, end);
        var result = cal.isTooEarly();
        assert.ok(result, "Result was " + result);
    });

    QUnit.test("Test Calendar: isTooEarly() returns false | end day has passed", function (assert) {
        var start = Date.now() - (milisecondsInADay * 20);
        var end = Date.now() - (milisecondsInADay * 2);
        var cal = new Calendar(start, end);
        var result = cal.isTooEarly();
        assert.ok(!result, "Result was " + result);
    });

    QUnit.test("Test Calendar: isTooEarly() returns false | is almost done", function (assert) {
        var start = Date.now() - (milisecondsInADay * 20);
        var end = Date.now() + (milisecondsInADay * 2);
        var cal = new Calendar(start, end);
        var result = cal.isTooEarly();
        assert.ok(!result, "Result was " + result);
    });


    // TESTS ON CALENDAR's progress()
    QUnit.test("Test Calendar: progress() returns 0 | start date hasn't yet passed", function (assert) {
        var start = Date.now() + (milisecondsInADay * 2);
        var end = Date.now() + (milisecondsInADay * 10);
        var cal = new Calendar(start, end);
        var result = cal.progress();
        assert.ok(result === 0, "Result was " + result);
    });

    QUnit.test("Test Calendar: progress() returns 0 | start day is today", function (assert) {
        var end = Date.now() + (milisecondsInADay * 10);
        var cal = new Calendar(Date.now(), end);
        var result = cal.progress();
        assert.ok(result === 0, "Result was " + result);
    });

    QUnit.test("Test Calendar: progress() returns 100 | end date has passed", function (assert) {
        var start = Date.now() - (milisecondsInADay * 20);
        var end = Date.now() - (milisecondsInADay * 2);
        var cal = new Calendar(start, end);
        var result = cal.progress();
        assert.ok(result === 100, "Result was " + result);
    });

    QUnit.test("Test Calendar: progress() returns 100 | end date is today", function (assert) {
        var start = Date.now() - (milisecondsInADay * 20);
        var cal = new Calendar(start, Date.now());
        var result = cal.progress();
        assert.ok(result === 100, "Result was " + result);
    });

    QUnit.test("Test Calendar: progress() returns 25 | ", function (assert) {
        var start = Date.now() - (milisecondsInADay * 3);
        var end = Date.now() + (milisecondsInADay * 9);
        var cal = new Calendar(start, end);
        var result = cal.progress();
        assert.ok(result === 25, "Result was " + result);
    });

    QUnit.test("Test Calendar: progress() returns 50 | ", function (assert) {
        var start = Date.now() - (milisecondsInADay * 3);
        var end = Date.now() + (milisecondsInADay * 3);
        var cal = new Calendar(start, end);
        var result = cal.progress();
        assert.ok(result === 50, "Result was " + result);
    });

    QUnit.test("Test Calendar: progress() returns 75 | ", function (assert) {
        var start = Date.now() - (milisecondsInADay * 9);
        var end = Date.now() + (milisecondsInADay * 3);
        var cal = new Calendar(start, end);
        var result = cal.progress();
        assert.ok(result === 75, "Result was " + result);
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

