Ext.define('App.controller.Interface.Admin', {
    
    extend: 'App.controller.ChapterAbstract',

    views: ['App.view.Interface.Admin'],
    
    viewLayout: 'AdminPanel',
    
    modules: [{
    	title: 'Роли',
    	iconCls: 'user-suit',
    	hidden: !acl.isView('admin'),
    	allowMultiple: true,
    	target: 'AdminPanel',
    	launchModule: 'EC.Admin.controller.Roles'
    }, {
    	title: 'Пользователи',
    	iconCls: 'user',
    	hidden: !acl.isView('admin'),
    	allowMultiple: true,
    	target: 'AdminPanel',
    	launchModule: 'EC.Admin.controller.Accounts'
    }, {
    	title: 'Права доступа',
    	iconCls: 'connect',
    	hidden: !acl.isView('admin'),
    	allowMultiple: true,
    	target: 'AdminPanel',
    	launchModule: 'EC.Admin.controller.Acl'
    }],
    
    init: function() {
        
		var container = this.getContainer();
	    var MC = this.getController('App.controller.Main');
	    container.on('show', function() {
	    	Ext.each(this.modules, function(item) {
                MC.openModuleTab(item);
	        });
        }, this, {single: true});
    },
    
    getMenu: function() {
        
        var MC = this.getController('App.controller.Main');
        
        Ext.each(this.modules, function(item) {
            item.text = item.title;
            item.handler = function(b) {
                MC.openModuleTab(b.initialConfig);
            }
        });
        
        return this.modules;
    }
});