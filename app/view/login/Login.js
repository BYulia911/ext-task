Ext.define('MyApp.view.login.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'login',
    title: 'Авторизация',
    bodyPadding: 5,
    width: 350,
    
    items: [{
        xtype: 'textfield',
        id: 'login',
        name: 'login',
        fieldLabel: 'Логин:',
        allowBlank: false
    }, {
        xtype: 'textfield',
        id: 'password',
        name: 'password',
        fieldLabel: 'Пароль:',
        inputType: 'password'
    }],

    buttons: [{
        text: 'Войти',
        handler: function() {
            var login = Ext.getCmp('login').getValue();
            var password = Ext.getCmp('password').getValue();
            if (login.trim() === 'admin' && password.trim() === 'padmin') {
                this.up('form').destroy();
                Ext.create('MyApp.view.main.Main', {
                    renderTo: Ext.getBody()
                });
            }
        }
    }]
});