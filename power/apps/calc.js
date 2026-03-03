// PowerOS Calculator Application

class CalculatorApp {
    constructor() {
        this.display = '0';
        this.previousValue = '';
        this.operation = null;
    }

    input(value) {
        if (value === 'C') {
            this.display = '0';
            this.previousValue = '';
            this.operation = null;
        } else if (value === '=') {
            if (this.operation && this.previousValue) {
                try {
                    this.display = String(eval(this.previousValue + this.operation + this.display));
                    this.previousValue = '';
                    this.operation = null;
                } catch (e) {
                    this.display = 'Error';
                }
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (this.operation && this.previousValue) {
                this.display = String(eval(this.previousValue + this.operation + this.display));
            }
            this.previousValue = this.display;
            this.operation = value;
            this.display = '0';
        } else if (value === '.') {
            if (!this.display.includes('.')) {
                this.display += '.';
            }
        } else {
            this.display = this.display === '0' ? value : this.display + value;
        }
        return this.display;
    }

    calculate(expr) {
        try {
            return String(eval(expr));
        } catch (e) {
            return 'Error';
        }
    }
}

module.exports = CalculatorApp;