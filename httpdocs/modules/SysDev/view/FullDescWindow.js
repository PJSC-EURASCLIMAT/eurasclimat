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
//    layout: 'fit',

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
            style: {border: "2px solid red"},
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            border: false,
            items: [
                {
                    xtype: 'hiddenfield',
                    height: 0,
                    name: 'id'
                },
                {
                    xtype: 'htmleditor',
                    flex: 1,
                    style: {border: "2px solid blue"},
                    margin: '0',
//                    xtype: 'textarea',
//                    style: {border:"2px solid blue"},
//                    height: 200,
//                    hidden: true,
                    name: 'full_desc'
//                    anchor: '100% 100%',
//                    border: false
                }
            ]

        },
        {
            xtype: 'container',
//            hidden: true,
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