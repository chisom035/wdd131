function isCardNumberValid(number) {
	return number === '1234123412341234'
}
function displayError(msg) {
	// display error message
	document.querySelector('.errorMsg').innerHTML = msg
}
function submitHandler(event) {
	event.preventDefault()
	let errorMsg = ''
    const cardNumber = document.querySelector('#card-number').value
    const month = document.querySelector('#card-month').value
    const year = document.querySelector('#card-year').value
	console.log(this.cardNumber.value)
	// clear any previous errors
	displayError('')
	// check credit card number
	if (isNaN(this.cardNumber.value)) {
		// it is not a valid number
		errorMsg += 'Card number is not a valid number.\n'
	} else if (!isCardNumberValid(this.cardNumber.value)) {
		// it is a number, but is it valid?
		errorMsg += 'Card number is not a valid card number\n'
	}

    if (!/^\d{1,2}$/.test(month) || !/^\d{2}$/.test(year)) {
    errorMsg += 'Expiration month and year must be numbers<br>'
    } else {
        const expMonthIndex = parseInt(month, 10) - 1
        const expYearFull = 2000 + parseInt(year, 10) 
        const expDate = new Date(expYearFull, expMonthIndex + 1, 0) 
        const today = new Date()
        today.setHours(0, 0, 0, 0) 
        if (expDate < today) {
        errorMsg += 'Expiration date must be in the future<br>'
        }
  }

	if (errorMsg !== '') {
		// Error, stop the form and display the error message.
		displayError(errorMsg)
		return false
	}
	return true
}

document.querySelector('#credit-card').addEventListener('submit', submitHandler)