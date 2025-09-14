Ext.define('MyApp.Application', {
    extend: 'Ext.app.Application',
    name: 'MyApp',
    appFolder: 'app',

    controllers: [
        'LoginController',
        'MainController',
        'ProductCardController'
    ],

    views: [
        'login.Login',
        'main.Main',
        'productcard.ProductCard'
    ],

    models: [
        'Products'
    ],

    stores: [
        'ProductsStore'
    ]
});
