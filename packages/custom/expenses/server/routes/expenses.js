'use strict';

var mongoose = require('mongoose');




// The Package is past automatically as first parameter
module.exports = function(Expenses, app, auth, database) {

    app.get('/expenses/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/expenses/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/expenses/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/expenses/example/render', function(req, res, next) {
        Expenses.render('index', {
            package: 'expenses'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.post('/expenses/save', function(req, res, next) {

        var expensesModel = mongoose.model('expenses');

        var expensesForm = expensesModel({
            name: req.body.name,
            description: req.body.description,
            amout: req.body.amout,
            date: req.body.date,
            tags: req.body.tags
        });

        expensesForm.save(function(err, data) {
            res.json({
                status: true
            });
        });
    });

    app.get('/expenses/fetch', function(req, res, next) {
        var expensesModel = mongoose.model('expenses');
        expensesModel.find().exec(function(err, result) {
            res.json(result);
        });
    });

    app.get('/expenses/:id/delete', function(req, res, next) {
        var expensesModel = mongoose.model('expenses');
        expensesModel.find({
            _id: req.params.id
        }).remove(function(err, data) {
            res.json({
                err: err,
                data: data
            });
        });
        // var expensesModel = mongoose.model('expenses');
        // expensesModel.find().exec(function(err, result) {
        //     res.json(result);
        // });
    });

    app.post('/expenses/:id/update', function(req, res, next) {

        var expensesModel = mongoose.model('expenses');

        // var updateData = {
        //     name: req.body.name,
        //     description: req.body.description,
        //     amout: req.body.amout,
        //     date: req.body.date
        // }
        //     expensesModel.update({
        //         _id: req.params['id']
        //     }, updateData, function(err, result) {
        //         res.json({
        //             error: err
        //         })
        //     });

        expensesModel.findOne({
            _id: req.params.id
        }, function(err, expenses) {

            expenses.name = req.body.name;
            expenses.description = req.body.description;
            expenses.amout = req.body.amout;
            expenses.date = req.body.date;
            expenses.tags = req.body.tags;

            console.log("expenses > ", expenses);

            expenses.save(function(err, result) {
                res.send({
                    error: err,
                    result: result
                });
            });
        });
    });

};