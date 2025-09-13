Ext.define('MyApp.model.Products', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Имя', type: 'int'},
        {name: 'Описание', type: 'int'},
        {name: 'Цена', type: 'int'},
        {name: 'Количество', type: 'int'}
    ]
})