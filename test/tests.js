QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test( "Test Code Class communicates Ideal Coverage Succesfuly", function( assert ) {
    var code = new Code();
    code.update('{"coverage":99,"criticals":1,"majors":0}');
    assert.ok( code.coverage() == 99, "Passed!" );
    assert.ok( code.isCoverageIdeal(), "Passed!" );
    assert.ok( !code.isCoverageOk(), "Passed!" );
    assert.ok( !code.isCoverageBad(), "Passed!" );
    assert.ok( !code.isCoverageInDanger(), "Passed!" );
});

QUnit.test( "Test Code Class communicates Ok Coverage Succesfuly", function( assert ) {
    var code = new Code();
    code.update('{"coverage":92,"criticals":1,"majors":0}');
    assert.ok( code.coverage() == 92, "Passed!" );
    assert.ok( code.isCoverageOk(), "Passed!" );
    assert.ok( !code.isCoverageIdeal(), "Passed!" );
    assert.ok( !code.isCoverageBad(), "Passed!" );
    assert.ok( !code.isCoverageInDanger(), "Passed!" );
});

QUnit.test( "Test Code Class communicates Bad Coverage Succesfuly", function( assert ) {
    var code = new Code();
    code.update('{"coverage":87,"criticals":1,"majors":0}');
    assert.ok( code.coverage() == 87, "Passed!" );
    assert.ok( code.isCoverageBad(), "Passed!" );
    assert.ok( !code.isCoverageIdeal(), "Passed!" );
    assert.ok( !code.isCoverageOk(), "Passed!" );
    assert.ok( !code.isCoverageInDanger(), "Passed!" );
});

QUnit.test( "Test Code Class communicates In Danger Coverage Succesfuly", function( assert ) {
    var code = new Code();
    code.update('{"coverage":60.8,"criticals":1,"majors":0}');
    assert.ok( code.coverage() == 60.8, "Passed!" );
    assert.ok( code.isCoverageInDanger(), "Passed!" );
    assert.ok( !code.isCoverageIdeal(), "Passed!" );
    assert.ok( !code.isCoverageOk(), "Passed!" );
    assert.ok( !code.isCoverageBad(), "Passed!" );
});


