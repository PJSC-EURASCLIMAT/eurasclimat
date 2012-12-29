Ext.define('EC.Main.view.PersonCard', {

    extend: 'Ext.view.View',

    autoScroll: true,
    
    layout: 'fit',
    
    store: 'EC.Main.store.PersonCard',
    
    padding: 10, 
    
    baseCls: 'x-panel-body',
    
    tpl: '<tpl for=".">Имя: <b>{name}</b> <br/>Роли: <b>{roles}</b></tpl>',
    
    initComponent: function() {
                
        this.callParent(arguments);
    }
});