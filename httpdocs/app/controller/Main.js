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
            }
        })
    },
    
    openWidget: function(button, e, options) {
        this.getCenterPanel().getActiveTab().child('portalcolumn').add({
            xtype: 'portlet',
            title: button.text,
            html: 'Произвольное содержимое'
        });
    }
});