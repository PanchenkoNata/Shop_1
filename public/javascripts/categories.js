


document.addEventListener('DOMContentLoaded', () => {

	const categories = document.querySelector('.categories-list');

	categories.addEventListener('click', (event) => {
		const selectedItem = event.target;
		let categoryName;
		console.log(selectedItem);
		if ( selectedItem != 'li' ) {
			const parentElement = selectedItem.parentElement;
			console.log(parentElement);
			if ( parentElement == 'li' ) {
				return;
			}
			categoryName = parentElement.dataset.categoryname;
			console.log(parentElement.dataset.categoryname);
		} 
		// const categoryId = selectedLi.dataset.categoryId;
		console.log(categoryName);
		// localStorage.set('selectedCategoryId', categoryId);
		localStorage.setItem('updatedCategoryName', categoryName);
		// console.log(localstorage.get('selectedCategoryId'));
		console.log(localStorage.getItem('updatedCategoryName'));
		// console.log(localStorage.getItem('selectedCategoryName'));
	});


});

