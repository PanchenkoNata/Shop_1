const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const generalSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 50
	},
	categories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Category',
		}
	]
});

const model = mongoose.model('ProductType', generalSchema);

module.exports = model;
