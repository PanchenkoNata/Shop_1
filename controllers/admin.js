const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const i18n = require('i18n');

const config = require('config');

const adminView = async (req, res, next) => {
	res.render('admin', { title: 'Hello Admin', data: {} });
};

const categView = async (req, res, next) => {
	res.render('adminCategories', { title: 'Categories', data: {}, error: false });
};

const categAction = async (req, res, next) => {
	const addDocumInput = req.body.addDocumInput;
	console.log(addDocumInput);
	try {
		const data = {};
	data.documType = 'category';
	data.documName = addDocumInput;
	console.log(data);
	res.render('adminCategories', { title: 'Categories', data: data, error: false });
	} catch (error) {
		res.render('adminCategories', { title: 'Categories', data: data, error: error.message });
	}
	
};

module.exports.adminView = adminView;
module.exports.categView = categView;
module.exports.categAction = categAction;
