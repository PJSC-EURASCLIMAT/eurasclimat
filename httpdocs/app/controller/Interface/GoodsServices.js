Ext.define('App.controller.Interface.GoodsServices', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.GoodsServices'],
    
    viewLayout: 'CatalogPanel',
    
    init: function() {
        
        var container = this.getContainer();
        
        this.getController('EC.Catalog.controller.GoodsCatalog').run(container);
        /*
        this.getController('EC.Catalog.controller.VendorCatalog').run(container);
        this.getController('EC.Catalog.controller.NewChapter').run(container);
        */
    },
    
    getMenu: function() {
        return [
        /*
            {
            text: 'Функции',
            icon: '/images/icons/features.png'
        }, {
            text: 'Сервисы',
            icon: '/images/icons/services.png'
        }, {
            text: 'Документы',
            icon: '/images/icons/documents.png'
        }, {
            text: 'Конструктор',
            icon: '/images/icons/constructor.png'
        }, {
            text: 'Настройки',
            icon: '/images/icons/settings.png'
        }
        */
        ];
    }
});