// Simple credit card form stuff
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('paymentForm');
    const cardNum = document.getElementById('cardnum');
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    const cvc = document.getElementById('cvc');

    // Make card number look nice with spaces
    cardNum.addEventListener('input', function(e) {
        let val = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let newVal = '';
        for(let i = 0; i < val.length; i++) {
            if(i > 0 && i % 4 === 0) {
                newVal += ' ';
            }
            newVal += val[i];
        }
        e.target.value = newVal;
    });

    // Jump to year when month is filled
    month.addEventListener('input', function(e) {
        if(e.target.value.length === 2) {
            year.focus();
        }
    });

    // Check if month is valid
    month.addEventListener('blur', function(e) {
        let m = parseInt(e.target.value);
        if(m < 1 || m > 12) {
            displayError('Month should be between 01 and 12');
            e.target.focus();
        }
    });

    // Check if year is valid (not in the past)
    year.addEventListener('blur', function(e) {
        const currentYear = new Date().getFullYear() % 100;
        const inputYear = parseInt(e.target.value);
        if(inputYear < currentYear) {
            displayError('Card expiration year cannot be in the past');
            e.target.focus();
        }
    });

    // Check if CVC is valid
    cvc.addEventListener('blur', function(e) {
        if(e.target.value.length !== 3 || isNaN(e.target.value)) {
            displayError('CVC must be 3 digits');
            e.target.focus();
        }
    });

    // Validation functions
    function isCardNumberValid(number) {
        const cleanNumber = number.replace(/\s/g, '');
        return cleanNumber === '1234123412341234';
    }

    function isExpirationDateValid(month, year) {
        // Get current date
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; 
        
        // Convert 2-digit year to 4-digit year
        const fullYear = year < 100 ? 2000 + year : year;
        
        // Create expiration date (last day of the month)
        const expirationDate = new Date(fullYear, month, 0);
        
        // Check if expiration date is in the future
        return expirationDate > currentDate;
    }

    function displayError(msg) {
        // display error message
        document.querySelector('.errorMsg').innerHTML = msg;
    }

    function submitHandler(event) {
        event.preventDefault();
        let errorMsg = '';
        
        // clear any previous errors
        displayError('');
        
        // Get the card number without spaces for validation
        const cardNumberValue = this.cardnum.value.replace(/\s/g, '');
        
        // check credit card number
        if (isNaN(cardNumberValue)) {
            // it is not a valid number
            errorMsg += 'Card number is not a valid number<br>';
        } else if (!isCardNumberValid(this.cardnum.value)) {
            // it is a number, but is it valid?
            errorMsg += 'Card number is not a valid card number<br>';
        }
        
        // Check expiration month
        const monthValue = parseInt(this.month.value);
        if (monthValue < 1 || monthValue > 12) {
            errorMsg += 'Expiration month must be between 01 and 12<br>';
        }
        
        // Check expiration year
        const yearValue = parseInt(this.year.value);
        const currentYear = new Date().getFullYear() % 100;
        if (yearValue < currentYear) {
            errorMsg += 'Card expiration year cannot be in the past<br>';
        }
        
        // Check if expiration date is in the future
        if (monthValue >= 1 && monthValue <= 12 && yearValue >= currentYear) {
            if (!isExpirationDateValid(monthValue, yearValue)) {
                errorMsg += 'Card expiration date must be in the future<br>';
            }
        }
        
        // Check CVC
        const cvcValue = this.cvc.value;
        if (cvcValue.length !== 3 || isNaN(cvcValue)) {
            errorMsg += 'CVC must be exactly 3 digits<br>';
        }
        
        // Check card holder name
        const cardNameValue = this.cardname.value.trim();
        if (cardNameValue === '') {
            errorMsg += 'Card holder name is required<br>';
        }
        
        if (errorMsg !== '') {
            // there was an error. stop the form and display the errors.
            displayError(errorMsg);
            return false;
        }
        
        // If we get here, everything is valid!
        alert('Payment processed successfully! Thank you.');
        this.reset();
        return true;
    }

    // Add the event listener to the form
    document.querySelector('#paymentForm').addEventListener('submit', submitHandler);
});