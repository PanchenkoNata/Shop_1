const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
		minlength: 2,
		maxlength: 20,
		trim: true,
	},
	surname: {
		type: Schema.Types.String,
		required: true,
		minlength: 2,
		maxlength: 20,
		trim: true,
	},
	email: {
		type: Schema.Types.String,
		required: true,
		minlength: 5,
		maxlength: 100,
		trim: true,
		index: true,
		unique: true,
	},
	phone: {
		type: Schema.Types.String,
		required: true,
		minlength: 15,
		maxlength: 15,
		unique: true,
  	},
  	address: {
		type: Schema.Types.String,
		maxlength: 200,
	},
	password: {
		type: Schema.Types.String,
		required: true,
		minlength: 4,
	}
}, {
	_id: false,
});
personSchema.index({ phone: 1, email: 1 }, { unique: true});

// const model = mongoose.model('PersonModel', generalSchema);
module.exports = personSchema;
