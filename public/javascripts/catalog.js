

// axios.get('/')



document.addEventListener('DOMContentLoaded', () => {
    // const updated_category = document.querySelector('input[name=updated_cat_name]');
    // const updated_category_name = localStorage.getItem('updatedCategoryName');
    const language = document.querySelector('.language');
    const img_flag = document.querySelector('.language img');
		const locales = document.querySelector('.locales');

		
    language.addEventListener('click', (event) => {
			event.preventDefault();
			
			console.log('classList.toggle');
			console.log(locales.classList);
			locales.classList.toggle('visible');
			console.log(locales.classList);
		});
		

});
