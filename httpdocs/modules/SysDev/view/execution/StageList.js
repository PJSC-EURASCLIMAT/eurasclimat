Ext.define('EC.SysDev.view.execution.StageList', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.project-stage-list',

    layout: 'fit',
    
    forceFit: true,
    
    border: false,

    store: {
        type: 'project-stage-store'
    },

    tbar: [{
        text: 'Добавить',
        iconCls: 'add',
        action: 'add',
        hidden: !acl.isUpdate('sysdev', 'stages'),
        scope: this
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }],

    columns: [{
        header: '№',
        dataIndex: 'index'
    }, {
        header: 'Автор',
        dataIndex: 'author'
    }, {
        header: 'Наименование',
        dataIndex: 'name'
    }, {
        xtype: 'datecolumn',
        header: 'Планируемая дата </br>начала',
        format: 'd.m.Y H:i',
        dataIndex: 'date_plan_begin'
    }, {
        xtype: 'datecolumn',
        header: 'Планируемая дата </br>завершения',
        format: 'd.m.Y H:i',
        dataIndex: 'date_plan_end'
    }, {
        xtype: 'datecolumn',
        header: 'Фактическая дата </br>начала',
        format: 'd.m.Y H:i',
        dataIndex: 'date_fact_begin'
    }, {
        xtype: 'datecolumn',
        header: 'Фактическая дата </br>завершения',
        format: 'd.m.Y H:i',
        dataIndex: 'date_fact_end'
    }, {
        xtype: 'datecolumn',
        header: 'Дата </br>создания',
        format: 'd.m.Y H:i',
        dataIndex: 'date_create'
    }, {
        xtype: 'actioncolumn',
        width: 40,
        hidden: !acl.isUpdate('sysdev', 'info'),
        items: [{
            icon: '/images/icons/fam/plugin.gif',
            tooltip: 'Редактировать',
            handler: function(gridView, rowIndex) {
                var grid = gridView.up('grid');
                var record = grid.getStore().getAt(rowIndex);
                grid.fireEvent('edit-button-pressed', record);
            }
        }, {
            icon: '/images/icons/fam/delete.gif',
            tooltip: 'Удалить',
            handler: function(gridView, rowIndex) {
                var grid = gridView.up('grid');
                var record = grid.getStore().getAt(rowIndex);
                grid.fireEvent('delete-button-pressed', record);
            }
        }]
    }]

});