Ext.define('EC.Services.view.TreeGrid', {

    extend: 'xlib.Tree',
    
    alias: ['widget.ServicesTreeGrid'],

    store: 'EC.Services.store.Services',
    
    layout: 'fit',
    
    rootVisible: true,

    hideHeaders: false,
    
    useArrows: true,
    
    scroll: 'vertical',

    showEditAction: true,

    border: false,

    permissions: acl.isUpdate('crm', 'services'),

    addText: 'Добавить услугу',

    columns: [{
        text: 'Профессия',
        flex: 1,
        dataIndex: 'profession_name'
    },{
        text: 'Тип. инж. сис.',
        flex: 1,
        dataIndex: 'eng_sys_type_name'
    },{
        text: 'НЧ',
        width: 50,
        dataIndex: 'norm_hours'
    },{
        text: 'Разряд',
        width: 50,
        dataIndex: 'min_rank'
    }],

    configureTBar: function() {
	
        this.callParent();

        if (this.permissions && !this.isPortlet) {
            Ext.Array.insert(this.tbar, 1, [{
                icon: '/images/icons/folder.gif',
                itemId: 'add-chapter',
                scope: this,
                text: 'Добавить раздел',
                handler: function() {
                    this.create(false);
                }
            }]);
        }
    },

    initComponent: function() {
    	
        this.hideHeaders = this.isPortlet;
        this.editActionConfig.getClass = function(value, meta, record) {
            if (Ext.isEmpty(record.data.service_id)) {
                return 'x-hide-visibility';
            }
        };
        
        this.callParent();
    },

    create: function(isLeaf) {
    	
        var selectedRecords = this.selModel.getSelection(),
            node;

        if (Ext.isArray(selectedRecords)) {
            node = selectedRecords[0];
        } else if (Ext.isObject(selectedRecords)) {
            node = selectedRecords;
        }

        if (!Ext.isEmpty(node) && node.data.leaf) {
            var newNode = node.parentNode.insertBefore({
                leaf: isLeaf,
                text: ''
            }, node.nextSibling);
            this.editing.startEdit(newNode, 0);
            return;
        }

        this.callParent(arguments);
    },

    syncSuccess: function(batch, options) {
    	
        Ext.each(batch.operations, function(op) {
            var result = Ext.JSON.decode(op.response.responseText),
                record = op.records[0];
            if ('create' == op.action && !Ext.isEmpty(result.data)) {
                record.set((record.data.leaf) ? 'service_id' : 'id', result.data.id);
            }
            record.commit();
        });
        this.fireEvent('sync-success');
    }
});