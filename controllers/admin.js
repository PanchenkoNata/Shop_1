const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const i18n = require('i18n');

const config = require('config');

const Category = require('models/category');
const SuperCategory = require('models/superCategory');

const adminView = async (req, res, next) => {
	res.render('admin', { title: 'Hello Admin', data: {} });
};

const categView = async (req, res, next) => {
	const categories = await Category.find({}).sort({ name: 1, });
	res.render('adminCategories', { title: 'Categories', categories: categories,  data: {}, error: false });
};
const superCategView = async (req, res, next) => {
	const superCategories = await SuperCategory.find({}).sort({ name: 1, });
	res.render('adminSuperCategories', { title: 'SuperCategories', superCategories: superCategories,  data: {}, error: false });
};

const addCategView = async (req, res, next) => {
	res.render('adminCatAdd', { title: 'Add category', data: {}, error: false, success: false });
};
const addSuperCategView = async (req, res, next) => {
	const categories = await Category.find({}).sort({ name: 1 });
	res.render('adminSuperCatAdd', { title: 'Add superCategory', categories: categories, data: {}, error: false, success: false });
};

const addCategAction = async (req, res, next) => {
	const { name } = req.body;
	const categoryObj = {
		name: name,
	}

	try {
		if ( typeof(name) != 'string' ) {
			throw new Error('The data is not a string');
		}
		
		const caregory = await Category.findOne({ 'name': name});
		if (caregory) {
			throw new Error('This category already exists');
		}

		const newCategory = new Category(categoryObj);
		await newCategory.save();
		
		res.render('adminCatAdd', { title: 'Add category', data: categoryObj, error: false, success: true, });
	} catch (error) {
		res.render('adminCatAdd', { title: 'Add category', data: categoryObj, error: error.message, success: false });
	}	
};
    
const addSuperCategAction = async (req, res, next) => {
	const { name } = req.body;
	const superCategoryObj = {
		name: name,
		categories: []
	}
	try {
		const categories = await Category.find({}).sort({ name: 1 });

		categories.forEach( (category) => {
			const key = category.name;
			if ( key in req.body ) {
				superCategoryObj.categories.push(req.body[key]);
			};
		});

		if ( typeof(name) != 'string' ) {
			throw new Error('The data is not a string');
		}
		
		const superCaregory = await SuperCategory.findOne({ 'name': name});
		
		if (superCaregory) {
			throw new Error('This category already exists');
		}

		const newSuperCategory = new SuperCategory(superCategoryObj);

		await newSuperCategory.save();
		
		res.render('adminSuperCatAdd', { title: 'Add SuperCategory', categories: categories, data: superCategoryObj, error: false, success: true, });
	} catch (error) {
		res.render('adminSuperCatAdd', { title: 'Add superCategory', categories: [], data: superCategoryObj, error: error.message, success: false });
	};
};

const updCategView = async (req, res, next) => {
	const { id } = req.params;
	const dataObj = {
		updated_cat_name: '',
		new_cat_name: ''
	}
	console.log(id);
	try {
		const category = await Category.findOne({ _id: id});
		dataObj.updated_cat_name = category.name;
		dataObj.new_cat_name = category.name;
		console.log(category.id);
		res.render('adminCatUpdate', { title: 'Update category', data: dataObj, category: category, error: false, success: false });
	} catch (error) {
		res.render('adminCatUpdate', { title: 'Update category', data: dataObj, category: {}, error: false, success: false });
	}
};

const updCategAction = async (req, res, next) => {
	const { updated_cat_name, new_cat_name } = req.body;
	const { id } = req.params;
	const dataObj = {
		id: id,
		updated_cat_name: updated_cat_name,
		new_cat_name: new_cat_name,
	}; 
	try {
		if ( typeof(updated_cat_name) != 'string' && typeof(new_cat_name) != 'string' ) {
			throw new Error('The data is not a string');
		};
		if ( updated_cat_name == '') {
			throw new Error(`You need to chose the category what you want to update`);
		};
		if ( new_cat_name == '' || new_cat_name == updated_cat_name ) {
			throw new Error(`You need to input the new name of category if you want to change it`);
		};

		const updatedCaregory = await Category.findOne({ '_id': id});
		const newCategory = await Category.findOne({ 'name': new_cat_name});

		if (!updatedCaregory) {
			throw new Error(`The category with name '${updated_cat_name}' doesn't exist`);
		};
		if (newCategory) {
			throw new Error(`You cannot change the name of category '${updated_cat_name}' 
						to '${new_cat_name}' because the category with name '${new_cat_name}' already exist`)
		};
		dataObj.updated_cat_name = updatedCaregory.name
		updatedCaregory.name = new_cat_name;
		await updatedCaregory.save();

		console.log('category update was successefuly');
		
		res.render('adminCatUpdate', { 
																	title: 'Update category',
																	category: updatedCaregory, 
																	data: dataObj, 
																	error: false, 
																	success: true 
		});
	} catch (error) {
		res.render('adminCatUpdate', { 
																	title: 'Update category',
																	category: {},
																	data: dataObj, 
																	error: error.message, 
																	success: false 
		});
	}	
};

const updSuperCategView = async (req, res, next) => {
	const { id } = req.params;
	const dataObj = {
		updated_supercat_name: '',
		new_supercat_name: ''
	};
	try {
		const categories = await Category.find({}).sort({ name: 1 });
		const superCaregorytest = await SuperCategory.findOne({ _id: id });
		if ( !superCaregorytest ) {
			throw new Error('This superCaregory don`t exist');
		};
		dataObj.updated_supercat_name = superCaregorytest.name;
		dataObj.new_supercat_name = superCaregorytest.name;
		res.render('adminSuperCatUpdate', { 
																			title: 'Update superCategory', 
																			superCategory: superCaregorytest,
																			superCategoryCategories: superCaregorytest.categories,
																			categories: categories, 
																			data: dataObj, 
																			error: false, 
																			success: false 
		});
	} catch (error) {
		res.render('adminSuperCatUpdate', { 
																			title: 'Update superCategory', 
																			superCategory: {},
																			superCategoryCategories: [],
																			categories: [], 
																			data: dataObj, 
																			error: error.message, 
																			success: false 
		});
	};
};

const updSuperCategAction = async (req, res, next) => {
	const { updated_supercat_name, new_supercat_name } = req.body;
	const { id } = req.params;
	const dataObj = {
		id: id,
		updated_supercat_name: updated_supercat_name,
		new_supercat_name: new_supercat_name,
		categories: []
	};
	try {
		if (typeof(updated_supercat_name) != 'string' && typeof(new_supercat_name) != 'string') {
			throw new Error('The inputed data needs to be string');
		}
		let superCategory = await SuperCategory.findOne({ _id: id });

		console.log('superCategory');
		console.log(superCategory);

		if (!superCategory) {
			throw new Error('Updated superCategory doesn`t exist');
		}

		if (updated_supercat_name !== new_supercat_name) {
			const newSuperCategory = await SuperCategory.findOne({ name: new_supercat_name});
			if (newSuperCategory) {
				throw new Error(`You cannot change the name of superCategory '${updated_supercat_name}' 
				to '${new_supercat_name}' because superCategory with this name exists`);
			}
			superCategory.name = new_supercat_name;
			dataObj.updated_supercat_name = new_supercat_name;
		}
		const categories = await Category.find({}).sort({ name: 1 });
		
		if (categories) {
			superCategory.categories = [];
			categories.forEach( (category) => {
				const key = category.id;
				if (key in req.body) {
					superCategory.categories.push(req.body[key]);
				};
			});
		};
		console.log('superCategory.categories');
		
		superCategory = await superCategory.save();

		console.log(superCategory);
		// console.log(superCategory.categories);
		console.log('superCategory update was successefuly');
		res.render('adminSuperCatUpdate', { 
																			title: 'Update superCategory', 
																			superCategory: superCategory,
																			superCategoryCategories: superCategory.categories,
																			categories: categories, 
																			data: dataObj, 
																			error: false, 
																			success: false 
		});
	} catch (error) {
		res.render('adminSuperCatUpdate', { 
																			title: 'Update superCategory', 
																			superCategory: {},
																			superCategoryCategories: [],
																			categories: [], 
																			data: dataObj, 
																			error: error.message, 
																			success: false 
		});
	};
};


module.exports.adminView = adminView;

module.exports.categView = categView;
module.exports.addCategView = addCategView;
module.exports.addCategAction = addCategAction;
module.exports.updCategView = updCategView;
module.exports.updCategAction = updCategAction;

module.exports.superCategView = superCategView;
module.exports.addSuperCategView = addSuperCategView;
module.exports.addSuperCategAction = addSuperCategAction;
module.exports.updSuperCategView = updSuperCategView;
module.exports.updSuperCategAction = updSuperCategAction;
