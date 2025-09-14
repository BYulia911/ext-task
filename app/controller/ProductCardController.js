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
                if (record.get('price') !== Number(values.price)) {
                    changes.price = Number(values.price);
                }
                if (record.get('quantity') !== Number(values.quantity)) {
                    changes.quantity = Number(values.quantity);
                }

                if (Object.keys(changes).length > 0) {
                    record.set(changes);
                    record.commit();
                    var grids = Ext.ComponentQuery.query('grid');
                    Ext.each(grids, function(grid) {
                        grid.getView().refresh();
                    });
                    console.log('Обновленные данные:', record.getData());
                    Ext.Msg.alert('Успех', 'Данные успешно обновлены.');
                    productCard.close();
                } else {
                    Ext.Msg.alert('Информация', 'Нет изменений для сохранения.');
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
