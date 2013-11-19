Ext.define('EC.CRM.view.Projects.BaseDescr', {
    
    extend: 'Ext.form.Panel',
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 5,
    
    fieldDefaults: {
        labelAlign: 'left',
        border: false,
        allowBlank: false,
        anchor: '100%'
    },
    
    url: null,
    
    initComponent: function() {
        
        this.items = [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'projectsGroupsCombo',
                fieldLabel: 'Группа',
                name: 'group_id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Имя',
                name: 'name'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Дата создания',
                value: Ext.util.Format.date(Date(), 'd.m.Y')
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Инициатор',
                value: xlib.Acl.Storage.getIdentity().name
        }];

        this.bbar = ['->', {
            text: 'Сохранить',
            formBind: true,
            action: 'save',
            handler: function() {
                this.submit();
            },
            scope: this
        }, {
            text: 'Отменить',
            scope: this,
            handler: function() {
                this.getForm().reset();
            }
        }];
        
        this.callParent(arguments);
    }
});