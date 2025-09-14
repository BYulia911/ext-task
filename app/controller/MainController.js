Ext.define('MyApp.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: 'main.Main',

    init: function() {
        this.control({
            'mainview button[id=addProducts]': {click: this.addProductsTab},
            'mainview button[text=Выйти]': {click: this.logout}
        })
    },

    addProductsTab: function(button) {
        var store = Ext.getStore('ProductsStore'),
            filterContainer = Ext.create('Ext.panel.Panel', {
            title: 'Список товаров',
            layout: 'vbox',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'ID:',
                    itemId: 'idFilter',
                    emptyText: 'Введите фильтр...',
                    enableKeyEvents: true,
                    listeners: {
                        keyup: this.FilterKeyUp.bind(this)
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Описание:',
                    itemId: 'descriptionFilter',
                    emptyText: 'Введите фильтр...',
                    enableKeyEvents: true,
                    listeners: {
                        keyup: this.FilterKeyUp.bind(this)
                    }
                }
            ]
        });
            var grid = Ext.create('Ext.grid.Panel', {
                store: store,
                columns: [
                    { text: 'ID', dataIndex: 'id', flex: 1 },
                    { text: 'Имя', dataIndex: 'name', flex: 1 },
                    { text: 'Описание', dataIndex: 'description', flex: 1 },
                    { text: 'Цена', dataIndex: 'price', width: 200 },
                    { text: 'Кол-во', dataIndex: 'quantity', flex: 1,
                        renderer: this.CellColoring
                    }
                ],
                listeners: {
                    cellclick: (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) => {
                        if (cellIndex === 1) {
                            console.log('OK');
                            this.openProductCard(record);
                        }
                    }
                }

            });


        var tabPanel = button.up('mainview').down('#mainTabPanel');

        var newTab = tabPanel.add({
            title: 'Товары',
            items: [filterContainer, grid]
        });
        tabPanel.setActiveTab(newTab);
    },

    CellColoring: function(value, metaData) {
        if (value === 0) {
            metaData.style = 'background-color: red';
        }
        return value;
    },

    FilterKeyUp: function(field, event) {
        if (event.getKey() === Ext.EventObject.ENTER) {
            var mainView = field.up('mainview');
            var productId = Number(mainView.down('#idFilter').getValue());
            var productDescription = mainView.down('#descriptionFilter').getValue();
            this.filterProducts(productId, productDescription);
        }
    },

    filterProducts: function(productId, productDescription) {
        var store = Ext.getStore('ProductsStore');
        store.clearFilter(true);

        if (productId) {
            store.addFilter({
                property: 'id',
                value: Number(productId),
                operator: '='
            });
        }

        if (productDescription) {
            store.addFilter({
                property: 'name',
                value: productDescription,
                operator: 'like'
            });
        }
    },

    openProductCard: function(record) {
        console.log('Данные товара перед созданием окна:', record.data);
        Ext.create('MyApp.view.productcard.ProductCard', {
            floating: true,
            modal: true,
            productData: record.data,
            renderTo: Ext.getBody(),
            style: {
                zIndex: 1000
            }
        }).center();
    },

    logout: function(button) {
        var mainView = button.up('mainview');
        mainView.destroy();
        var loginView = Ext.create('MyApp.view.login.Login', {
            renderTo: Ext.getBody()
        }).center();

        var loginField = loginView.down('#login');
        var passwordField = loginView.down('#password');

        loginField.reset();
        passwordField.reset();
    }
})