Ext.define('EC.Main.store.News', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.News',
    
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        url: '/json/default/news/index',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});