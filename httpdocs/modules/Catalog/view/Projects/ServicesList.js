Ext.define('EC.Catalog.view.Projects.ServicesList', {

    extend: 'Ext.grid.Panel',

    title: 'Сопутствующие работы',
    
    alias: 'widget.ProjectsServicesList',
    
    layout: 'fit',
    
    store: 'EC.Catalog.store.Projects.Services',
    
    permissions: acl.isUpdate('catalog', 'projects'),
    
    initComponent: function() {
        
        var actions = [];
        
        if (this.permissions) {
            
            actions.push({
                icon: '/images/icons/fam/plugin.gif',
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
            header: 'Артикул',
            dataIndex: 'code',
            width: 60
        }, {
            header: 'Наименование работ',
            dataIndex: 'name',
            flex: 1
        }, {
            header: 'Ед. изм.',
            dataIndex: 'measure',
            width: 60
        }, {
            header: 'Сроки',
            dataIndex: 'term',
            width: 60
        }, {
            header: 'Цена',
            dataIndex: 'price',
            width: 60
        }, {
            header: 'Кол-во',
            dataIndex: 'number',
            width: 60
        }, {
            header: 'Сумма',
            width: 60
        }, {
            xtype:'actioncolumn',
            width: parseInt(actions.length) * 20,
            items: actions
        }];
        
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить услугу в проект',
            iconCls: 'add',
            hidden: !this.permissions,
            action: 'additem'
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }]
        
        this.callParent(arguments);
    }
});