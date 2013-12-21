Ext.define('EC.CRM.view.Projects.Docs.List', {

    itemId: 'EC.CRM.view.Projects.Docs.List',
    
    extend: 'Ext.grid.Panel',
    
    alias: 'widget.crm-projects-docs-list',

    require: ['Ext.grid.plugin.CellEditing'],

    layout: 'fit',
    
    forceFit: true,
    
    border: false,

    autoScroll: true,

    store: 'EC.CRM.store.Projects.Docs',

    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],

    requires: [
        'Ext.grid.feature.Grouping'
    ],

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name} ({children.length})',
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'ProjectDocsGrouping'
    }],

    columns: [{
        xtype:'actioncolumn',
        width: 25,
        items: [{
            icon: '/images/icons/download.png',
            tooltip: 'Скачать документ',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                var record = grid.getStore().getAt(rowIndex);
                this.up('panel').fireEvent('download', record);
            }
        }]
    }, {
        header: 'Наименование',
        flex:1,
        editor: {
            xtype: 'textfield',
            allowBlank: false
        },
        dataIndex: 'name'
    },
        {
        header: 'project_id',
        dataIndex: 'project_id',
        hidden: true
    }, {
        xtype:'actioncolumn',
        hidden: !acl.isUpdate('crm', 'projects', 'docs'),
        width: 85,
        items: [
        {
            icon: '/images/icons/edit.png',
            tooltip: 'Редактировать документ',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                var record = grid.getStore().getAt(rowIndex);
                this.up('panel').fireEvent('update-doc', record);
            }
        },
        {
            icon: '/images/icons/fam/add.png',
            tooltip: 'Обновить документ',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                var record = grid.getStore().getAt(rowIndex);
                this.up('panel').fireEvent('update-doc-file', record.getId());
            }
        }, {
            icon: '/images/icons/fam/grid.png',
            tooltip: 'Версии документа',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                this.up('panel').fireEvent('open-versions', grid.getStore().getAt(rowIndex));
            }
        }, {
            icon: '/images/icons/fam/delete.gif',
            tooltip: 'Удалить документ',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
                this.up('panel').fireEvent('deleteitem', grid.getStore().getAt(rowIndex));
            }
        }]
    }],

    tbar: [{
        text: 'Добавить документ',
        iconCls: 'add',
        action: 'add',
        hidden: !acl.isUpdate('crm', 'projects', 'docs'),
        scope: this
    },{
        text: 'Типы документов',
        iconCls: 'option',
        action: 'edit-doc-types',
        hidden: !acl.isUpdate('crm', 'projects', 'docs'),
        scope: this
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить список документов',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }]

});