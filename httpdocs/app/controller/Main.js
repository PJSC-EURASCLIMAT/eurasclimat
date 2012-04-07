Ext.define('EC.controller.Main', {
    
    extend: 'Ext.app.Controller',

    views: ['Layout', 'TopPanel', 'LeftPanel', 'CenterPanel'],
    
    refs: [{
        ref: 'CenterPanel',
        selector: 'CenterPanel'
    }], 
    
    init: function() {
        this.control({
            'LeftPanel button': {
                click: this.openWidget,
                scope: this
            },
            'CenterPanel portlet': {
                maximize: this.maxumizeWidget,
                scope: this
            }
        })
    },
    
    openWidget: function(button, e, options) {
        var tab = this.getCenterPanel().getActiveTab();
        tab.down().insert(0, {
            xtype: 'portlet',
            title: button.text,
            html: 'Произвольное содержимое'
        });
        tab.doLayout();
    },
    
    maxumizeWidget: function(portlet) {
        var tab = this.getCenterPanel().add(portlet.cloneConfig());
        portlet.close();
        this.getCenterPanel().setActive(true, tab);
//        console.log('it works');
    }
});