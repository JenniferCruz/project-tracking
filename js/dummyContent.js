var secondsInADay = 86400;
var milisecondsInADay = secondsInADay * 1000;

var today = Date.now();
var aWeekAgo = today - (milisecondsInADay * 7);
var aWeekFromNow = today + (milisecondsInADay * 7);
var twoWeeksFromNow = today + (milisecondsInADay * 14);

var allPointsInFirstStages = '"pointsPerState":{"Ready for QA":0,"To Do":10,"Done":0,"Ready for Sign Off":0,"In Dev":13,"Code Review":5,"In QA":0,"Desk Check":0},';
var allPointsInLastStages = '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":8,"Ready for Sign Off":15,"In Dev":0,"Code Review":0,"In QA":5,"Desk Check":0},';
var allPointsAreWellDistributed = '"pointsPerState":{"Ready for QA":4,"To Do":3,"Done":3,"Ready for Sign Off":3,"In Dev":4,"Code Review":3,"In QA":4,"Desk Check":4},';
var original = '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":0,"Ready for Sign Off":0,"In Dev":13,"Code Review":15,"In QA":0,"Desk Check":0},';

// http://localhost:8090/sprint
var jsonSprint = '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    original +
    // allPointsInFirstStages +
    // allPointsInLastStages +
    // allPointsAreWellDistributed +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + today + ',"endDate":'+ twoWeeksFromNow + ','+ // sprint starts today
    // '"startDate":' + aWeekAgo + ',"endDate":' + aWeekFromNow + ',' + // sprint is half way through
    '"stories":[{"summary":"[QMO] - APU - Incorrect Log format in Service Alert Logs","status":"Done","complexity":0,"type":"Defect"},' +
    '{"summary":"Parts Transfer - Login and Logout","status":"In Dev","complexity":8,"type":"Story"},' +
    '{"summary":"Parts Transfer - Expiration Session ","status":"Code Review","complexity":5,"type":"Story"},' +
    '{"summary":"Parts Transfer - Required Fields to Transfer a Part to MTX - Validations","status":"Code Review","complexity":5,"type":"Story"},' +
    '{"summary":"Parts Transfer - Transfer a Wizard part to MTX - Mapping","status":"In Dev","complexity":5,"type":"Story"},' +
    '{"summary":"Parts Transfer - Remove the soft lock in Wizard when a part can\'t be transferred to MTX","status":"Code Review","complexity":5,"type":"Story"}],' +
    '"pointsReadyToDev":43}';

// http://localhost:8090/jenkins
// var jsonJenkins = '{ "health": 60, "failed": false}';
var jsonJenkins = '{ "health": 60, "failed": true}';

// http://localhost:8090/sonar
var jsonSonar = '{"coverage":96.7,"criticals":1,"majors":0}';
// var jsonSonar = '{"coverage":96.7,"criticals":1,"majors":30}';
// var jsonSonar = '{"coverage":92,"criticals":1,"majors":0}';
// var jsonSonar = '{"coverage":87.7,"criticals":1,"majors":0}';
// var jsonSonar = '{"coverage":70.7,"criticals":10,"majors":30}';
