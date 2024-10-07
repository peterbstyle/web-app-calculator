class Calculator {
    constructor(buttonsSelector, displaySelector, equationDisplaySelector) {
        // Select buttons and display elements
        this.buttons = document.querySelectorAll(buttonsSelector);
        this.display = document.getElementById(displaySelector);
        this.equationDisplay = document.getElementById(equationDisplaySelector);

        // Initialize variables
        this.currentInput = '';
        this.operator = '';
        this.firstOperand = null;
        this.equation = '';
        this.answerDisplayed = false; // Track if the answer has been displayed

        // Bind event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button.textContent));
        });

        document.addEventListener('keydown', (event) => this.handleKeyboardInput(event.key));
    }

    handleButtonClick(value) {
        if (value === 'C') {
            this.clear();
        } else if (value === '=') {
            this.calculate();
        } else {
            this.appendValue(value);
        }
    }

    handleKeyboardInput(key) {
        if (key >= '0' && key <= '9' || ['+', '-', '*', '/'].includes(key)) {
            this.appendValue(key);
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key.toLowerCase() === 'c') {
            this.clear();
        }
    }

    appendValue(value) {
        // Clear previous answer if a new button is pressed
        if (this.answerDisplayed) {
            this.clear(); // Clear the calculator state
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (this.currentInput) {
                this.firstOperand = parseFloat(this.currentInput);
                this.operator = value;
                this.equation += `${this.currentInput} ${this.operator} `;
                this.currentInput = '';
            }
        } else {
            if (value === '.' && this.currentInput.includes('.')) return; // Prevent multiple decimal points
            this.currentInput += value; // Append number
        }
        this.updateDisplay();
    }

    calculate() {
        if (this.firstOperand !== null && this.operator && this.currentInput) {
            const secondOperand = parseFloat(this.currentInput);
            let result;

            // Perform calculation
            switch (this.operator) {
                case '+':
                    result = this.firstOperand + secondOperand;
                    break;
                case '-':
                    result = this.firstOperand - secondOperand;
                    break;
                case '*':
                    result = this.firstOperand * secondOperand;
                    break;
                case '/':
                    if (secondOperand === 0) {
                        alert("Error: Division by zero");
                        return; // Prevent further calculations
                    }
                    result = this.firstOperand / secondOperand;
                    break;
                default:
                    return;
            }

            this.currentInput = result.toString();
            this.equation += `${secondOperand} = ${this.currentInput} `;
            this.updateDisplay();
            this.operator = ''; // Reset operator for next calculation
            this.firstOperand = null; // Reset first operand for new calculation
            this.answerDisplayed = true; // Set flag indicating the answer is displayed
        }
    }

    clear() {
        this.currentInput = '';
        this.operator = '';
        this.firstOperand = null;
        this.equation = '';
        this.answerDisplayed = false; // Reset the answer displayed flag
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.value = this.currentInput || '0';
        this.equationDisplay.value = this.equation; // Update equation display
    }
}

// Initialize the calculator
const calculator = new Calculator('.btn', 'display', 'equationDisplay');
