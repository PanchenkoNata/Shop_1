const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalSchema = new Schema ({
	userId: {
        type: Schema.Types.ObjectId,
        rel: 'User',
		required: true,
		minlength: 5,
		maxlength: 500,
		trim: true,
	},
}, {
	timestamps: true,
});

const model = mongoose.model('Review', generalSchema);
module.exports = model;
