var theJsonFileOldVs = '{"committedPoints":28,' + '"daysLeft":10,' +
  '"statusCount":{"To Do":20,"In Dev":0,"Code Review":0,"Desk Check":0,"Ready for QA":0,"In QA":0,"Ready for Sign Off":0,"Done":0},'+
  '"currentSprint":9,"stories":[{"summary":"[QMO] - APU - Incorrect Log format in Service Alert Logs","status":"Done","complexity":0,"type":"Defect"},'+
  '{"summary":"Parts Transfer - Login and Logout","status":"In Dev","complexity":8,"type":"Story"},'+
  '{"summary":"Parts Transfer - Expiration Session ","status":"In Dev","complexity":5,"type":"Story"},'+
  '{"summary":"Parts Transfer - Required Fields to Transfer a Part to MTX - Validations","status":"In Dev","complexity":5,"type":"Story"},'+
  '{"summary":"Parts Transfer - Transfer a Wizard part to MTX - Mapping","status":"In Dev","complexity":5,"type":"Story"},'+
  '{"summary":"Parts Transfer - Remove the soft lock in Wizard when a part can\'t be transferred to MTX","status":"In Dev","complexity":5,"type":"Story"}]}';

// http://localhost:8090/sprint
var jsonSprint = '{"allStatus":["To Do","In Dev","Code Review","Desk Check","Ready for QA","In QA","Ready for Sign Off","Done"],'+
                   '"pointsPerState":{"Ready for QA":0,"To Do":0,"Done":0,"Ready for Sign Off":0,"In Dev":13,"Code Review":15,"In QA":0,"Desk Check":0},'+
                   '"committedPoints":28,'+
                   '"currentSprint":9,'+
                   '"startDate":1488261600000,'+
                   '"endDate":1489467600000,'+
                   '"stories":[{"summary":"[QMO] - APU - Incorrect Log format in Service Alert Logs","status":"Done","complexity":0,"type":"Defect"},'+
                              '{"summary":"Parts Transfer - Login and Logout","status":"In Dev","complexity":8,"type":"Story"},'+
                              '{"summary":"Parts Transfer - Expiration Session ","status":"Code Review","complexity":5,"type":"Story"},'+
                              '{"summary":"Parts Transfer - Required Fields to Transfer a Part to MTX - Validations","status":"Code Review","complexity":5,"type":"Story"},'+
                              '{"summary":"Parts Transfer - Transfer a Wizard part to MTX - Mapping","status":"In Dev","complexity":5,"type":"Story"},'+
                              '{"summary":"Parts Transfer - Remove the soft lock in Wizard when a part can\'t be transferred to MTX","status":"Code Review","complexity":5,"type":"Story"}],'+
                   '"pointsReadyToDev":43}'


// http://localhost:8090/jenkins
var jsonJenkins = {"health":60,"failed":false};

// http://localhost:8090/sonar
var jsonSonar = {"coverage":96.7,"criticals":1,"majors":0};
