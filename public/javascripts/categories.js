


document.addEventListener('DOMContentLoaded', () => {

	const categories = document.querySelector('.categories-list');

	categories.addEventListener('click', (event) => {
		const selectedItem = event.target;
		let categoryName;
		if ( selectedItem != 'li' ) {
			const parentElement = selectedItem.parentElement;
			if ( parentElement == 'li' ) {
				return;
			}
			categoryName = parentElement.dataset.categoryname;
		};
		localStorage.setItem('updatedCategoryName', categoryName);
		// console.log(localStorage.getItem('selectedCategoryName'));
	});


});

