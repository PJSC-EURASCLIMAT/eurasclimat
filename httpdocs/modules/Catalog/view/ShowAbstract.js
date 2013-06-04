Ext.define('EC.Catalog.view.ShowAbstract', {
    
    extend: 'Ext.window.Window',
    
    title: 'Карточка товара',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    resizable: true,
    
    maximizable: true,
    
    modal: true,

    width: 1000,
    
    height: 600,
    
    showTpl: null,
    
    items: [{
        xtype: 'panel',
        layout: 'fit',
        autoScroll: true
    }],
    
    comboRenderer: function(storeName, value) {
        var store = Ext.getStore(storeName);
        var idx = store.find('id', value);
        if (idx == -1) return value;
        var rec = store.getAt(idx);
        return rec.get('name');
    }
});