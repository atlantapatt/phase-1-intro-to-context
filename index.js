// Your code here
function createEmployeeRecord(employeeInfo) {
    let employeeObjectInfo = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObjectInfo
}

function createEmployeeRecords(arrayofEmployees) {
   let separatedArray = arrayofEmployees.map(x => ({
    firstName: x[0],
    familyName: x[1],
    title: x[2],
    payPerHour: x[3],
    timeInEvents: [],
    timeOutEvents: []
   }))
   return separatedArray
}

function createTimeInEvent(record, dateTime) {
    let hours =  parseInt(dateTime.slice(-5))
    let dates = dateTime.slice(0,10)
    let object = {
            type: "TimeIn",
            hour: hours,
            date: dates
        } 
    record.timeInEvents.push(object)
    return record
}

function createTimeOutEvent(record, dateTime) {
    let hours = parseInt(dateTime.slice(-5))
    let dates = dateTime.slice(0,10)
    let object = {
        type: "TimeOut",
        hour: hours,
        date: dates
    }
    record.timeOutEvents.push(object)
    return record
}

function hoursWorkedOnDate(record, date) {
    let hours
    for (let i=0; i < record.timeInEvents.length; i++) {
        if (record.timeInEvents[i].date === date) {
            if (record.timeOutEvents[i].date === date) {
                hours = record.timeOutEvents[i].hour - record.timeInEvents[i].hour
            }
        }
        
    }
    return hours/100
}

function wagesEarnedOnDate(record, date) {
    let wagesEarned = hoursWorkedOnDate(record, date) * record.payPerHour
    return wagesEarned
}

function allWagesFor(record) {
    let allPay = []
    let allDates = []
    for (let i =0; i < record.timeInEvents.length; i++) {
        allDates.push(record.timeInEvents[i].date)
    }
    allDates.forEach(date => {
        allPay.push(wagesEarnedOnDate(record,date))
    })
    return allPay.reduce((previousValue, currentValue) => previousValue + currentValue)
}

function calculatePayroll(arrayOfRecords) {
    let payroll = []
    arrayOfRecords.forEach(employee => {
        payroll.push(allWagesFor(employee))
    })
    return payroll.reduce((previousValue, currentValue) => previousValue + currentValue)
}