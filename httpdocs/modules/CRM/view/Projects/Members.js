Ext.define('EC.CRM.view.Projects.Members', {
    
    extend: 'Ext.form.Panel',
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 20,
    
    defaults: {
        xtype: 'fieldset',
        padding: 20
    },
    
    reguires: ['xlib.AccountsCombo'],
    
    items: [{
        xtype: 'fieldset',
        title: 'Менеджеры проекта',
        defaultType: 'AccountsCombo',
        items: []
    }, {
        xtype: 'fieldset',
        title: 'Представители заказчика',
        defaultType: 'AccountsCombo',
        items: []
    }, {
        xtype: 'fieldset',
        title: 'Отдел проектирования',
        defaultType: 'AccountsCombo',
        items: []
    }, {
        xtype: 'fieldset',
        title: 'Отдел логистики',
        defaultType: 'AccountsCombo',
        items: []
    }, {
        xtype: 'fieldset',
        title: 'Производственный отдел',
        defaultType: 'AccountsCombo',
        items: []
    }],
        
    initComponent: function() {
        
        this.bbar = ['->', {
            text: 'Сохранить',
            formBind: true,
            action: 'save'
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