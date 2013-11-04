Ext.define('EC.SysDev.view.FullDescWindow', {

    extend: 'Ext.window.Window',

    title: 'Полное описание проекта',

    alias: 'widget.sysdev-full-description-win',

    border: true,

    modal: true,

    width: 600,

    autoScroll: true,

    height: 400,

    layout: 'card',

    maximizable: true,

    closeAction: 'hide',

    data: {},

    tbar: [
        '->',
        {
            text: 'Редактировать',
            itemId: 'edit-button',
            handler: function() {
                this.up('window').onEditButton();
            }
        },
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
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            items: [
                {
                    xtype: 'hiddenfield',
                    hidden: true,
                    name: 'id'
                },
                {
                    xtype: 'htmleditor',
                    flex: 1,
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

    onSaveButton: function() {
        var data = this.down("#edit").getForm().getValues();

        this.fireEvent('save', data, this.saveSuccess);
        this.close();

        this.getLayout().setActiveItem('info');

        this.down("#save-button").hide();
        this.down("#edit-button").show();
    },

    onEditButton: function() {
        this.getLayout().setActiveItem('edit');

        this.down("#save-button").show();
        this.down("#edit-button").hide();
    },

    listeners: {
        show: function(win, eOpts) {
            this.getLayout().setActiveItem('info');

            this.down("form").getForm().setValues(this.data);
            this.down("#info").update(this.data.full_desc);

            this.down("#save-button").hide();
            this.down("#edit-button").show();
        }
    }



});