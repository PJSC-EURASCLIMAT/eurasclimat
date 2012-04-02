Ext.define('EC.Catalog.Module', {
    
    extend: 'xlib.MyDesktop.Module',
    
    id: 'catalog-win',

    name: 'Каталог',
    
    iconCls: 'icon-grid',
    
    shortcutCls: 'grid-shortcut',
    
    showShortcut: true,
    
    showInStartMenu: true,
    
    run: function(win) {
        Ext.application({
            name: 'EC.Catalog',
            appFolder: './modules/Catalog',
            controllers: ['Main'],
            launch: function() {
                win.add({xtype: 'Layout'});
            }
        });
        
        return Ext.require('EC.Catalog.controller.Main',  
            function() { 
                var controller = Ext.create('EC.Catalog.controller.Main');
                controller.init();
            }
        )
        
    }
});