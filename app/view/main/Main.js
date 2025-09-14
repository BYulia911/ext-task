Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Главное окно',
    xtype: 'mainview',
    width: '100%',
    layout: 'vbox',

    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    text: 'Товары',
                    id: 'addProducts'
                }, {
                    xtype: 'button',
                    text: 'Выйти'
                }]
            },
            {
                xtype: 'tabpanel',
                width: '100%',
                itemId: 'mainTabPanel',
                items: []
            }
        ];

        this.callParent(arguments);
    }
});