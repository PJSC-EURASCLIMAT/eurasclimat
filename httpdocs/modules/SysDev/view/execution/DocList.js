Ext.define('EC.SysDev.view.execution.DocList', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.project-doc-list',

    require: ['Ext.grid.plugin.CellEditing'],

    layout: 'fit',
    
    forceFit: true,
    
    border: false,
    
    store: {
        type: 'project-doc-store'
    },

    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],

    listeners: {
        edit: function(editor, e, eOpts) {
            this.fireEvent('update-doc-name', e.record);
        },
        beforeedit: function(editor, e, eOpts) {
            return (acl.isUpdate('sysdev', 'docs'));
        }
    },

    initComponent: function() {
        this.callParent(arguments);
    },

    columns: [
    {
        xtype:'actioncolumn',
        width: 16,
        items: [
            {
                icon: '/images/icons/download.png',
                tooltip: 'Скачать документ',
                iconCls: 'x-btn',
                handler: function(grid, rowIndex, colIndex) {
                    var record = grid.getStore().getAt(rowIndex);
                    this.up('panel').fireEvent('download', record);
                }
            }
        ]
    }, {
        header: 'Наименование',
        editor: {
            xtype: 'textfield',
            allowBlank: false
        },
        dataIndex: 'name'
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