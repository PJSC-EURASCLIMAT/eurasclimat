/**
 * Here is the modules list installed on application.
 * To install module, just add here a class name, which extends 'xlib.desktop.Module' 
 */
var MyDesktopModulesList = [
    'EC.Catalog.Module'
];

/**
 * @class EC.MyDesktop.Modules
 * 
 * Generate modules list & desctop shortcuts list
 *   
 */
Ext.define('EC.MyDesktop.Modules', {

    shortcuts: [],
    
    requires: function() {
        return MyDesktopModulesList;
    },
    
    getModules: function() {
        
        var ret = [], me = this;
        
        Ext.each(MyDesktopModulesList, function(i) {
            
            var module = Ext.create(i);
        
            if (module.showShortcut) {
            
                me.shortcuts.push({
                    module: module.id,
                    name: module.name,
                    iconCls: module.shortcutCls
                });
            }
            
            ret.push(module);
        });
        
        return ret;
    }
});