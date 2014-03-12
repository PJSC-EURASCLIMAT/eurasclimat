Ext.define('EC.CRM.view.Projects.EditLayout', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 1000,
    
    height: 600,
    
    items: [{
        xtype: 'tabpanel',
        items: [{
            layout: 'fit',
            itemId: 'baseDescrPanel',
            title: 'Описание'
        }, {
            layout: 'fit',
            itemId: 'configPanel',
            title: 'Конфигурация'
        }, {
            layout: 'fit',
            itemId: 'plansPanel',
            title: 'План-Факт'
        }, {
            layout: 'fit',
            itemId: 'membersPanel',
            title: 'Участники проекта'
        }, {
            layout: 'fit',
            itemId: 'docsPanel',
            title: 'Документация'
        }, {
            layout: 'fit',
            itemId: 'discussionsPanel',
            title: 'Обсуждение'
        }, {
            xtype: 'tabpanel',
            layout: 'fit',
            itemId: 'equipmentPanel',
            title: 'Оборудование и работы'
        }]
    }]
});