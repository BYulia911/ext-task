Ext.define('MyApp.model.Products', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'ID', type: 'int'},
        {name: 'Имя', type: 'string'},
        {name: 'Описание', type: 'string'},
        {name: 'Цена', type: 'float'},
        {name: 'Количество', type: 'int'}
    ]
})