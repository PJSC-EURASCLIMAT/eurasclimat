Ext.define('EC.CRM.view.Projects.Members', {
    
    extend: 'Ext.form.Panel',
    
    trackResetOnLoad: true,
    
    border: false,
    
    bodyPadding: 20,
    
    defaults: {
        xtype: 'fieldset',
        padding: 20
    },
    
    items: [{
        title: 'Менеджеры проекта',
        itemId: 'manager',
        items: [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            action: 'manager'
        }]
    }, {
        title: 'Представители заказчика',
        itemId: 'customer',
        items: [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            action: 'customer'
        }]
    }, {
        title: 'Отдел проектирования',
        itemId: 'projector',
        items: [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            action: 'projector'
        }]
    }, {
        title: 'Отдел логистики',
        itemId: 'logistic',
        items: [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            action: 'logistic'
        }]
    }, {
        title: 'Производственный отдел',
        itemId: 'productor',
        items: [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            action: 'productor'
        }]
    }],
        
    bbar: ['->', {
        text: 'Сохранить',
        formBind: true,
        action: 'save'
    }]
});