Ext.define('EC.Contractors.view.EngSys', {

    extend: 'Ext.grid.Panel',

    store: 'EC.Contractors.store.EngSys',
    
    alias: ['widget.Contractors-EngSys-list'],
    
    require: ['EC.EngSystemTypes.store.EngSystemTypes'],

    title: false,

    permissions: false,
    
    enableColumnMove: false,
    
    hideHeaders: true,
    
    contractor_id: null,

    initComponent: function() {
        
        this.columns = [{ 
    		dataIndex: 'name', flex: 1 
    	}, {
            xtype: 'checkcolumn',
            align: 'center',
            dataIndex: 'checked',
            listeners: {
                checkchange: this.onCheckChange.bind(this)
            },
            width: 40
        }];

        this.callParent();
    },

    onCheckChange: function(checkColumn, recordIndex, checked, record, dataIndex) {

        var urls = {
            1: '/json/crm/contractors-engsys/add',
            0: '/json/crm/contractors-engsys/delete'
        };
        
        var phrases = {
            1: "Не удалось назначить!",
            0: "Не удалось снять!"
        };

        var failure = function() {
            record.reject();
            Ext.Msg.alert('Ошибка', phrases[checked]);
        };

        Ext.Ajax.request({
            params: {
                contractor_id: this.contractor_id,
                engsystype_id: record.get('id')
            },
            url: urls[checked],
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.commit();
            },
            failure: failure,
            scope: this
        });
    }
});