Ext.define('MyApp.controller.LoginController', {
    extend: 'Ext.app.Controller',
    views: 'login.Login',

    init: function() {
        this.control({
            'login button[text=Войти]': {click: this.login}
        })
    },

    login: function(button) {
        var form = button.up('form');
        if (form.isValid()) {
            var login = Ext.getCmp('login').getValue();
            var password = Ext.getCmp('password').getValue();
            if (login.trim() === 'admin' && password.trim() === 'padmin') {
                button.up('form').destroy();
                Ext.create('MyApp.view.main.Main', {
                    renderTo: Ext.getBody()
                });
            } else if (login.trim() !== 'admin') {
                Ext.Msg.alert('Ошибка', 'Введен неверный логин');
            } else {
                Ext.Msg.alert('Ошибка', 'Введен неверный пароль');
            }
        }
    }
})