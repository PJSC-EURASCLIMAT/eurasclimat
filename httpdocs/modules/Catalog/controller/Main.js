Ext.define('EC.Catalog.controller.Main', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['EC.Catalog.view.Layout'],
    
    viewLayout: 'CatalogPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Catalog.controller.GoodsCatalog').run(container);
        this.getController('EC.Catalog.controller.ServiceCatalog').run(container);
        this.getController('EC.Catalog.controller.VendorCatalog').run(container);
        this.getController('EC.Catalog.controller.NewChapter').run(container);
    },
    
    getMenu: function() {
        return [{
            text: 'Функции раздела'
        }, {
            text: 'Сервисы раздела'
        }, {
            text: 'Документы раздела'
        }, {
            text: 'Конструктор раздела'
        }, {
            text: 'Настройки раздела'    
        }];
    }
});