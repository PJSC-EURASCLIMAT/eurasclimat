Ext.define('EC.SysDev.view.execution.DocVersionsList', {

    extend: 'Ext.window.Window',
    
    alias: 'widget.project-doc-versions-win',

    title: 'Версии документа',

    border: true,

    modal: true,

    messagesCount: 0,

    width: 500,

    height: 300,

    layout: 'fit',

    maximizable: true,

    closeAction: 'hide',

    doc_id: null,

    tbar: [{
        xtype: 'button',
        iconCls: 'add',
        text: 'Добавить',
        tooltip: 'Добавить новую версию',
        hidden: !acl.isView('sysdev', 'docs', 'versions'),
        listeners: {
            click: function() {
                var win = this.up('window');
                var doc_id = win.down('grid').store.proxy.extraParams.doc_id;
                win.fireEvent('add-doc-version', doc_id);
            }
        }
    }, '->', {
        xtype: 'button',
        tooltip: 'Обновить',
        iconCls: 'x-tbar-loading',
        action: 'refresh'
    }],



    items: [{
        xtype: 'grid',
        itemId: 'docVersGrid',
        border: false,
        store: 'EC.SysDev.store.execution.DocVersionsStore',
        listeners: {
            cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                if (cellIndex === 1) {
                    this.fireEvent('download', record);
                }
            },
            beforeload: function() {

            }
        },
        columns: [{
            text: '№',
            dataIndex: 'id',
            width: 30
        }, {
            xtype: 'templatecolumn',
            header: 'Наименование',
            tpl: '<a href="#">{file_name}</a>',
            flex: 1
        }, {
            text: 'Дата загрузки',
            xtype: 'datecolumn',
            dataIndex: 'date_create',
            format: 'd.m.Y H:i',
            flex: 1
        }, {
            xtype: 'actioncolumn',
            align: 'left',
            width: 40,
            items: [{
                iconCls: 'x-btn icon',
                icon: '/images/icons/delete.png',
                tooltip: 'Удалить',
                disabled: !acl.isUpdate('sysdev', 'docs', 'versions'),
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    this.up('#docVersGrid').fireEvent('delete', rec);
                }
            }]
        }]
    }]
});