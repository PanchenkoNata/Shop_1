document.addEventListener('DOMContentLoaded', () => {
  const categoriesCheckboxList = document.querySelectorAll('.category-checkbox');
  const categoryFromSuperCatList = document.querySelectorAll('.categoryFromSuperCat');
  // const supercatUpd = document.querySelector('.supercategoryUpdated');
  categoriesCheckboxList.forEach((inputItem) => {
    categoryFromSuperCatList.forEach( (categoryItem) => {
      if (inputItem.dataset.categoryid == categoryItem.dataset.category_from_super_cat_id) {
        inputItem.checked = true;
      }
    });
    
  });

}); 