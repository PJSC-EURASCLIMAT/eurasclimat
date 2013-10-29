Ext.define('EC.PA.view.Messages', {
    
    extend: 'Ext.window.Window',

    title: 'Мои сообщения',

    alias: 'widget.pa-messages-win',
    
    border: false,

    modal: true,

    messagesCount: 0,

    width: 500,

    height: 300,

    layout: 'fit',
    
    maximizable: true,
    
    closeAction: 'hide',
    
    tbar: [
        {
            xtype: 'button',
            iconCls: 'add',
            text: 'Написать',
            tooltip: 'Написать новое сообщение',
            action: 'add'
        }, {
            xtype: 'button',
            text: 'Действия',
            menu: [
                {
                    text: 'Выбрать все',
                    action: 'checkAll'
                },
                {
                    text: 'Снять выделения',
                    action: 'uncheckAll'
                },
                {
                    text: 'Отметить выбранные как прочитанные',
                    action: 'setReaded'
                },
                {
                    text: 'Удалить выбранные',
                    action: 'delete',
                    itemId: 'deleteChecked'
                }

            ]
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
            hideHeaders: true,
            store: 'EC.PA.store.Messages',
            cls: 'curUserMessagesGrid',
            viewConfig: {
                getRowClass: function(record, index, rowParams, store) {
                    return (record.get('read') === 0) ? 'curUserMessage_new' : '';
                }
            },
            expandRows: [],
            listeners: {
                afterrender: function( grid, eOpts ) {

                    //Скрывает колонку плагина rowexpander
                    grid.columns[0].hide();

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

                ,itemclick: function( grid, record, item, index, e, eOpts ) {
                    this.getPlugin('rowexpander').onDblClick(grid,record,item,index,e);
                }

            },
            plugins: [{
                ptype: 'rowexpander',
                pluginId: 'rowexpander',
                expandOnDblClick: false,
                rowBodyTpl : new Ext.XTemplate(
                    '<p style="margin-left:36px;">{message}</p>'
                )
            }],

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

    ,initComponent: function() {
        this.callParent();
    }

    ,setTitleCount: function(num) {
        this.messagesCount = num;
        var str = (num === 0) ? '' : ' (' + num + ' непрочитанных сообщения)';
        this.setTitle('Мои сообщения' + str);
    }
});