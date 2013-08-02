Ext.define('EC.Main.controller.1C', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['EC.Main.view.1C'],
    
    viewLayout: '1CPanel',
    
    init: function() {
        
        var container = this.getContainer();
        container.fireEvent('activate');
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