Ext.ns('System');

System.Menu = function() {
    
    var menuItems = [{
        text: 'Наименования',
        entity: 'titles'
    },{
        text: 'Марки',
        entity: 'marks'
    },{
        text: 'Тип продукции',
        entity: 'product_types'
    },{
        text: 'Тип исполнения',
        entity: 'construction_types'
    },{
        text: 'Территориальность производства',
        entity: 'territorialities'
    },{
        text: 'Состояние продукции',
        entity: 'conditions'
    },{
        text: 'Назначение продукции',
        entity: 'purposes'
    },{
        text: 'Наличие продукции',
        entity: 'availabilities'
    },{
        text: 'Тип системы',
        entity: 'system_types'
    }];

    Ext.each(menuItems, function(i) {
        i.iconCls = 'settings';
        if (!Ext.isFunction(i.handler)) {
            i.handler = function() {
                new Catalog.Settings.List({
                    windowTitle: i.text,
                    entity: i.entity
                });
            }
        } 
    });
    
    menuItems.push('->');

    /*
    menuItems.push({
        text: 'Менеджер доступа',
        iconCls: 'settings',
        handler: function() {
            new Ext.Window({
                width: 1000,
                height: 600,
                modal: true,
                layout: 'fit',
                title: 'Менеджер доступа',
                items: [{
                    xtype: 'Admin.Acl.Layout',
                    iconCls: 'settings'
                }]
            }).show();
        }
    });
    */
    
    menuItems.push({
        text: 'Выход',
        iconCls: 'exit',
        handler: function() {
            window.location.href = '/index/logout';
        }
    });
    
    return menuItems;
}