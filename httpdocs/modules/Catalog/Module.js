Ext.define('EC.Catalog.Module', {
    
    extend: 'xlib.desktop.Module',
    
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
    }
});