var secondsInADay = 86400;
var milisecondsInADay = secondsInADay * 1000;

//-----------------------------------


// total_grade = (analysis.grade() + code.grade() + sprint.grade())/3


// total_grade< 0
var today = Date.now();
var daysAgo10 = today - (milisecondsInADay * 10);
var daysAgo5  = today - (milisecondsInADay * 5);
var in5Days   = today + (milisecondsInADay * 5);
var in10Days  = today + (milisecondsInADay * 10);
var in2Weeks  = today + (milisecondsInADay * 14);


// JENKIN
var jsonJenkinsIdeal = '{ "health": 100, "failed": false}';
var jsonJenkinsBad = '{ "health": 40, "failed": false}';
var jsonJenkinsDanger = '{ "health": 10, "failed": true}';

// SONAR
var jsonSonarIdeal  = '{"coverage":99, "criticals":0, "majors":0}';
var jsonSonarBad    = '{"coverage":87, "criticals":6, "majors":0}';
var jsonSonarDanger = '{"coverage":70, "criticals":10,"majors":20}';

// SPRINT
// The actual progress of the Sprint is measured by how many points are in each state,
// vs. what's expected at the current time.

// the Sprint is 'too early' to evaluate, if the current time is less than 25% through the Sprint's length
var jsonSprintEarly = '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":0,"Ready for Sign Off":0,"In Dev":0,"Code Review":15,"In QA":13,"Desk Check":0},' +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + today + ',"endDate":'+ in2Weeks + ','+
    '"pointsReadyToDev":100}';

// the Sprint is 'ideal' if its actual progress is the same or above expected
var jsonSprintIdeal = '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":0,"Ready for Sign Off":0,"In Dev":0,"Code Review":15,"In QA":13,"Desk Check":0},' +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + daysAgo5 + ',"endDate":'+ in10Days + ','+
    '"pointsReadyToDev":100}';

// the Sprint is 'ok' if its actual progress differs in no more than 10% from what's expected
var jsonSprintOk =  '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    '"pointsPerState":{"Ready for QA":0,"To Do":2,"Done":4,"Ready for Sign Off":5,"In Dev":5,"Code Review":4,"In QA":8,"Desk Check":0},' +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + daysAgo10 + ',"endDate":'+ in5Days + ','+
    '"pointsReadyToDev":80}';

// the Sprint is 'bad' if its actual progress deviates no more than 25% from what's expected
var jsonSprintBad =  '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":0,"Ready for Sign Off":0,"In Dev":0,"Code Review":15,"In QA":13,"Desk Check":0},' +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + daysAgo10 + ',"endDate":'+ in5Days + ','+
    '"pointsReadyToDev":40}';

// the Sprint is 'inDanger' if its actual progress deviates more than 25% from what's expected
var jsonSprintDanger = '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],' +
    '"pointsPerState":{"Ready for QA":0,"To Do":10,"Done":0,"Ready for Sign Off":0,"In Dev":15,"Code Review":0,"In QA":3,"Desk Check":0},' +
    '"committedPoints":28,' +
    '"currentSprint":9,' +
    '"startDate":' + daysAgo10 + ',"endDate":'+ in5Days + ','+
    '"pointsReadyToDev":10}';



console.log("HELPER");
// console.log("________");
// console.log("Early");
// var sprEarly = new Sprint();
// sprEarly.update(jsonSprintEarly);
// console.log("progress: " + sprEarly.progress() + "; status: " + sprEarly.status());
// console.log("________");
// console.log("Ideal");
// var sprIdeal = new Sprint();
// sprIdeal.update(jsonSprintIdeal);
// console.log("progress: " + sprIdeal.progress() + "; status: " + sprIdeal.status());
// console.log("________");
// console.log("ok");
//
// var sprOk = new Sprint();
// sprOk.update(jsonSprintOk);
// console.log("progress: " + sprOk.progress() + "; status: " + sprOk.status());
// console.log("________");
// console.log("Bad");
//
// var sprBad = new Sprint(jsonSprintBad);
// console.log("progress: " + sprBad.progress() + "; status: " + sprBad.status() + "; grade: " + sprBad.grade());
// console.log("   sprBad.isTooEarly() -> " + sprBad.isTooEarly());
// console.log("   sprBad._calendar.progress() -> " + sprBad._calendar.progress());
// console.log("________");
// console.log("danger");
//
// var sprInDanger = new Sprint();
// sprInDanger.update(jsonSprintDanger);
// console.log("progress: " + sprInDanger.progress() + "; status: " + sprInDanger.status());
// console.log("________");
