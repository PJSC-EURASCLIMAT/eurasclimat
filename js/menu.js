Ext.ns('System');

System.Menu = function(username, rolename, roleId) {
	username = username || '';
	rolename = rolename || '';
	roleId = parseInt(roleId);
	return [{
	    text: 'Структура',
	    iconCls: 'settings',
        disabled: true
	}, {
	    text: 'Контрагенты',
	    iconCls: 'settings',
        disabled: true	    
	}, {
	    text: 'Конфигуратор',
	    iconCls: 'settings',
        disabled: true	    
	}, {
	    text: 'Проекты',
	    iconCls: 'settings',
        disabled: true	    
	}, {
	    text: 'Програмы',
	    iconCls: 'settings',
        disabled: true	    
	}, {
	    text: 'Календарь',
	    iconCls: 'settings',
        disabled: true	    
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