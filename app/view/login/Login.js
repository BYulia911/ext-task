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
        allowBlank: false,
    }, {
        xtype: 'textfield',
        id: 'password',
        name: 'password',
        fieldLabel: 'Пароль:',
        inputType: 'password',
        allowBlank: false,
    }],

    buttons: [{
        text: 'Войти'
    }]
});