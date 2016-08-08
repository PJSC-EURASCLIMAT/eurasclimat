Ext.define('EC.CRM.view.Projects.Plans', {
    
    extend: 'Ext.form.Panel',
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 20,
    
//    defaultType: 'datefield',
    
    defaults: {
        xtype: 'datefield',
        labelAlign: 'left',
        format: 'd.m.Y',
        altFormats: 'Y-m-d H:i:s',
        submitFormat: 'Y-m-d H:i:s',
        border: false
    },
    
    items: [{
        fieldLabel: 'Подготовка',
        name: 'preparation'
    }, {
        fieldLabel: 'Согласование',
        name: 'coordination'
    }, {
        fieldLabel: 'Выполнение',
        name: 'execution'
    }, {
        fieldLabel: 'Внедрение',
        name: 'implementation'
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