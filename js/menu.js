Ext.ns('System');

System.Menu = function() {
    
    var menuItems = [{
        text: 'Наименования',
        entity: 'titles'
    },{
        text: 'Марка',
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
    menuItems.push({
        text: 'Выход',
        iconCls: 'exit',
        handler: function() {
            window.location.href = '/index/logout';
        }
    });
    
    return menuItems;
    
	return [{
	    text: 'Категории',
	    iconCls: 'settings',
        handler: function() {
            new Ext.Window({
                width: 800,
                height: 600,
                modal: true,
                title: 'Категории',
                items: [{
                    title: false,
                    autoHight: true,
                    layout: 'fit',
                    iconCls: 'settings',
                    xtype: 'Catalog.Categories.Tree',
                    id: 'Catalog.Categories.Tree'
                }]
            }).show();
        }
    }, {
	    text: 'Разделы',
	    iconCls: 'settings',
        handler: function() {
            System.Layout.getTabPanel().add({
                iconCls: 'settings',
                xtype: 'Catalog.Chapters.Tree',
                id: 'Catalog.Chapters.Tree'
            });
        }
    }, {
	    text: 'Марки',
	    iconCls: 'settings',
        handler: function() {
            System.Layout.getTabPanel().add({
                iconCls: 'settings',
                xtype: 'Catalog.Marks.List',
                id: 'Catalog.Marks.List'
            });
        }
    }, {
	    text: 'Типы',
	    iconCls: 'settings',
        handler: function() {
            System.Layout.getTabPanel().add({
                iconCls: 'settings',
                xtype: 'Catalog.Types.Tree',
                id: 'Catalog.Types.Tree'
            });
        }
    }, {
	    text: 'Единицы измерения',
	    iconCls: 'settings',
        handler: function() {
            System.Layout.getTabPanel().add({
                iconCls: 'settings',
                xtype: 'Catalog.Measures.List',
                id: 'Catalog.Measures.List'
            });
        }
	}, '->', {
        text: 'Выход',
        iconCls: 'exit',
        handler: function() {
            window.location.href = '/index/logout';
        }
    }];
}