Ext.define('EC.CRM.view.Projects.EditLayout', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактироване проекта',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 1000,
    
    height: 600,
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'tabpanel',
            items: [{
                layout: 'fit',
                itemId: 'configuratorPanel',
                title: 'Единое окно'
            }, {
                xtype: 'tabpanel',
                title: 'Описание',
                items: [{
                    layout: 'fit',
                    itemId: 'baseDescrPanel',
                    title: 'Основное'
                }, {
                    layout: 'fit',
                    itemId: 'membersPanel',
                    title: 'Участники'
                }, {
                    layout: 'fit',
                    itemId: 'plansPanel',
                    title: 'План-Факт'
                }, {
                    layout: 'fit',
                    itemId: 'docsPanel',
                    title: 'Документация'
                }, {
                    layout: 'fit',
                    itemId: 'commentsPanel',
                    title: 'Обсуждение'
                }]
            }]
        }];
        
        this.buttons = [{
            text: 'Закрыть',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }
});