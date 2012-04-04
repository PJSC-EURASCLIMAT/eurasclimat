Ext.define('EC.view.Layout', {

    extend: 'Ext.container.Container',

    layout: 'border',
    
    baseCls: 'xlib-wallpaper',
    
    initComponent: function() {
    
        this.items = [{
                xtype: 'LeftPanel'
            }, {
                region: 'center',
                layout: 'border',
                baseCls: 'xlib-bkg',
                items: [{
                    xtype: 'TopPanel'
                }, {
                    xtype: 'CenterPanel'
                }]
            }
        ]
        
        this.callParent(arguments);
    }
    
});