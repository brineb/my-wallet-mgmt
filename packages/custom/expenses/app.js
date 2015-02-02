'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Expenses = new Module('expenses');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Expenses.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Expenses.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Expenses.menus.add({
    title: 'expenses example page',
    link: 'expenses example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Expenses.aggregateAsset('css', 'expenses.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Expenses.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Expenses.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Expenses.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Expenses;
});
