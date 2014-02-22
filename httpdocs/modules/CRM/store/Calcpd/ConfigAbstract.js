Ext.define('EC.CRM.store.Calcpd.ConfigAbstract', {

    extend: 'Ext.data.Store',
   
    model: 'EC.CRM.model.Calcpd.ConfigAbstract',
    
    apiConfig: {
        create:     '',
        read:       '',
        update:     '',
        destroy:    ''
    },
    
    autoLoad: true,
    
    constructor: function() {
        
        this.proxy = {
            type: 'ajax',
            api: this.apiConfig,
            reader: {
                type: 'json',
                root: 'data',
                successProperty: 'success'
            },
            writer: {
                root: 'data',
                encode: true
            },
            pageParam: undefined,
            startParam: undefined,
            sortParam: undefined,
            limitParam: undefined
        },

        this.callParent(arguments);
        
        this.getProxy().on('exception', function(proxy, response, operation, eOpts) {
            
            switch (operation.action) {
                case 'create': 
                    this.onCreateException.apply(this, arguments);
                    break;
                case 'read': 
                    this.onReadException.apply(this, arguments);
                    break;
                case 'update': 
                    this.onUpdateException.apply(this, arguments);
                    break;
                case 'destroy':
                    this.onDestroyException.apply(this, arguments);
                    break;
            }
            
        }, this);
        
        this.on('write', function(store, operation, eOpts) {
            if ('create' == operation.action) {
                this.onCreateSuccess.apply(this, arguments);
            }
        }, this);
    },
    
    onCreateSuccess: function(store, operation, eOpts) {
        
        var resp = Ext.decode(operation.response.responseText, true);
        
        if (resp && resp.success && resp.id) {
            Ext.each(operation.getRecords(), function(record) {
                record.set('id', resp.id);
                record.commit();
                return false;
            }, this);
        }
    },
    
    onCreateException: function(proxy, response, operation, eOpts) {
        this.rejectChanges();
        Ext.Msg.alert('Ошибка', 'Ошибка создания.');
    },
    
    onReadException: function(proxy, response, operation, eOpts) {
        Ext.Msg.alert('Ошибка', 'Ошибка чтения.');
    },
    
    onUpdateException: function(proxy, response, operation, eOpts) {
        this.rejectChanges();
        Ext.Msg.alert('Ошибка', 'Ошибка сохранения.');
    },
    
    onDestroyException: function(proxy, response, operation, eOpts) {
        this.rejectChanges();
        Ext.Msg.alert('Ошибка', 'Ошибка удаления.');
    }
});