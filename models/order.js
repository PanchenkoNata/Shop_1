const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({
	customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
		required: true,
    },
}, {
    timestamps: true,
});

const model = mongoose.model('Order', generalSchema);

module.exports = model;
