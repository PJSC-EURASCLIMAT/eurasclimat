/**
 * @class xlib.desktop.Module
 */
Ext.define('xlib.desktop.Module', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    id: null,

    name: null,
    
    iconCls: null,
    
    shortcutCls: null,
    
    showInStartMenu: true,
    
    showShortcut: true,
    
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
        this.init();
    },

    init: function() {
        
        if (!this.shortcutCls) {
            this.shortcutCls = this.iconCls
        }
        
        if (this.showInStartMenu) {
            this.launcher = {
                text: this.name,
                iconCls: this.iconCls,
                handler: this.createWindow,
                scope: this
            };
        }

    },
    
    createWindow: function() {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.id);
        if (!win) {
            
            win = desktop.createWindow({
                id: this.id,
                title: this.name,
                width: 740,
                height: 480,
                iconCls: this.iconCls,
                animCollapse: false,
                constrainHeader: true,
                border: false,
                layout: 'fit',
                items: []
            });
            
            this.run(win);
        }
        win.show();
        return win;
    },
    
    run: Ext.emptyFn
});

