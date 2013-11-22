Ext.define('EC.SysDev.view.execution.DocList', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.project-doc-list',

    layout: 'fit',
    
    forceFit: true,
    
    border: false,
    
    store: {
        type: 'project-doc-store'
    },

    listeners: {
        cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts ) {
            if (cellIndex === 0) {
                this.fireEvent('download', record);
            }
        }
    },

    columns: [{
        xtype: 'templatecolumn',
        cls: 'download-link',
        header: 'Наименование',
        tpl: '<a href="#">{name}</a>'
    }, {
        header: 'Расширение',
        dataIndex: 'ext'
    },{
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
        hidden: !acl.isUpdate('sysdev', 'docs'),
        width: 30,
        items: [
            {
                icon: '/images/icons/fam/add.png',
                tooltip: 'Обновить документ',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                    this.up('panel').fireEvent('update-doc-file', record.getId());
                }
            },
            {
                icon: '/images/icons/fam/grid.png',
                tooltip: 'Версии документа',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    this.up('panel').fireEvent('open-versions', grid.getStore().getAt(rowIndex));
                }
            },
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
        hidden: !acl.isUpdate('sysdev', 'docs'),
        scope: this
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }]

});