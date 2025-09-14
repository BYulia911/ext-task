Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',
    name: 'MyApp',
    appFolder: 'app',

    controllers: [
        'LoginController',
        'MainController'
    ],

    views: [
        'login.Login',
        'main.Main'
    ]
});
