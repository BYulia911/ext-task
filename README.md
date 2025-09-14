# ext-task

Это тестовое задание, разработанное с использованием Ext.js, предназначенное для управления товарами.

## Установка

Для установки и запуска проекта выполните следующие шаги:

1. Клонируйте репозиторий:
   git clone https://github.com/BYulia911/ext-task.git

2. Перейдите в директорию проекта:
    cd EXT-TASK

3. Установите необходимые зависимости (если есть):
    npm install

4. Установите http-server, если он еще не установлен:
    npm install -g http-server

5. Запустите проект с помощью http-server:
    http-server -p 8080

6. Откройте браузер и перейдите по адресу http://localhost:8080

# Использование ИИ

Во время разработки использовалась модель ChatGPT от OpenAI, версия - GPT-4.

Данная модель помогла написаnь код для фильтров, реализацию передачи данных товара в карточку товара, а также обновление данных товара при нажатии кнопки "Сохранить" в карточке товара.

Запросы:

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
Создай в контейнере filterContainer два фильтра: по id товара (точное совпадение) и по описанию товара (вхождение значения поиска в имя товара)
----------------------------------------------------------------------------------------------------------------------------------------
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
            })
}
Ext.define('MyApp.view.productcard.ProductCard', {
    extend: 'Ext.panel.Panel',
    xtype: 'productcard',

    title: 'Карточка товара',
    layout: 'fit',
    width: 400,
    height: 300,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
                items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'ID',
                    name: 'id'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Имя',
                    name: 'name'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Цена',
                    name: 'price',
                    inputType: 'number'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Кол-во',
                    name: 'quantity',
                    inputType: 'number'
                }
            ]
        }],
        buttons: [{
            text: 'Сохранить',
            handler: function() {
                var controller = MyApp.app.getController('ProductCardController');
                controller.onSaveButtonClick(this);
            }
        }, {
            text: 'Отмена',
            handler: function() {
                me.close();
            }
        }]
    }
});

Как передать данные товара в карточку товара?
----------------------------------------------------------------------------------------------------------------------------------------
Ext.define('MyApp.controller.ProductCardController', {
    extend: 'Ext.app.Controller',
    views: 'productcard.ProductCard',

    init: function() {
        this.control({
            'productcard button[text=Сохранить]': { click: this.onSaveButtonClick }
        });
    },

    onSaveButtonClick: function(button) {
        var productCard = button.up('productcard');
        var form = productCard.down('form').getForm();

        if (form.isValid()) {
            var values = form.getValues();
            var store = Ext.getStore('ProductsStore');
            var productId = productCard.productData.id;

            var record = store.getById(productId);
            if (record) {
                var changes = {};
                var price = Number(values.price);
                var quantity = Number(values.quantity);

                if (price < 0) {
                    Ext.Msg.alert('Ошибка', 'Цена не может быть отрицательной.');
                    return;
                }
                if (quantity < 0) {
                    Ext.Msg.alert('Ошибка', 'Количество не может быть отрицательным.');
                    return;
                }

                if (record.get('price') !== price) {
                    changes.price = price;
                }
                if (record.get('quantity') !== quantity) {
                    changes.quantity = quantity;
                }
                productCard.close();
            } else {
                Ext.Msg.alert('Ошибка', 'Продукт не найден в хранилище.');
            }
        } else {
            Ext.Msg.alert('Ошибка', 'Пожалуйста, исправьте ошибки в форме.');
        }
    }
});
Как изменить данные товара, если введенные данные отличаются от имеющихся?