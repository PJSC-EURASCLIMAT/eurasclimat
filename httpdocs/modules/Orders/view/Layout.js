Ext.define('EC.Orders.view.Layout', {

    extend: 'Ext.tab.Panel',

    layout: 'fit',
    
    defaultType: 'tabpanel', 
    
    tabBar: { defaults: {flex: 1} },
    
    defaults: { tabBar: { defaults: {flex: 1} }, layout: 'fit' },
    
    initComponent: function() {
    
        this.items = [{
            title: 'Формирование проектов',
            items: [{
                title: 'Предварительные согласования',
                layout: 'fit',
                items: [this.getPanel()]
            }, {
                title: 'Подготовка договора',
                layout: 'fit',
                items: [this.getPanel()]
            }]
        }, {
            title: 'Исполнение проектов',
            items: [{
                title: 'Выполнение договора',
                layout: 'fit',
                items: [this.getPanel()]
            }, {
                title: 'Внедрение',
                layout: 'fit',
                items: [this.getPanel()]
            }]
        }];
        
        this.callParent();
    },
    
    getPanel: function() {
        return Ext.create('Ext.panel.Panel', {
            layout: 'border',
            items: [{
                region: 'west',
                width: 300,
                bodyPadding: 10, 
                html: 'Здесь список проектов' 
            }, {
                region: 'center',
                bodyPadding: 10,
                html: 'Здесь вся информация по проекту включая весь функционал по работе с ним.'
            }]
        });
    }
});