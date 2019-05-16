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
	subcats: [
		{
			subcat: {
				type: Schema.Types.ObjectId,
				ref: 'SubCategory',	
			},
		}
	]
});

const model = mongoose.model('Category', generalSchema);

module.exports = model;
