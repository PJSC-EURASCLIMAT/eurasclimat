Ext.define('EC.Main.store.News.Card', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.News.Card',
    
    proxy: {
        type: 'ajax',
        url: '/json/default/news/get',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});