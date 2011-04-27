Ext.ns('System');

System.Menu = function(username, rolename, roleId) {
	username = username || '';
	rolename = rolename || '';
	roleId = parseInt(roleId);
	return [{
	    text: 'Каталог',
	    iconCls: 'settings',
        menu: [{
    	    text: 'Каталог',
    	    iconCls: 'settings',
            handler: function() {
                System.Layout.getTabPanel().add({
                    iconCls: 'settings',
                    xtype: 'Catalog.Layout',
                    id: 'Catalog.Layout'
                });
            }
        }, {
    	    text: 'Настройки',
    	    iconCls: 'settings',
            menu: [{
        	    text: 'Категории',
        	    iconCls: 'settings',
                handler: function() {
                    System.Layout.getTabPanel().add({
                        iconCls: 'settings',
                        xtype: 'Catalog.Categories.Tree',
                        id: 'Catalog.Categories.Tree'
                    });
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
            }]
        }]
//	}, {
//	    text: 'Структура',
//	    iconCls: 'settings',
//        disabled: true
//	}, {
//	    text: 'Контрагенты',
//	    iconCls: 'settings',
//        disabled: true	    
//	}, {
//	    text: 'Конфигуратор',
//	    iconCls: 'settings',
//        disabled: true	    
//	}, {
//	    text: 'Проекты',
//	    iconCls: 'settings',
//        disabled: true	    
//	}, {
//	    text: 'Програмы',
//	    iconCls: 'settings',
//        disabled: true	    
//	}, {
//	    text: 'Календарь',
//	    iconCls: 'settings',
//        disabled: true	    
	}, '->', {
		text: 'Менеджер доступа',
		iconCls: 'accounts',
		hidden: !acl.isView('admin'),
		handler: function() {
			System.Layout.getTabPanel().add({
				iconCls: 'accounts',
				xtype: 'Admin.Acl.Layout',
				id: 'Admin.Acl.Layout'
			});
		}
	}, {
        text: 'Выход',
        tooltip: username + ' (' + rolename + ')',
        iconCls: 'exit',
        handler: function() {
            window.location.href = '/index/logout';
        }
    }];
}