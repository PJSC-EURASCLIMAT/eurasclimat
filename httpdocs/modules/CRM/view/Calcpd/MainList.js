Ext.define('EC.CRM.view.Calcpd.MainList', {

    extend: 'Ext.grid.Panel',

    layout: 'fit',
    
    store: 'EC.CRM.store.Calcpd.Main',
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    sortableColumns: false,
    
    initComponent: function() {
        
        var actions = [];
        
        if (acl.isUpdate('calcpd')) {
            
            actions.push({
                icon: '/images/icons/edit.png',
                tooltip: 'Редактировать',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
            
            actions.push({
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
                },
                scope: this
            });
        }
        
        this.columns = [{
            header: 'Наименование',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Тип объекта',
            dataIndex: 'obj_type_name',
            width: 300
        }, {
            xtype: 'templatecolumn',
            header: 'Создал',
            tpl: '<a href="#/profile/{account_id}/show">{account_name}</a>',
            dataIndex: 'account_name',
            width: 300
        }, {
            xtype: 'datecolumn',
            header: 'Дата создания',
            dataIndex: 'date',
            format: 'd.m.Y H:i',
            width: 100
        }, {
            xtype: 'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Информация по ценам на ПИР',
            iconCls: 'info',
            action: 'info'
        }, {
            xtype: 'button',
            text: 'Создать проект',
            iconCls: 'add',
            hidden: !acl.isUpdate('calcpd'),
            action: 'additem'
        }, '->', {
            xtype: 'button',
            text: 'Настройки',
            iconCls: 'option',
            hidden: !acl.isUpdate('calcpd', 'admin'),
            action: 'config'
        }];
        
        this.bbar = Ext.create('Ext.PagingToolbar', {
            pageSize: 25,
            store: this.store,
            displayInfo: true,
            plugins: Ext.create('xlib.ProgressBarPager', {})
        });
        
        this.callParent(arguments);
    }
});