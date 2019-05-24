const mongoose = require('mongoose');
const personSchema = require('./schemas/person')
const Schema = mongoose.Schema;

const generalSchema = new Schema ({
	person: personSchema,
	role: {
		type: Schema.Types.String,
		enum: ['admin', 'user'],
		default: 'user',
	},
	favorites: [
		{ 
			product: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		},
	],
	orders: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Order',
		}
	],
	isBlocked: {
		type: Schema.Types.Boolean,
		default: false,
	}
}, {
	timestamps: true,
});

const model = mongoose.model('User', generalSchema);
module.exports = model;
