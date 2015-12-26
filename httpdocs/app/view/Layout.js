Ext.define('App.view.Layout', {

    extend: 'Ext.container.Viewport',

    layout: 'border',
    
    baseCls: 'xlib-wallpaper',
    
    items: [{
    	xtype: 'panel',
    	region: 'north',
    	height: 100,
    	border: false,
    	html: '<iframe style="height: 100px; width: 100%; border:none;" src="/index/nyb"></iframe>'
    }, {
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
    }]
});