Ext.define('EC.PA.view.Messages', {
    
    extend: 'Ext.window.Window',

    title: 'Сообщения пользователя ' + xlib.Acl.Storage.getIdentity().name +
        ' (' + xlib.Acl.Storage.getIdentity().login + ') ',

    alias: 'widget.pa-messages-win',
    
    autoScroll: true,

    border: false,

    modal: true,

    tbar: [
        {
            xtype: 'button',
            iconCls: 'add',
            text: 'Написать',
            tooltip: 'Написать новое сообщение',
            action: 'add'
        }, {
            xtype: 'button',
            iconCls: 'remove',
            text: 'Удалить',
            tooltip: 'Удалить выбранные сообщения',
            action: 'delete'
        },'->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            action: 'refresh'
        }
    ],

    items: [
        {
            xtype: 'grid',
            itemId: 'mesGrid',
            width: 500,
            height: 300,
            hideHeaders: true,
            expandRows: [],
            listeners: {
                afterrender: function( grid, eOpts ) {

                    var expandFunc = function(rowNode, record, expandRow, eOpts) {
                        var expanded = record.get('expanded');
                        record.set('expanded',!expanded);
                        this.up().fireEvent('rowExpanded',record);
                    }

                    var collapseFunc = function(rowNode, record, expandRow, eOpts) {
                        var expanded = record.get('expanded');
                        record.set('expanded',!expanded);
                        this.up().fireEvent('rowCollapsed',record);
                    }

                    grid.view.on('expandbody', expandFunc);
                    grid.view.on('collapsebody', collapseFunc);
                }
            },
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<p style="margin-left:36px;">{message}</p>'
                )
            }],
            store: 'EC.PA.store.Messages',
            cls: 'curUserMessagesGrid',
            viewConfig: {
                getRowClass: function(record, index, rowParams, store) {
                    return (record.get('read') === 0) ? 'curUserMessage_new' : '';
                }
            },
            columns: [
                {
                    xtype: 'checkcolumn',
                    width: 30,
                    dataIndex: 'checked'
                },
                {
                    xtype: 'templatecolumn',
                    tpl: new Ext.XTemplate(
                        '<strong style="{[this.getSenderStyle(values)]}">{sender_name}</strong>' +
                            '<p style="margin: 0; {[this.getEllipsisStyle(values)]}">{[this.getMessage(values)]}</p>',
                        {
                            getMessage: function(values){
                                var mes = values.message;
                                if (!values.expanded) {
                                    mes = Ext.util.Format.stripTags(mes);
                                    mes = Ext.String.ellipsis(mes,65);
                                    return mes;
                                }
                                return '';
                            },

                            getSenderStyle: function(values) {
                                if (values.readed) {
                                    return 'color:gray;';
                                }
                            },

                            getEllipsisStyle: function(values) {
                                if (values.readed) {
                                    return 'color:#686868;';
                                }
                            }
                        }
                    ),
                    flex: 1
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    format:'d.m.Y',
                    width: 70
                },
                {
                    xtype: 'actioncolumn',
                    align: 'left',
                    items: [
                        {
                            iconCls: 'x-btn icon',
                            icon: '/images/icons/delete.png',
                            tooltip: 'Удалить',
                            handler: function(grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                this.up('#mesGrid').fireEvent('deleteRow',rec);
                            }

                        }
                    ],
                    width: 30
                }
            ]
        }
    ]
});