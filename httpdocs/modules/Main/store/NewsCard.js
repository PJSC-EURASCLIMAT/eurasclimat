Ext.define('EC.Main.store.NewsCard', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.NewsCard',
    
    proxy: {
        type: 'ajax',
        url: '/json/default/news/get',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});