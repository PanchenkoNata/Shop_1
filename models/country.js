const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: false,
		trim: true,
		minlength: 2,
		maxlength: 20
	},
});

const model = mongoose.model('Country', generalSchema);

module.exports = model;
