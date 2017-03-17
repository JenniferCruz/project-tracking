QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test('Test Calendar getDaysLeft()', function (assert) {
    var cal = new Calendar(getInitialTimestamp(), getFinalTimestamp());
    assert.ok(cal.getDaysLeft() == 15, "Passed!");
});

QUnit.test('Test Calendar getDaysBetween()', function (assert) {
    var cal = new Calendar(getInitialTimestamp(), getFinalTimestamp(15));
    assert.ok(cal.getDaysBetween(cal._start, cal._end) == 15, "Passed!");
});

QUnit.test('Test Calendar isTooEarly() false', function (assert) {
    var cal = new Calendar(getInitialTimestamp(), getFinalTimestamp(15));
    assert.ok(cal.isTooEarly() == false, "Passed!");
});

QUnit.test('Test Calendar isTooEarly() false - passed fixed dates', function (assert) {
    var start = new Date(2017, 4, 10);
    var end = new Date(2017, 5, 20);
    var cal = new Calendar(start, end);
    assert.ok(cal.isTooEarly() == false, "Passed!");
});

QUnit.test('Test Calendar isTooEarly() true - passed fixed dates', function (assert) {
    var start = new Date(2017, 4, 10);
    var end = new Date(2017, 4, 20);
    var cal = new Calendar(start, end);
    assert.ok(cal.isTooEarly() == true, "Passed!");
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

