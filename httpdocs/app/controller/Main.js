Ext.define('App.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel'],
    
    refs: [{
        ref: 'CenterPanel',
        selector: 'CenterPanel'
    }], 
    
    init: function() {
        
        var vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Загрузка...'}); 
        vpMask.show();
        
        this.getView('Layout').create({
            listeners: {
                render: function() {
                    vpMask.destroy();
                    vpMask = new Ext.LoadMask(Ext.getBody(), {msg:'Инициализация...'});
                    vpMask.show();
                },
                afterLayout: function() {
                    vpMask.destroy();
                }
            }
        });
        
        this.control({
            'LeftPanel button': {
                click: this.openWidget,
                scope: this
            },
            'CenterPanel portlet': {
                maximize: this.maximizeWidget,
                scope: this
            }
        })
    },
    
    openWidget: function(button, e, options) {
        if (typeof button.lunch == 'function') {
            button.lunch.call(this);
        } else {
            var tab = this.getCenterPanel().getActiveTab();
            tab.down().insert(0, {
                xtype: 'portlet',
                title: button.text,
                html: 'Произвольное содержимое'
            });
            tab.doLayout();
        }
    },
    
    maximizeWidget: function(portlet) {
        var tab = this.getCenterPanel().add(portlet.cloneConfig());
        portlet.close();
        tab.show();
    }
});