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
        var store = Ext.create('MyApp.store.ProductsStore'),
            grid = Ext.create('Ext.grid.Panel', {
            store: store,

            columns: [
                { text: 'ID', dataIndex: 'id', flex: 1 },
                { text: 'Имя', dataIndex: 'name', flex: 1 },
                { text: 'Описание', dataIndex: 'description', flex: 1 },
                { text: 'Цена', dataIndex: 'price', width: 200 },
                { text: 'Кол-во', dataIndex: 'quantity', flex: 1,
                    renderer: function (value, metaData) {
                        if (value === 0) {
                            metaData.style = 'background-color: red';
                        }
                        return value;
                    }
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

    CellClick: function(grid, record, item, index, e, options) {
        this.openProductCard(record);
    },

    openProductCard: function(record) {
        console.log('Данные товара перед созданием окна:', record.data);
        var productCard = Ext.create('MyApp.view.productcard.ProductCard', {
            productData: record.data
        });
        productCard.show(); 
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