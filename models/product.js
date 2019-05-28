const mongoose = require('mongoose');
const Review = require('./schemas/review');
const { Schema } = mongoose;

const generalSchema = new Schema({
	name: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		minlength: 1,
        maxlength: 100,
        unique: true,
    },
    vendorCode: {
		type: Schema.Types.String,
		required: true,
		trim: true,
		minlength: 1,
        maxlength: 100,
        index: true,
        unique: true,
    },
    vendors: [{
        type: Schema.Types.ObjectId,
        rel: 'Vendor',
    }],
    brand: {
        type: Schema.Types.ObjectId,
        rel: 'Brand',
    },
    country: {
        type: Schema.Types.ObjectId,
        rel: 'Country',
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    discount: {
        type: Schema.Types.Number,
        default: 1.0,
        min: 0.1,
        max: 1.0
    },
    inStock: {
        type: Schema.Types.Boolean,
        required: true,
        default: true,
        index: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        rel: 'Category',
    },
    tags: [{
        type: Schema.Types.ObjectId,
        rel: 'Tag',
    }],
    reviews: [
        {
            review: Review,
        }
    ],
    hasHystory: {
        type: Schema.Types.Boolean,
        required: true,
        default: false,
    },
    images: [
        {
            type: Schema.Types.String,
        }
    ],
    properties: {
        type: Schema.Types.Array,
    }
});

const model = mongoose.model('Product', generalSchema);

module.exports = model;
