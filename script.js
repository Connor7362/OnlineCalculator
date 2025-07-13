const operations = document.querySelectorAll(".operation");
const display = document.querySelector("#display"); // ✅ fixed typo
let equation = "";

operations.forEach(op => {
    op.addEventListener("click", (e) => {
        setDisplay(e.target.textContent);
    });
});

function setDisplay(char){
    
    if(legitamacy(char)){

        display.textContent += char;
        equation += char; 
    }
    
}

function legitamacy(char){
    
    if(checkOperator(char) && equation.length < 1){
        console.log("Check 1");
        return false;
    }else if(checkOperator(equation[equation.length - 1]) && checkOperator(char)){
        console.log("Check 2");

        return false;
    }else{
                console.log("Check 3");

        return true;
    }
}

function checkOperator(char){
    switch(char){
        case "+":
        case "-":
        case "x":
        case "/":
            return true;
            break;
        default:
            return false;
    }
}

function add(a , b){
    return a + b;
}

function subtract(a , b){
    return a - b;
}

function multiply(a , b){
    return a * b;
}

function divide(a , b){
    return a / b;
}
}