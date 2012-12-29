Ext.define('EC.Main.store.PersonCard', {

    extend: 'Ext.data.Store',
   
    model: 'EC.Main.model.PersonCard',
    
    proxy: {
        type: 'ajax',
        url: '/json/default/persons/get',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }

});