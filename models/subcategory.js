const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 50
	},
});

const model = mongoose.model('SubCategory', generalSchema);

module.exports = model;
