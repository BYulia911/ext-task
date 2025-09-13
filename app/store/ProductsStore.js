Ext.define('MyApp.store.ProductsStore', {
    extend: 'Ext.data.Store',
    model: 'MyApp.model.Products',

    data: [
        {id: 1, name: 'Lenovo IdeaPad 3', description: 'Ноутбук с процессором Intel Core i5-1135G7, 8 ГБ ОЗУ, 256 ГБ SSD, встроенной графикой Intel Iris Xe.', price: 100, quantity: 5},
        {id: 2, name: 'ASUS VivoBook 15', description: 'Ноутбук с процессором Intel Core i3-1115G4, 8 ГБ ОЗУ, 256 ГБ SSD, встроенной графикой Intel UHD.', price: 60, quantity: 3},
        {id: 3, name: 'Acer Aspire 5', description: 'Ноутбук с процессором AMD Ryzen 5 5500U, 8 ГБ ОЗУ, 512 ГБ SSD, встроенной графикой AMD Radeon.', price: 50, quantity: 0}
    ]
})