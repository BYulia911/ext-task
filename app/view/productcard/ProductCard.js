Ext.define('MyApp.view.productcard.ProductCard', {
    extend: 'Ext.panel.Panel',
    xtype: 'productcard',

    title: 'Карточка товара',
    modal: true,
    layout: 'fit',
    width: 400,
    height: 300,

    initComponent: function() {
        var me = this;
        
        if (!me.productData) {
            console.error('Нет данных для отображения карточки товара.');
            return;
        }

        console.log('Данные в ProductCard:', me.productData);

        Ext.apply(me, {
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'ID',
                        name: 'id',
                        value: me.productData.id || 'Не указано'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Имя',
                        name: 'name',
                        value: me.productData.name || 'Не указано'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Цена',
                        name: 'price',
                        inputType: 'number',
                        value: (me.productData.price !== undefined ? me.productData.price : 'Не указано')
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Кол-во',
                        name: 'quantity',
                        inputType: 'number',
                        value: (me.productData.quantity !== undefined ? me.productData.quantity : 'Не указано')
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
        });

        me.callParent(arguments);
    }
});
