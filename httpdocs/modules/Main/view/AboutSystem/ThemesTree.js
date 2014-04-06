Ext.define('EC.Main.view.AboutSystem.ThemesTree', {

    extend: 'xlib.Tree',
    
    alias: ['widget.AboutSystemThemesTree'],
    
//    store: 'EC.Main.store.AboutSystem.ThemesTree',

    controllerURL: '/json/aboutsystem/themes/',
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',

    permissions: acl.isUpdate('aboutsystem')

    
});