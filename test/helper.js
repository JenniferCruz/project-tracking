var secondsInADay = 86400;
var milisecondsInADay = secondsInADay * 1000;

//-----------------------------------


// total_grade = (analysis.grade() + code.grade() + sprint.grade())/3


// total_grade< 0
var today = Date.now();
var twoWeeksFromNow = today + (milisecondsInADay * 14);

var jsonSprintIdeal = '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":0,"Ready for Sign Off":0,"In Dev":0,"Code Review":15,"In QA":13,"Desk Check":0},' +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + today + ',"endDate":'+ twoWeeksFromNow + ','+ // sprint starts today
    '"stories":[{"summary":"[QMO] - APU - Incorrect Log format in Service Alert Logs","status":"Done","complexity":0,"type":"Defect"},' +
    '{"summary":"Parts Transfer - Login and Logout","status":"In Dev","complexity":8,"type":"Story"},' +
    '{"summary":"Parts Transfer - Expiration Session ","status":"Code Review","complexity":5,"type":"Story"},' +
    '{"summary":"Parts Transfer - Required Fields to Transfer a Part to MTX - Validations","status":"Code Review","complexity":5,"type":"Story"},' +
    '{"summary":"Parts Transfer - Transfer a Wizard part to MTX - Mapping","status":"In Dev","complexity":5,"type":"Story"},' +
    '{"summary":"Parts Transfer - Remove the soft lock in Wizard when a part can\'t be transferred to MTX","status":"Code Review","complexity":5,"type":"Story"}],' +
    '"pointsReadyToDev":100}';
var jsonJenkinsIdeal = '{ "health": 100, "failed": false}';
var jsonSonarIdeal = '{"coverage":97,"criticals":0,"majors":0}';
