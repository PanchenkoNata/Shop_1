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

const model = mongoose.model('Category', generalSchema);

module.exports = model;
