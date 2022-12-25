const maxDisplayLength = 12;
const ePrecision = 6;

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

    } else if (this.classList.contains("backspace")) {
        
        if (!fresh) {
            displayVal = displayVal.slice(0, -1);
            newVal = +displayVal;
        }

    } else if (this.classList.contains("number")) {

        // reset values for new operation
        if (fresh) {    
            op = null;
            fresh = false;
        }
        
        if (newVal === null) displayVal = "";

        if (displayVal.length >= maxDisplayLength) return;

        displayVal += this.textContent;
        newVal = +displayVal;      

    } else if (this.classList.contains("decimal")) {     

        if (fresh) { 
            op = null;
            fresh = false;
        }

        if (newVal === null) {
            displayVal = 0;
            newVal = 0;
        }

        if(!displayVal.toString().includes("."))
            displayVal += ".";

    } else if (this.classList.contains("operator")) {

        // ongoing operation
        if (!fresh && newVal !== null) {
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
        displayVal = fitInDisplay(oldVal.toString());

    } else if (this.classList.contains("equals")) {

        // if an operator is stored, calculate result and store as old value
        if (op) {
            fresh = true;
            if (newVal !== null) {
                oldVal = operate(op, oldVal, newVal);
                displayVal = fitInDisplay(oldVal.toString())  
            // except when there's no second operand, just reset operator
            } else {
                op = null;
            }  
        }
        // the new value is always preserved so that pressing equals again will repeat the operation
    }

    display.textContent = displayVal; // update display
}

function fitInDisplay(n) {
    // if more than maximum # of digits before decimal, convert to exponential notation
    if (n.split(".")[0].length > maxDisplayLength || n.includes("e"))
        return (+n).toExponential(ePrecision).toString();

    // otherwise if the length still exceeds maximum then truncate
    // (this will only cut off digits after the decimal)
    if (n.length > maxDisplayLength)
        return n.slice(0, maxDisplayLength + 1);

    return n;
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