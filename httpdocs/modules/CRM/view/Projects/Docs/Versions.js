Ext.define('EC.CRM.view.Projects.Docs.Versions', {

    itemId: 'EC.CRM.view.Projects.Docs.Versions',
    
    extend: 'Ext.window.Window',
    
    alias: 'widget.crm-projects-docs-versions-win',

    title: 'Версии документа',

    border: true,

    modal: true,

    width: 700,

    height: 300,

    layout: 'fit',

    closeAction: 'close',

    doc_id: null,

    tbar: [{
        xtype: 'button',
        iconCls: 'add',
        text: 'Добавить',
        tooltip: 'Добавить новую версию',
        hidden: !acl.isView('projects'),
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
        store: 'EC.CRM.store.Projects.DocsVersions',
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
            header: 'Наименование',
            dataIndex: 'file_name',
            flex: 1
        }, {
            text: 'Дата загрузки',
            xtype: 'datecolumn',
            dataIndex: 'date_create',
            format: 'd.m.Y H:i',
            width: 100
        }, {
	    	xtype: 'templatecolumn',
	    	header: 'Автор',
	    	tpl: '<a href="#/profile/{account_id}/show">{creator}</a>',
	    	dataIndex: 'creator',
	    	width: 200
        }, {
            xtype: 'actioncolumn',
            align: 'left',
            width: 40,
            items: [{
                iconCls: 'x-btn icon',
                icon: '/images/icons/delete.png',
                tooltip: 'Удалить',
                disabled: !acl.isUpdate('admin'),
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    this.up('#docVersGrid').fireEvent('delete', rec);
                }
            }]
        }]
    }]
});