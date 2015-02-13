'use strict';
angular.module('mean.expenses').controller('ExpensesController', ['$scope', 'Global', 'Expenses', '$http',
    function($scope, Global, Expenses, $http) {

        $scope.global = Global;
        $scope.package = {
            name: 'expenses'
        };

        $scope.openExpensesAddModel = function() {
            $('#expenses-add-modal').modal({
                show: true
            });
        };

        $scope.expensesData = [];
        $scope.getExpences = function() {
            $http.get('http://localhost:3000/expenses/fetch').success(function(data) {
                $scope.expensesData = data;
            });
        }

        $scope.ExpensesAddBtnDisabled = false;
        $scope.ExpensesFormSubmitted = false;
        $scope.saveexpensesData = function() {

            var expensesdata = {};

            if (!$scope.createExpensesForm.$valid) {
                $scope.ExpensesFormSubmitted = true;
                return;
           }

            expensesdata.name = $scope.name;
            expensesdata.description = $scope.description;
            expensesdata.amout = $scope.amout;
            expensesdata.date = $scope.date;
            expensesdata.tags = $scope.tags;

            $scope.ExpensesAddBtnDisabled = true;

            $http.post('/expenses/save', expensesdata).success(function(data) {
                $scope.ExpensesAddBtnDisabled = false;
                $('#expenses-add-modal').modal('hide');
                $scope.name = '';
                $scope.description = '';
                $scope.amout = '';
                $scope.date = '';
                $scope.tags = '';
                $scope.ExpensesFormSubmitted = false;
                $scope.getExpences();
            });
        };


        $scope.deleteExpensesData = function(id) {
            $http.get('/expenses/' + id + '/delete').success(function() {
                $scope.getExpences();
            });
        };

        $scope.closeExpensesbtn = function() {
            $scope.ExpensesFormSubmitted = false;
            $scope.name = '';
            $scope.description = '';
            $scope.amout = '';
            $scope.date = '';
            $scope.tags = '';
        }


        $scope.editExpensesFrm = {};
        $scope.openEditModal = function(expenses) {
            $scope.editExpensesFrm = expenses;
            $("#expenses-edit-modal").modal({
                show: true
            });
        }

        $scope.updateExpensesData = function(expensesFrm) {

            console.log("$scope.editExpensesFrm > akfashjdkf ;ljasdf sadjf lkajsdfl adsf asdf as.df  ", $scope.editExpensesFrm.$valid);

            if (!expensesFrm.$valid) {
                $scope.expensesEditFormSubmitted = true;
                return;
            }
            console.log({
                name: $scope.editExpensesFrm.name,
                description: $scope.editExpensesFrm.description,
                amout: $scope.editExpensesFrm.amout,
                date: $scope.editExpensesFrm.date,
                tags: $scope.editExpensesFrm.tags,

            });

            $http.post('/expenses/' + $scope.editExpensesFrm._id + '/update', {
                name: $scope.editExpensesFrm.name,
                description: $scope.editExpensesFrm.description,
                amout: $scope.editExpensesFrm.amout,
                date: $scope.editExpensesFrm.date,
                tags: $scope.editExpensesFrm.tags,

            }).success(function() {
                $("#expenses-edit-modal").modal('hide');
            });
        };

        $scope.clear = function() {
            $scope.editExpensesFrm.date = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
    }
]);