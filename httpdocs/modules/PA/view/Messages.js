Ext.define('EC.PA.view.Messages', {
    
    extend: 'Ext.window.Window',

    title: 'Мои сообщения',

    alias: 'widget.pa-messages-win',

    uses: ['xlib.CheckColumn'],
    
    border: true,

    modal: true,

    messagesCount: 0,

    width: 800,

    height: 400,
    
    layout: 'border',
    
    maximizable: true,
    
    closeAction: 'hide',

    requires: 'EC.PA.store.MessagesTypes',

    initComponent: function() {
        
        var store = Ext.create('EC.PA.store.MessagesTypes');

        this.items = [{
            region: 'west',
            collapsible: true,
            split: true,
            header: false,
            border: false,
            xtype: 'treepanel',
            itemId: 'mesFilterTree',
            store: store,
            animate: false,
            useArrows: true,
            rootVisible: false,
            width: 200
        }, {
            region: 'center',
            layout: 'border',
            border: false,
            tbar: [{
                xtype: 'button',
                iconCls: 'add',
                text: 'Написать',
                tooltip: 'Написать новое сообщение',
                action: 'add'
            }, {
                xtype: 'button',
                text: 'Действия',
                menu: [{
                    text: 'Выбрать все',
                    action: 'checkAll'
                }, {
                    text: 'Снять выделения',
                    action: 'uncheckAll'
                }, {
                    text: 'Отметить выбранные как прочитанные',
                    action: 'setReaded'
                }, {
                    text: 'Удалить выбранные',
                    action: 'delete',
                    itemId: 'deleteChecked'
                }]
            }, {
                xtype: 'button',
                iconCls: 'book',
                hidden: true,
                text: 'Адресная книга',
                action: 'contacts'
            },'->', {
                xtype: 'button',
                tooltip: 'Обновить',
                iconCls: 'x-tbar-loading',
                action: 'refresh'
            }],
            items: [{
                region: 'center',
                hideHeaders: true,
                border: false,
                split: true,
                height: 150,
                xtype: 'grid',
                itemId: 'mesGrid',
                store: 'EC.PA.store.Messages',
                cls: 'curUserMessagesGrid',

                box: null,

                viewConfig: {
                    preserveScrollOnRefresh: true
                },
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: 'EC.PA.store.Messages',
                    displayInfo: true,
                    plugins: Ext.create('xlib.ProgressBarPager', {})
                }),
                columns: [{
                    xtype: 'checkcolumn',
                    width: 30,
                    dataIndex: 'checked',
                    listeners: {
                        checkchange: function( grid, rowIndex, checked, eOpts ) {
                            this.up('panel').fireEvent('activechange', rowIndex, checked);
                        }
                    }
                }, {
                    dataIndex: 'type',
                    width: 30,
                    renderer: function(type){
                        if(type === 0) {
                            return '';
                        }

                        var typeIcons = {
                            1 : '/images/icons/warning.png',
                            2 : '/images/icons/fam/cog.png',
                            3 : '/images/icons/fam/user.png'
                        };
                        return '<img src="' + typeIcons[type] + '" />';
                    }
                }, {
                    xtype: 'templatecolumn',
                    flex: 1,
                    tpl: new Ext.XTemplate(
                            '<strong style="{[this.getSenderStyle(values)]}">{[this.getSender(values)]}</strong>' +
                            // '<p style="margin: 0; {[this.getEllipsisStyle(values)]}">{[this.getMessage(values)]}</p>' +
                            '&#032;&#032;&#032;&#032;&#032;<span style="{[this.getSenderStyle(values)]}">{subject}</span>',
                        {
                            win: this,

                            getSender: function(values) {
                                if (Ext.isEmpty(values.sender_name)) {
                                    return 'Администрация';
                                }

                                if ( this.win.mesGrid.box === 'out') {
                                    return 'Кому: ' + values.receiver_name;
                                }

                                return values.sender_name;

                            },

                            getMessage: function(values){
                                var mes = values.message;
                                if (!values.expanded) {
                                    mes = Ext.util.Format.stripTags(mes);
                                    mes = Ext.String.ellipsis(mes,30);
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
                    })
                }, {
                    xtype: 'datecolumn',
                    dataIndex: 'date',
                    format:'d.m.Y H:i',
                    width: 100
                }, {
                    xtype: 'actioncolumn',
                    dataIndex: 'deleted',
                    align: 'left',
                    renderer: function(deleted){
                        if (deleted === 0) {
                            return '<img style="cursor: pointer" src="/images/icons/trash.png" />';
                        }
                        if (deleted === 1) {
                            return '<img style="cursor: pointer" src="/images/icons/delete.png" />';
                        }
                        return '';
                    },
                    // х.з. как сделать одновременно actioncolumn с динамическим рендером,
                    // поэтому сделал так
                    listeners: {
                        click: function() {
                            var rec = arguments[5];
                            this.up('#mesGrid').fireEvent('deleteRow', [rec]);
                        }
                    },
                    width: 30
                }]
            }, {
                region: 'south',
                collapsible: true,
                split: true,
                header: false,
                border: false,
                flex: 1,
                xtype: 'panel',
                itemId: 'mesDetail',
                bodyStyle: {padding: '10px'},
                autoScroll: true,
                tbar: [{
                    text: 'Ответить',
                    itemId: 'respondBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('respond')}
                }, {
                    text: 'Ответить c цитированием',
                    itemId: 'respondWithCitBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('respondWithCit')}
                }, {
                    text: 'Переслать',
                    itemId: 'forwardBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('forward')}
                }, {
                    text: 'Удалить',
                    itemId: 'delBtn',
                    handler: function(){this.up('#mesDetail').fireEvent('delete')}
                }],
                tpl: Ext.create('Ext.XTemplate',
                    '<strong>Тема: </strong>{subject}<br/>',
                    '<p><strong>От: </strong>{[this.getName(values.sender_name)]}</p>',
                    '<p><strong>Кому: </strong>{[this.getName(values.receiver_name)]}</p>',
                    '{message}', {
                    getName: function(name) {
                        if (Ext.isEmpty(name)) {
                            return 'Администрация';
                        }
                        return name;
                    }
                })
            }]
        }];

        this.callParent();

        this.mesGrid =  this.down('#mesGrid');

        this.detail = this.down('#mesDetail');
        this.respBtn = this.detail.down('#respondBtn');
        this.respCitBtn = this.detail.down('#respondWithCitBtn');
        this.forwBtn = this.detail.down('#forwardBtn');
        
        var treePanel = this.down('#mesFilterTree');
        treePanel.on('viewready', function() {
            treePanel.getSelectionModel().selectRange(0,0);
        }, this);
    },

    enableRespondButtons: function() {
        if( !this.respBtn.isDisabled() ) return;
        this.respBtn.enable();
        this.respCitBtn.enable();
        this.forwBtn.enable();
    },

    disableRespondButtons: function() {
        if( this.respBtn.isDisabled() ) return;
        this.respBtn.disable();
        this.respCitBtn.disable();
        this.forwBtn.disable();
    },

    setTitleCount: function(num) {
        
        this.messagesCount = num;
        var str = (num === 0) ? '' : ' (' + num + ' непрочитанных сообщения)';
        this.setTitle('Мои сообщения' + str);
    }
});