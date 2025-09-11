Ext.application({
    name: 'MyApp',
    extend: 'MyApp.Application',

    requires: [
        'MyApp.view.login.Login',
        'MyApp.view.main.Main'
    ],

    launch: function() {
        Ext.create('MyApp.view.login.Login', {
            renderTo: Ext.getBody()
        }).center();
    }
});