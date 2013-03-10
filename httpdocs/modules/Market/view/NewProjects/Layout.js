Ext.define('EC.Market.view.NewProjects.Layout', {

    extend: 'App.view.PortalLayoutAbstarct',

    title: 'Новые проекты',
    
    icon: '/images/icons/about.png',
    
    items: [{
        title: 'Панель виджетов',
        xtype: 'portalpanel',
        border: false,
        closable: false,
        columns: 3,
        items: [{
            id: 'Market-NewProjects-column-1'
        }, {
            id: 'Market-NewProjects-column-2'
        }, {
            id: 'Market-NewProjects-column-3'
        }]
    }]
});