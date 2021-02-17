document.addEventListener("DOMContentLoaded", () => {
  /*Nodes and elements*/
const modalButtons = Array.from(document.querySelectorAll(".form__label"));
console.log(modalButtons)
const closeBtns = Array.from(document.querySelectorAll('.close'));
const formDecreaseButtons = Array.from(document.querySelectorAll('.form-decrease'));
const formIncreaseButtons = Array.from(document.querySelectorAll('.form-increase'));
const formValues =  Array.from(document.querySelectorAll('.form__input'));
const totalPrice = document.querySelector('.form__price span');
const changePlanButtons = Array.from(document.querySelectorAll('.packages'));

const addCarSection = document.querySelector('.addcar');
const domRect = addCarSection.getBoundingClientRect();
/*Helpers functions*/
 const increase = (input) => {
   let newInput = parseInt(input.value);
   newInput += 5;
   
   input.value = newInput;
   actUI(input)
 }
 const decrease = (input) => {
   let newInput = parseInt(input.value);
   newInput -= 5;         
   input.value = newInput;
   actUI(input)
 }
 const actUI = (input) =>{
  const containerUI = input.closest('.form__container--input');
  containerUI.querySelector('.form__input-number').innerHTML = input.value;
 }
 
 const gettingTotal = () => {
   const total = formValues.map((input) => parseInt(input.value))
   .reduce((sum,currentValue)=> sum + currentValue).toFixed(2);
   const FIXED_FEE = parseFloat(4.5).toFixed(2);   
   const finalNumber = parseFloat(total*FIXED_FEE).toFixed(2);
   totalPrice.innerHTML = finalNumber;
 }
 
const defaultValues = (expresion) => {
  switch(expresion){
    case 0:
      formValues[0].value = 5;
      formValues[1].value = 5; 
      formValues[2].value = 0;
      const decraseButton = formValues[2].previousElementSibling
      decraseButton.disabled = true;
      formValues.forEach((e)=> actUI(e))
      break;
    case 1:
      formValues[0].value = 5;
      formValues[1].value = 5; 
      formValues[2].value = 5;
      formValues.forEach((e)=> actUI(e))
      break;
    case 2: 
      formValues[0].value = 10;
      formValues[1].value = 10; 
      formValues[2].value = 10;
      formValues.forEach((e)=> actUI(e))
      break;
    default:
    formValues[0].value = 5;
    formValues[1].value = 5; 
    formValues[2].value = 5;
    break;
  }
}
 
const scrolling = (top) => {
  window.scroll({
    left: 0,
    top: top,
    behavior: "smooth"
  })
  
}
/*Form events*/
formDecreaseButtons.forEach((btn) => {        
  btn.onclick = (e) => {
    e.preventDefault()
    const container = btn.closest('.form__container--input');
    const input = container.querySelector('.form__input');
    decrease(input)
    input.value <= 0 ? btn.disabled = true : btn.disabled = false
    gettingTotal()
  }
})
formIncreaseButtons.forEach((btn) => {
  btn.onclick = (e) => {
    e.preventDefault()
    const container = btn.closest('.form__container--input');
    const input = container.querySelector('.form__input');
    const previousButton = container.querySelector('.form-decrease')          
    increase(input)
    input.value <= 0 ? previousButton.disabled = true : previousButton.disabled = false; 
    gettingTotal()
  }
})

changePlanButtons.forEach((btn) => {
  btn.onclick = () => {
    const target = parseInt(btn.getAttribute('data-target'))
    defaultValues(target)
    gettingTotal()
    scrolling(domRect.top)

    
  }

})




/*Modals events*/
//01 Open modal
modalButtons.forEach((btn) =>{
  btn.onclick = () => {
    const modal = btn.getAttribute('data-target');
    document.getElementById(modal).style.display = 'block'
  }        
})
//02 close modal with button
closeBtns.forEach((btn)=>{
  btn.onclick = () => {
    const modal = (btn.closest(".modal").style.display = "none");
  }
})
//03 close modal clicking on window
window.onclick = (e) => {
  if(e.target.className === "modal"){
    e.target.style.display = "none";
  }
}
})
