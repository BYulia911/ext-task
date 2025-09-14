Ext.application({
    extend: 'MyApp.Application',
    name: 'MyApp',
    appFolder: 'app',

    controllers: [
        'LoginController',
        'MainController'
    ],

    views: [
        'MyApp.view.login.Login',
        'MyApp.view.main.Main'
    ],

    launch: function() {
        Ext.create('MyApp.view.login.Login', {
            renderTo: Ext.getBody()
        }).center();
    }
});