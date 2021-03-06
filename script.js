//operand ตัวเลข
//operator ตัวดำเนินการ
//10. (+-*/) 0  =  
//! ต้องกด operand ก่อน operator 
//! decimal ต้องมีจุดเดียว

const calculatorDisplay = document.querySelector('h1')

const inputBtn = document.querySelectorAll('button') //array

const clearBtn = document.getElementById('clear-btn') // C


// ตัวเลขที่ 1 ตัวดำเนินการ ตัวเลขที่ 2
// 10          +         20

let firstValue = 0; //ตัวเลข 1
let operatorValue = '' //ตัวดำเนินการ
let waitForNext = false ;  //เอาไว้เช็คว่ามี firstValue และ ตัวดำเนินการและ operator ยัง

const calculate ={
  "/":(firstNumber,secondNumber)=>secondNumber!=0?firstNumber/secondNumber:"error",
  "*":(firstNumber,secondNumber)=>firstNumber*secondNumber,
  "+":(firstNumber,secondNumber)=>firstNumber+secondNumber,
  "-":(firstNumber,secondNumber)=>firstNumber-secondNumber,
  "=":(firstNumber,secondNumber)=>secondNumber
}

function setNumberValue(number){
  if(waitForNext){
    calculatorDisplay.textContent=number;
    waitForNext=false;
  }else{
    //ดึงค่ามาจาก calculatorDisplay
    const displayValue = calculatorDisplay.innerHTML;
    // 0 => 7
    // 5 => 57
    calculatorDisplay.innerHTML = displayValue === '0' ? number : displayValue+number
  }
  
}

function callOpearator(operator){
  //* case ป้อนตัวดำเนินการก่อนป้อนตัวเลข
  const currentValue = Number(calculatorDisplay.textContent)
  if(operatorValue && waitForNext){
    operatorValue=operator;
    return;
  }
  if(!firstValue){
    firstValue =  currentValue; // ค่าเริ่มต้น
  }else{
    const result = calculate[operatorValue](firstValue,currentValue)
    calculatorDisplay.textContent = result
    firstValue = result
    if(firstValue === "error"){
      resetAll()
    }
  }

  operatorValue = operator
  waitForNext = true;
}

function addDecimal(decimal){
  if(waitForNext) return;


  //กรองให้มี . ตัวเดียว
  if(!calculatorDisplay.innerHTML.includes(".")){
    calculatorDisplay.innerHTML = `${calculatorDisplay.innerHTML}.`
  }
  
}

//? กรองข้อมูลปุ่มที่กดเป็น operator หรือ operand
inputBtn.forEach(input=>{
  //* operand (ตัวเลข)
  if(input.classList.length === 0){
    input.addEventListener('click',()=>setNumberValue(input.value));
  }else if(input.classList.contains('operator')){ //*operator
    input.addEventListener('click',()=>callOpearator(input.value))
  }else if(input.classList.contains('decimal')){ //*จุดทศนิยม
    input.addEventListener('click',()=>addDecimal(input.value))
  }
})




clearBtn.addEventListener('click',()=>resetAll())


function resetAll(){
  calculatorDisplay.innerHTML = '0'
  waitForNext=false;
  firstValue = 0;
  
}