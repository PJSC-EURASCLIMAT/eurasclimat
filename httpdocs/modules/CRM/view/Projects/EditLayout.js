Ext.define('EC.CRM.view.Projects.EditLayout', {
    
//    extend: 'Ext.window.Window',
	extend: 'Ext.panel.Panel',
    
    layout: 'fit',
    
    /*
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 1000,
    
    height: 600,
    */
    
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
            layout: 'fit',
            itemId: 'equipmentPanel',
            title: 'Оборудование и работы'
        }, {
          	layout: 'fit',
          	itemId: 'calcpdPanel',
          	title: 'ПИР',
          	tooltip: 'Проектно-инженерные расчёты'
        // }, {
            // layout: 'fit',
            // itemId: 'calcfotPanel',
            // title: 'ФОТ',
            // tooltip: 'Фонд оплаты труда'
        }]
    }]
});