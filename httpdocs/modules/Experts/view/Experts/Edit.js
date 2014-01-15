Ext.define('EC.Experts.view.Experts.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Информация об эксперте',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,

    height: 400,

    fromCurrent: false,

    filesStore: null,

    hideFiles: true,

    getFilesURL: null,

    requires: [
        'xlib.AccountsCombo',
        'xlib.ContrCityField'
    ],

    initComponent: function() {

        if (!Ext.isEmpty(this.getFilesURL)) {
            this.filesStore = Ext.create('Ext.data.Store', {

                fields: [
                    'id',
                    'file_id',
                    'file_name'
                ],

                sorters: [{
                    property: 'file_name',
                    direction: 'DESC'
                }],

                proxy: {
                    extraParams: {
                        expert_id: this.data.id
                    },
                    type: 'ajax',
                    url: this.getFilesURL,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            });

            this.filesStore.load();
        }

        this.items = [
            {
                xtype: 'tabpanel',
                items: [
                    {
                        title: 'Информация',
                        xtype: 'form',
                        bodyPadding: 5,
                        fieldDefaults: {
                            labelAlign: 'left',
                            labelWidth: 120,
                            border: false,
                            allowBlank: false,
                            anchor: '100%'
                        },
                        items: [
                            {
                                xtype: 'hidden',
                                name:'from_current',
                                allowBlank: true,
                                value: this.fromCurrent
                            },
                            {
                                xtype: 'hidden',
                                allowBlank: true,
                                name: 'id'
                            },
                            {
                                xtype: 'AccountsCombo',
                                hidden: this.fromCurrent,
                                allowBlank: true,
                                name: 'account_id'
                            },
                            {
                                fieldLabel: 'Инж. оборудование',
                                xtype: 'combobox',
                                name: 'equip_id',
                                displayField: 'name',
                                valueField: 'id',
                                store: 'EC.Experts.store.Equipment'
                            },
                            {
                                fieldLabel: 'Статус',
                                xtype: 'combobox',
                                name: 'status_id',
                                displayField: 'name',
                                valueField: 'id',
                                store: 'EC.Experts.store.Statuses'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Рейтинг',
                                name: 'rating'
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Опыт',
                                name: 'experience'
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Описание',
                                name: 'desc'
                            }
                        ]
                    },{
                        title: 'Файлы',
                        hidden: this.hideFiles,
                        xtype: 'grid',
                        itemId: 'files',
                        border: false,
                        store: this.filesStore,
                        hideHeaders: true,
                        columns: [
                            {
                                xtype: 'templatecolumn',
                                header: 'Заголовок новости',
                                flex: 1,
                                tpl: '<a href="#/download/{file_id}">{file_name}</a>'
                            },
                            {
                                xtype: 'actioncolumn',
                                align: 'center',
                                width: 30,
                                items: [{
                                    iconCls: 'x-btn icon',
                                    icon: '/images/icons/delete.png',
                                    tooltip: 'Удалить',
                                    disabled: !acl.isUpdate('sysdev', 'docs', 'versions'),
                                    handler: function(grid, rowIndex, colIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        grid.up('window').fireEvent('delete', rec);
                                    }
                                }]
                            }
                        ],
                        listeners: {
                            cellclick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                                if (cellIndex === 1) {
                                    this.fireEvent('download', record);
                                }
                            }
                        },
                        tbar: [{
                            xtype: 'button',
                            iconCls: 'add',
                            text: 'Добавить',
                            tooltip: 'Добавить новую версию',
                            hidden: !acl.isView('sysdev', 'docs', 'versions'),
                            listeners: {
                                click: function() {
                                    var win = this.up('window');
                                    win.fireEvent('add', win);
                                }
                            }
                        }, '->', {
                            xtype: 'button',
                            tooltip: 'Обновить',
                            iconCls: 'x-tbar-loading',
                            listeners: {
                                click: function() {
                                    var win = this.up('window');
                                    win.down('#files').store.load();
                                }
                            }
                        }]
                    }
                ]
            }
        ];

        this.buttons = [{
            text: 'Сохранить',
            formBind: true,
            scope: this,
            action: 'save'
        } ,'->', {
            text: 'Отменить',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
        if(!Ext.isEmpty(this.data)) {
            this.down('form').getForm().setValues(this.data);
        }
    }
});