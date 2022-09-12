class Calculator {
    constructor(prevOperandText, currentOperandText) {
        this.prevOperandText = prevOperandText;
        this.currentOperandText= currentOperandText
        this.clear()
    }

    clear() {
         this.currentOperand = ''
         this.prevOperand = ''
         this.operation = undefined
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
       if(number == "." && this.currentOperand.includes('.')) return 
        this.currentOperand = this.currentOperand.toString() + number.toString() 
    }
    chooseOperation(operation){
       if(this.currentOperand == "") return 
       if(this.prevOperand !== "") {
        this.compute()
       }
        this.operation = operation;
        this.prevOperand = this.currentOperand
        this.currentOperand = ""
    }
    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return 
        switch(this.operation) {
            case '+' :
             computation = prev + current
             break
            case 'x' :
             computation = prev * current
             break 
            case '/' :
             computation = prev / current
             break
            case '-' :
             computation = prev - current
             break
            default:
                return
        }
        this.currentOperand = computation
        this.prevOperand = ""
        this.operation = undefined
    }
    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        if(this.operation !=  null){
            this.prevOperandText.innerHTML = 
             `${this.prevOperand} ${this.operation}`
        } 
        else {
           this.prevOperandText.innerText = this.prevOperand;
        }
    }
}

const links = document.querySelectorAll("link");
const toggleBtn = document.querySelectorAll("input");
const prevOperandText = document.querySelector("[data-previous-operand]");
const currentOperandText = document.querySelector("[data-current-operand]");
const deleteBtn = document.querySelector("[data-delete]");
const resultBtn = document.querySelector("[data-output]");
const resetBtn = document.querySelector("[data-reset]");
const operands = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");

const calculator = new Calculator(prevOperandText, currentOperandText);

function themeChange(i) {
    if(i === "0"){
        links[2].setAttribute("href", "");
    } else {
        links[2].setAttribute("href", `css/theme${i}.css`);
    }
}
toggleBtn.forEach(btn =>{
    btn.addEventListener('click', () =>{
        themeChange(btn.value)
    })
})
operands.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})
operatorBtn.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})
resultBtn.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()

})
resetBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})