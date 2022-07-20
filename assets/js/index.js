/* 
    Date created: Jul 04 2022 14:52 GMT+5
    Created By: Amaan Zahid
    Description: index.js contains eventlisteners.
*/

historyToggler.addEventListener('click', ()=>{
  historyContainer.classList.toggle('history-visible')
  syncLogsList()
})

historyBtn.addEventListener('click', ()=>{
  syncLogsList(true)
  backdrop.style.display = 'block'
  mobileHistory.style.display = 'block'
  setTimeout(()=>{
    backdrop.classList.toggle('active')
    mobileHistory.classList.toggle('active')
    mobileHistory.classList.toggle('active-mob-history')
  },300)
})

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    inputHandler(btn.dataset.val);
  });
});

backdrop.addEventListener('click', backdropClickHandler)

closeInfoModalBtn.addEventListener('click', backdropClickHandler)

document.addEventListener("DOMContentLoaded", () => {
  syncLogsList();
});

infoBtn.addEventListener('click', ()=>{
  backdrop.style.display = 'block'
  infoModal.style.display = 'block'
  setTimeout(()=>{
    backdrop.classList.add('active')
    infoModal.classList.add('active')
    infoModal.classList.add('active-modal')
  },300)
})

document.addEventListener("keydown", (e) => {
  if(numbers.includes(e.key.toString()) || operators.includes(e.key.toString()) || e.key == '=' || e.key == 'Enter' || e.key == 'Escape' || e.key == 'Backspace'){
    if(e.key == 'Enter'){
          inputHandler('=')
      }else if(e.key == 'Escape'){
          inputHandler('c')
      }else if(e.key == 'Backspace'){
          inputHandler('backspace')
      }else{
          inputHandler(e.key.toString())
      }
  }
});