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
            grid = Ext.create('Ext.grid.Panel', {
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
                itemclick: this.CellClick.bind(this)
            }
        });

        var tabPanel = button.up('mainview').down('#mainTabPanel');
        tabPanel.add({
            title: 'Товары',
            items: [grid]
        });

        tabPanel.setActiveTab(tabPanel.items.length - 1);
    },

    CellColoring: function(value, metaData) {
        if (value === 0) {
            metaData.style = 'background-color: red';
        }
        return value;
    },

    CellClick: function(grid, record, item, index, e, options) {
        this.openProductCard(record);
    },

    openProductCard: function(record) {
        console.log('Данные товара перед созданием окна:', record.data);
        Ext.create('MyApp.view.productcard.ProductCard', {
            productData: record.data,
            renderTo: Ext.getBody()
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

/*
Ext.define('MyApp.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: ['main.Main'],

    init: function() {
        this.control({
            'mainview button[id=addProducts]': {click: this.addProductsTab},
            'mainview button[text=Выйти]': {click: this.logout}
        })
    },

    addProductsTab: function(button) {
        var store = Ext.getStore('ProductsStore'),
            container = Ext.create('Ext.container.Container', {
                layout: 'vbox',
                items: [
                    {
                        xtype: 'container',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'ID товара',
                                itemId: 'productIdFilter',
                                enableKeyEvents: true,
                                listeners: { keyup: this.onFilterKeyUp.bind(this) }
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Описание товара',
                                itemId: 'productDescriptionFilter',
                                enableKeyEvents: true,
                                listeners: { keyup: this.onFilterKeyUp.bind(this) }
                            }
                        ]
                    }, {
                        xtype: 'gridpanel',
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
                            itemclick: this.CellClick.bind(this)
                        }
                    }
                ]
            });

        var tabPanel = button.up('mainview').down('#mainTabPanel');
        var newTab = tabPanel.add({
            title: 'Список товаров',
            items: [container]
        });

        tabPanel.setActiveTab(newTab);
    },

    CellColoring: function(value, metaData) {
        if (value === 0) {
            metaData.style = 'background-color: red';
        }
        return value;
    },

    CellClick: function(grid, record, item, index, e, options) {
        this.openProductCard(record);
    },

    openProductCard: function(record) {
        console.log('Данные товара перед созданием окна:', record.data);
        Ext.create('MyApp.view.productcard.ProductCard', {
            productData: record.data,
            renderTo: Ext.getBody()
        }).center();
    },

    onFilterKeyUp: function(field, event) {
        if (event.getKey() === Ext.EventObject.ENTER) {
            var mainView = field.up('mainview');
            var productId = mainView.down('#productIdFilter').getValue();
            var productDescription = mainView.down('#productDescriptionFilter').getValue();

            // Вызов метода фильтрации
            mainView.filterProducts(productId, productDescription);
        }
    },

    filterProducts: function(productId, productDescription) {
        var store = Ext.getStore('ProductsStore');

        // Применяем фильтры
        store.clearFilter(true); // Сначала очищаем все фильтры

        // Фильтр по идентификатору товара
        if (productId) {
            store.filterBy(function(record) {
                return record.get('id') === productId; // Точное совпадение
            });
        }

        // Фильтр по описанию товара
        if (productDescription) {
            store.filterBy(function(record) {
                return record.get('name').toLowerCase().includes(productDescription.toLowerCase()); // Вхождение строки
            });
        }
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
*/