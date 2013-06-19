Ext.define('EC.Main.store.News.News', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.News.News',
    
    autoLoad: true,
    
    buffered: true,
    
    leadingBufferZone: 15,
    
    pageSize: 15,
    
    sorters: [{
        property: 'date',
        direction: 'DESC'
    }],
    
    proxy: {
        type: 'ajax',
        url: '/json/default/news/index',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});