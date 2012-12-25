Ext.define('EC.Admin.view.Workers', {

    extend: 'Ext.grid.Panel',
    
    alias: ['widget.WorkersList'],
    
    store: 'EC.Main.store.Workers',
    
    layout: 'fit',
    
    border: false,
    
    initComponent: function() {
        
        this.columns = [{
            header: 'Имя',
            dataIndex: 'name',
            flex: .5,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            header: 'Роли',
            dataIndex: 'roles',
            flex: .5,
            renderer: function(value) {
                if (Ext.isArray(value)) {
                    var roles = [];
                    Ext.each(value, function(v) {
                        roles.push(v.name);
                    });
                    return roles.join(', ');
                } else {
                    return value;
                }
            }
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 10,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});