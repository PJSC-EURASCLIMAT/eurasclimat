Ext.define('EC.CRM.view.Projects.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактироване проекта',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 400,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Имя',
                name: 'name'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Дата создания',
                name: 'created_date'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Инициатор',
                name: 'creator_name'
            }],
            buttons: [{
                text: 'Конфигурировать проект',
                icon: '/images/icons/fam/cog.gif',
                action: 'configure'
            }, '->', {
                text: 'Сохранить',
                formBind: true,
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});