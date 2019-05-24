document.addEventListener('DOMContentLoaded', () => {
    const updated_category = document.querySelector('input[name=updated_cat_name]');
    const updated_category_name = localStorage.getItem('updatedCategoryName');
    
    updated_category.value = updated_category_name;
    localStorage.removeItem('updatedCategoryName');
});
