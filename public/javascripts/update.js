
{/* <form action='' method='POST' class='update_category'>
							<label>from: <input type='text' name='updated_cat_name' value=''></label>
							<label>to: <input type='text' name='new_cat_name' value=''>
							</label> */}

document.addEventListener('DOMContentLoaded', () => {

    const updated_category = document.querySelector('input[name=updated_cat_name]');
    // const new_category = document.querySelector('input[name=new_cat_name]');
    const updated_category_name = localStorage.getItem('updatedCategoryName');
    
    updated_category.value = updated_category_name;
    
    
    // updatedCategory.innerHTML = categoryName;
    // updatedCategory.dataset.updated_cat_name = updated_cat_name;
    console.log('000');
    console.log(updated_category_name);
    console.log('888');

});

