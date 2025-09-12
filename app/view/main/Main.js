Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Главное окно',
    xtype: 'mainview',
    width: '100%',
    layout: 'vbox',

    items: [{
        xtype: 'container',
        layout: 'hbox',

        items: [{
            xtype: 'button',
            text: 'Товары',
            handler: function() {
                var tabPanel = this.up('mainview').down('tabpanel');
                tabPanel.add({
                    title: 'Товары',
                    html: 'лоаттвылмо',
                    flex: 1,
                })
            }
        }, {
            xtype: 'button',
            text: 'Выйти',
            handler: function() {
                this.up('container').destroy();
                Ext.create('MyApp.view.login.Login', {
                    renderTo: Ext.getBody()
                }).center();
            }
        }]
    },{
        xtype: 'tabpanel',
        width: '100%',
    }, {
        title: 'Главное окно'
    }]
})