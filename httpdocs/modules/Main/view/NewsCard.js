Ext.define('EC.Main.view.NewsCard', {

    extend: 'Ext.view.View',

    autoScroll: true,
    
    layout: 'fit',
    
    store: 'EC.Main.store.NewsCard',
    
    padding: 10, 
    
    baseCls: 'x-panel-body',
    
    tpl:'<tpl for=".">' +
        '<p style="color: grey; padding-bottom: 10px;">{date}</p>' +
        'Автор: <a href="#">{author}</a> ' +
        'Категория: <a href="#">{category}</a>' +
        '<br/><br/>{long_text}</tpl>',
    
    initComponent: function() {
                
        this.callParent(arguments);
    }
});