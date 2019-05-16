document.addEventListener('DOMContentLoaded', () => {
	const formElem = document.querySelector('form');
	const emailField = document.querySelector('input[name=email');

	formElem.addEventListener('submit', () => {
		// for autocomplete form on page "Log In"
		localStorage.setItem('userEmail', emailField.value);
	});
});
