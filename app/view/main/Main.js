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
                    handler: this.addProductsTab.bind(this)
                }, {
                    xtype: 'button',
                    text: 'Выйти',
                    handler: function() {
                        this.up('mainview').destroy();
                        Ext.create('MyApp.view.login.Login', {
                            renderTo: Ext.getBody()
                        }).center();
                    }
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
    },

    addProductsTab: function() {
        var store = Ext.create('MyApp.store.ProductsStore');

        var grid = Ext.create('Ext.grid.Panel', {
            title: 'Товары',
            store: store,
            columns: [
                { text: 'ID', dataIndex: 'id', flex: 1 },
                { text: 'Имя', dataIndex: 'name', flex: 1 },
                { text: 'Описание', dataIndex: 'description', flex: 1 },
                { text: 'Цена', dataIndex: 'price', width: 200 },
                { text: 'Количество', dataIndex: 'quantity', flex: 1,
                    renderer: function (value, metaData) {
                        if (value === 0) {
                            metaData.style = 'background-color: red';
                        }
                        return value;
                    }
                 }
            ],
        });

        var tabPanel = this.down('#mainTabPanel');
        tabPanel.add({
            title: 'Товары',
            items: [grid]
        });

        tabPanel.setActiveTab(tabPanel.items.length - 1);
    }
});