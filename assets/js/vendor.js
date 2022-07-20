/* 
    Date created: Jul 04 2022 14:52 GMT+5
    Created By: Amaan Zahid
    Description: vendor.js contains variables and funcrions.
*/

// DOM Elements
const totalInpt = document.querySelector("#total");
const expressionInpt = document.querySelector("#expression");
const buttons = document.querySelectorAll(".btn");
const logsList = document.querySelector(".calc-history .calc-history__items");
const mobileLogList = document.querySelector('.calc-history__mobile .calc-history__items')
const infoBtn = document.querySelector('#info-btn')
const infoModal = document.querySelector('.info-modal')
const closeInfoModalBtn = document.querySelector('.close-btn')
const backdrop = document.querySelector('.backdrop')
const historyBtn = document.querySelector('#history-btn')
const mobileHistory = document.querySelector('.calc-history__mobile')
const historyToggler = document.querySelector('.history-toggler')
const historyContainer = document.querySelector('.calc-history-container')

// Reference Filter Variables
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const operators = ["+", "-", "*", "/"];
const ctas = ['=', 'c', 'backspace']
let currLog = '', lastInpt = ''


// Removes modal and mobile menu
function backdropClickHandler(){
    backdrop.classList.remove('active')
    infoModal.classList.remove('active')
    mobileHistory ? mobileHistory.classList.remove('active') : ''
    mobileHistory ? mobileHistory.classList.remove('active-mob-history') : ''
    infoModal.classList.remove('active-modal')
    setTimeout(()=>{
      backdrop.style.display = 'none'
      infoModal.style.display = 'none'
      mobileHistory ? mobileHistory.style.display = 'none' : ''
    },300)
  }
  
  // Performs Tasks as per input
  function inputHandler(btnVal) {
    if (numbers.includes(btnVal)) {
      if (btnVal == "." && expressionInpt.value.split(".").length > 1) {
        return;
      }
      if (expressionInpt.value == '' && btnVal == ".") {
        expressionInpt.value = "0";
      }
      if(lastInpt == '=' || expressionInpt.value == '0' && btnVal != '.'){
        expressionInpt.value = btnVal
      }else{
        expressionInpt.value += btnVal;
      }
    } else if (operators.includes(btnVal)) {
      if (expressionInpt.value == "" && totalInpt.value == '') {
        return;
      }
      if(expressionInpt.value == '' && totalInpt.value != ''){
        totalInpt.value = totalInpt.value.substr(0, totalInpt.value.length - 1) + '' + btnVal
        currLog = currLog.substring(0, currLog.length - 2) + btnVal + ' '
      }else{
        if (
          numbers.includes(expressionInpt.value[expressionInpt.value.length - 1])
        ) {
          expressionInpt.value += btnVal;
        } else if (
          operators.includes(expressionInpt.value[expressionInpt.value.length - 1])
        ) {
          if (expressionInpt.value[expressionInpt.value.length - 1] == btnVal) {
            return;
          }else{
            expressionInpt.value =
              expressionInpt.value.substr(0, expressionInpt.value.length - 1) +
              "" +
              btnVal;
          }
        }
        let currResult = calculateRes();
        if (totalInpt.value.length < 1) {
          totalInpt.value += expressionInpt.value;
        } else {
          totalInpt.value = currResult + "" + btnVal;
        }
        currLog += expressionInpt.value.substr(0, expressionInpt.value.length - 1) + ' ' + expressionInpt.value[expressionInpt.value.length - 1] + ' ';
        console.log(currLog)
        expressionInpt.value = "";
      }
    }else if(ctas.includes(btnVal)){
      if (btnVal == "c") {
        totalInpt.value = "";
        expressionInpt.value = "0";
        currLog = ''
      } else if (btnVal == "=") {
        if (expressionInpt.value == "0" || expressionInpt.value.length > 0 && totalInpt.value == "") {
          return;
        } else if (expressionInpt.value == "" && totalInpt.value.length > 0) {
          expressionInpt.value = totalInpt.value.substr(
            0,
            totalInpt.value.length - 1
          );
          generateLog(expressionInpt.value, false);
          totalInpt.value = "";
          syncLogsList();
        } else {
          generateLog(calculateRes(), true);
          expressionInpt.value = calculateRes();
          totalInpt.value = "";
          syncLogsList();
        }
      } else if(btnVal == 'backspace'){
        if(expressionInpt.value.length > 1 && lastInpt != '='){
          expressionInpt.value = expressionInpt.value.substr(0, expressionInpt.value.length - 1)
        }else if(expressionInpt.value.length == 1 || lastInpt == '='){
          expressionInpt.value = '0'
        }else if(expressionInpt.value == '0'){
          return
        }
      }
    }
  
    lastInpt = btnVal
  }
  
  // calculate and returns result
  function calculateRes() {
    let operator = totalInpt.value[totalInpt.value.length - 1];
    let firstNum = +totalInpt.value.substr(0, totalInpt.value.length - 1);
    let secondNum = operators.includes(
      expressionInpt.value[expressionInpt.value.length - 1]
    )
      ? +expressionInpt.value.substr(0, expressionInpt.value.length - 1)
      : +expressionInpt.value;
    let currResult;
  
    switch (operator) {
      case '+':
        currResult = firstNum + secondNum;
        break;
      case '-':
        currResult = firstNum - secondNum;
        break;
      case '*':
        currResult = firstNum * secondNum;
        break;
      case '/':
        currResult = firstNum / secondNum;
        break;
      default:
        break;
    }
  
    return currResult;
  }
  
  // Generates Log Entry as per mode
  function generateLog(result, mode) {
    let operator = totalInpt.value[totalInpt.value.length - 1];
    let firstNum = +totalInpt.value.substr(0, totalInpt.value.length - 1);
    let secondNum = operators.includes(
      expressionInpt.value[expressionInpt.value.length - 1]
    )
      ? +expressionInpt.value.substr(0, expressionInpt.value.length - 1)
      : +expressionInpt.value;
    let logs = JSON.parse(localStorage.getItem("calcLogs")) || [];
    let id;
    if (logs.length < 1) {
      id = 1;
    } else {
      id = +logs[logs.length - 1].id + 1;
    }
    let log = {
      id: id,
      exp: mode ? currLog + ' ' + secondNum : currLog.substr(0, currLog.length - 2),
      result: result,
    };
    if (logs.length == 20) {
      logs.shift();
    }
    logs.push(log);
    localStorage.setItem("calcLogs", JSON.stringify(logs));
    currLog = ''
  }
  
  // Sync Dom with latest Logs
  function syncLogsList(isMobile) {
    let logs = JSON.parse(localStorage.getItem("calcLogs")) || [];
    isMobile ? mobileLogList.innerHTML = '' : logsList.innerHTML = "";
    logs.reverse().forEach((log) => {
      const logItem = document.createElement("li");
      logItem.classList.add("calc-history__item");
      logItem.innerHTML = `<span id="close-btn" onClick=deleteLogEntry(${log.id})>X</span>${log.exp}<br><span id="log-result">= ${log.result}</span>`;
      isMobile ? mobileLogList.appendChild(logItem) : logsList.appendChild(logItem);
    });
  }
  
// Delete Log Entry with matching Id
  function deleteLogEntry(id) {
    let logs = JSON.parse(localStorage.getItem("calcLogs"));
    if (logs.length > 0) {
      let updatedLogs = logs.filter((log) => log.id != id);
      localStorage.setItem("calcLogs", JSON.stringify(updatedLogs));
      syncLogsList(true);
      syncLogsList();
    }
  }