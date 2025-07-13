const operations = document.querySelectorAll(".operation");
        const numbers = document.querySelectorAll(".btn:not(.operation)");
        const display = document.querySelector("#display");
        const clearBtn = document.querySelector("#delete");
        
        let equation = "";
        let symbol = null;
        let number1 = null;
        let number2 = null;
        let waitingForOperand = false;
        let justCalculated = false;

        // Add event listeners for all buttons
        operations.forEach(op => {
            op.addEventListener("click", (e) => {
                setDisplay(e.target.textContent);
            });
        });

        numbers.forEach(num => {
            num.addEventListener("click", (e) => {
                setDisplay(e.target.textContent);
            });
        });

        clearBtn.addEventListener("click", () => {
            clearCalculator();
        });

        function setDisplay(char) {
            // If we just calculated and user enters a number, start fresh
            if (justCalculated && !isNaN(char) && char !== '.') {
                clearCalculator();
                justCalculated = false;
            }

            if (char === '.') {
                handleDecimal();
            } else if (!isNaN(char)) {
                handleNumber(char);
            } else if (checkOperator(char)) {
                handleOperator(char);
            } else if (char === '=') {
                handleEquals();
            }
        }

        function handleNumber(num) {
            if (waitingForOperand) {
                display.textContent = num;
                waitingForOperand = false;
            } else {
                display.textContent = display.textContent === '0' ? num : display.textContent + num;
            }
            justCalculated = false;
        }

        function handleDecimal() {
            if (waitingForOperand) {
                display.textContent = '0.';
                waitingForOperand = false;
            } else if (display.textContent.indexOf('.') === -1) {
                display.textContent += '.';
            }
            justCalculated = false;
        }

        function handleOperator(nextOperator) {
            const inputValue = parseFloat(display.textContent);

            if (number1 === null) {
                number1 = inputValue;
            } else if (symbol && !waitingForOperand) {
                number2 = inputValue;
                const result = operate(symbol, number1, number2);
                
                if (result === "Error") {
                    display.textContent = "Nice try, smarty pants! 🤓";
                    number1 = null;
                    number2 = null;
                    symbol = null;
                    waitingForOperand = true;
                    return;
                }
                
                display.textContent = roundResult(result);
                number1 = result;
                number2 = null;
            }

            waitingForOperand = true;
            symbol = nextOperator;
            justCalculated = false;
        }

        function handleEquals() {
            const inputValue = parseFloat(display.textContent);

            if (number1 !== null && symbol && !waitingForOperand) {
                number2 = inputValue;
                const result = operate(symbol, number1, number2);
                
                if (result === "Error") {
                    display.textContent = "Nice try, smarty pants! 🤓";
                    clearCalculator();
                    return;
                }
                
                display.textContent = roundResult(result);
                number1 = null;
                number2 = null;
                symbol = null;
                waitingForOperand = true;
                justCalculated = true;
            }
        }

        function checkOperator(char) {
            return ['+', '-', 'x', '/'].includes(char);
        }

        function clearCalculator() {
            display.textContent = '0';
            number1 = null;
            number2 = null;
            symbol = null;
            waitingForOperand = false;
            justCalculated = false;
        }

        function roundResult(result) {
            // Round to 10 decimal places to avoid floating point issues
            return Math.round(result * 10000000000) / 10000000000;
        }

        function operate(operator, a, b) {
            switch(operator) {
                case '+':
                    return add(a, b);
                case '-':
                    return subtract(a, b);
                case 'x':
                    return multiply(a, b);
                case '/':
                    return divide(a, b);
                default:
                    return 0;
            }
        }

        function add(a, b) {
            return a + b;
        }

        function subtract(a, b) {
            return a - b;
        }

        function multiply(a, b) {
            return a * b;
        }

        function divide(a, b) {
            if (b === 0) {
                return "Error";
            }
            return a / b;
        }