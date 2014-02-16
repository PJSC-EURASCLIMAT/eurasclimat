Ext.define('EC.CRM.view.Calcpd.ConfigListAbstract', {

    extend: 'Ext.grid.Panel',

    layout: 'fit',
    
    store: null,
    
    border: false,
    
    tbar: [{
        xtype: 'button',
        text: 'Добавить',
        iconCls: 'add',
        action: 'additem'
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }],
    
    initComponent: function() {
        
        var actions = [{
            icon: '/images/icons/edit.png',
            tooltip: 'Редактировать',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
        }, {
            icon: '/images/icons/fam/delete.gif',
            tooltip: 'Удалить',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
        }];
        
        this.columns = [{
            header: 'ID',
            dataIndex: 'id',
            width: 50
        }, {
            header: 'Имя',
            dataIndex: 'name',
            flex: 1
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.callParent(arguments);
    }
});