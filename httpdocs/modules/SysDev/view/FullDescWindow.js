Ext.define('EC.SysDev.view.FullDescWindow', {

    extend: 'Ext.window.Window',

    title: 'Полное описание проекта',

    alias: 'widget.sysdev-full-description-win',

    border: true,

    modal: true,

    width: 600,

    height: 400,

    layout: 'card',

    maximizable: true,

    closeAction: 'hide',

    data: {},

    tbar: [
        {
            text: 'Редактировать',
            itemId: 'edit-button',
            handler: function() {
                this.up('window').onEditButton();
            }
        },
        '->',
        {
            text: 'Сохранить',
            itemId: 'save-button',
            hidden: true,
            handler: function() {
                this.up('window').onSaveButton();
            }

        }
    ],

    items: [
        {
            xtype: 'form',
            itemId: 'edit',
//            style: {border: "2px solid red"},
//            layout: 'vbox',
            border: false,
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'htmleditor',
                    anchor: '100% 100%',
                    border: false,
                    margin: '0',
                    name: 'full_desc'
                }
            ]

        },
        {
            xtype: 'container',
            style: {background: "white"},
            itemId: 'info',
            html: ''
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
        this.down('#info').update(this.data.full_desc);
    },

    onSaveButton: function() {
        var data = this.down("#edit").getForm().getValues();
        this.fireEvent('save',data);
        this.close();
    },

    onEditButton: function() {
        this.getLayout().setActiveItem('edit');
        this.down("#save-button").show();
        this.down("#edit-button").hide();
    },

    listeners: {
        show: function(win, eOpts) {
            this.getLayout().setActiveItem('info');
        }
    }



});