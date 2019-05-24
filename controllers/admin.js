const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const i18n = require('i18n');

const config = require('config');

const Category = require('models/category');

const adminView = async (req, res, next) => {
	res.render('admin', { title: 'Hello Admin', data: {} });
};

const categView = async (req, res, next) => {
	const categories = await Category.find({}).sort({ name: 1, });
	console.log(categories);
	res.render('adminCategories', { title: 'Categories', categories: categories,  data: {}, error: false });
};

// const categAction = async (req, res, next) => {
// 	const addDocumInput = req.body.addDocumInput;
// 	console.log(addDocumInput);
// 	try {
// 		const data = {};
// 	data.documType = 'category';
// 	data.documName = addDocumInput;
// 	console.log(data);
// 	res.render('adminCategories', { title: 'Categories', data: data, error: false });
// 	} catch (error) {
// 		res.render('adminCategories', { title: 'Categories', data: data, error: error.message });
// 	}
// };

const addCategView = async (req, res, next) => {

	res.render('adminCatAdd', { title: 'Add category', data: {}, error: false, success: false });
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

const updCategView = async (req, res, next) => {
	res.render('adminCatUpdate', { title: 'Update category', data: {}, error: false });
};

const updCategAction = async (req, res, next) => {
	const { updated_cat_name, new_cat_name } = req.body;
	const categoryObj = {
		name: new_cat_name,
	}
	console.log(categoryObj.name);
	try {
		if ( typeof(new_cat_name) != 'string' ) {
			throw new Error('The data is not a string');
		}
		
		const updatedCaregory = await Category.findOne({ 'name': updated_cat_name});
		const newCategory = await Category.findOne({ 'name': new_cat_name});
		if (!updatedCaregory) {
			throw new Error(`The category whis name '${updated_cat_name}' doesn't exist`);
		}
		if (newCategory) {
			throw new Error(`You cannot change the name of category '${updated_cat_name}' to '${new_cat_name}' because it already exist`)
		}
		updatedCaregory.name = new_cat_name;
		await updatedCaregory.save();
		
		res.render('adminCatUpdate', { title: 'Update category', data: categoryObj, error: false });
	} catch (error) {
		res.render('adminCatUpdate', { title: 'Update category', data: categoryObj, error: error.message });
	}	
};


module.exports.adminView = adminView;
module.exports.categView = categView;
module.exports.addCategView = addCategView;
module.exports.addCategAction = addCategAction;
module.exports.updCategView = updCategView;
module.exports.updCategAction = updCategAction;

