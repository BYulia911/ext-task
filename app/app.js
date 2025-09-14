Ext.application({
    extend: 'MyApp.Application',
    name: 'MyApp',
    appFolder: 'app',

    controllers: [
        'LoginController',
        'MainController',
        'ProductCardController'
    ],

    views: [
        'MyApp.view.login.Login',
        'MyApp.view.main.Main',
        'MyApp.view.productcard.ProductCard'
    ],

    models: [
        'Products'
    ],

    stores: [
        'ProductsStore'
    ],

    launch: function() {
        Ext.create('MyApp.view.login.Login', {
            renderTo: Ext.getBody()
        }).center();
    }
});