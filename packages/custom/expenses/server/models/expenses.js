'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ExpensesSchema = new Schema({
	name: String,
	description: String,
	amout: Number,
	date: Date,
	tags: Array,
});

mongoose.model('expenses', ExpensesSchema);