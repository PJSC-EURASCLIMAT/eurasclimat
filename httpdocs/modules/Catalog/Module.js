Ext.define('EC.Catalog.Module', {
    
    extend: 'xlib.desktop.Module',

    id: 'catalog-win',

    name: 'Каталог',
    
    iconCls: 'icon-grid',
    
    shortcutCls: 'grid-shortcut',
    
    getContent: function() {
        return Ext.require('EC.Catalog.controller.Main',  
            function() { 
                var controller = Ext.create('EC.Catalog.controller.Main');
                controller.init();
            }
        )
    }
});