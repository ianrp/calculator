let displayVal = 0,
    oldVal = 0,
    newVal = null,
    op = null,
    fresh = true;

const display = document.querySelector(".display");

// add listener to each calculator button to handle input
document.querySelector(".buttons").childNodes.forEach((button) => 
    button.addEventListener("mousedown", handleInput));

// check class of element which calls this and handle according to button type
function handleInput() {
    
    if (this.classList.contains("clear")) {
        
        displayVal = 0;
        oldVal = 0;
        newVal = null;
        op = null;
        fresh = true;

    } else if (this.classList.contains("number")) {

        // reset values for new operation
        if (fresh) { 
            oldVal = 0;
            newVal = 0;       
            op = null;
            fresh = false;
        }

        // append digit to current value
        newVal = newVal * 10 + +this.textContent;
        displayVal = newVal;

    } else if (this.classList.contains("operator")) {

        // ongoing operation
        if (!fresh) {
            // if chained operation, resolve previous one first
            if (op) oldVal = operate(op, oldVal, newVal);
            // otherwise store last entered value as old value
            else oldVal = newVal;
        }
        
        // note that the same old value is kept for a fresh operation
        // so that pressing an operator just after pressing enter uses the previous result

        fresh = false;
        op = this.textContent;
        newVal = null;
        displayVal = oldVal;

    } else if (this.classList.contains("equals")) {

        // if an operator is stored, calculate result and store as old value
        if (op) {
            fresh = true;
            if (newVal !== null) {
                oldVal = operate(op, oldVal, newVal);
                displayVal = oldVal;     
            // except when there's no second operand, just reset operator
            } else {
                op = null;
            }  
        }
        // the new value is always preserved so that pressing equals again will repeat the operation
    }

    display.textContent = displayVal; // update display
}

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
    return a * b;
};

const divide = function(a, b) {
    return a / b;
};

const operate = function(op, a, b) {
    switch (op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return divide(a, b);
    }
};