//operand ตัวเลข
//operator ตัวดำเนินการ
//10. (+-*/) 0  =  
//! ต้องกด operand ก่อน operator 
//! decimal ต้องมีจุดเดียว

const calculatorDisplay = document.querySelector('h1')

const inputBtn = document.querySelectorAll('button') //array

const clearBtn = document.getElementById('clear-btn') // C



function setNumberValue(number){
  //ดึงค่ามาจาก calculatorDisplay
    const displayValue = calculatorDisplay.textContent;
    // 0 => 7
    // 5 => 57
    calculatorDisplay.innerHTML = displayValue === '0' ? number : displayValue+number
}

function callOpearator(operator){
  console.log(operator);
}

function addDecimal(decimal){
  console.log(decimal);
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
}