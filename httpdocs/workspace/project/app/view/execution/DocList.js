Ext.define('Project.view.execution.DocList', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.project-doc-list',

    layout: 'fit',
    
    forceFit: true,
    
    border: false,
    
    store: {
        type: 'project-doc-store'
    },

    columns: [{
        xtype: 'templatecolumn',
        header: 'Наименование',
        tpl: '<a href="/{url}" action="getdoc" >{name}</a>'
    }, {
        header: 'Автор',
        dataIndex: 'author'
    }, {
        xtype: 'datecolumn',
        header: 'Дата создания',
        format: 'd.m.Y H:i',
        dataIndex: 'date_create'
    }, {
        header: 'project_id',
        dataIndex: 'project_id',
        hidden: true
    }, {
        xtype:'actioncolumn',
        width: 20,
        items: [
            {
                icon: '/images/icons/fam/delete.gif',
                tooltip: 'Удалить',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.up('panel').fireEvent('deleteitem', grid.getStore().getAt(rowIndex));
                }
            }
        ]
    }],

    tbar: [{
        text: 'Добавить',
        iconCls: 'add',
        action: 'add',
//        hidden: !this.allowEdit,
        scope: this
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }]

});