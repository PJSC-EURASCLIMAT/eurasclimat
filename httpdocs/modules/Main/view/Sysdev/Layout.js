Ext.define('EC.Main.view.Sysdev.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.SysdevLayout',
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'SysdevThemesTree',
        region: 'west',
        width: 170
    }, {
        xtype: 'panel',
        type: 'preview',
        bodyPadding: 5,
        autoScroll: true,
        loader: {
            url: '/sysdev/description/get-description-content',
            loadMask: true
        },
        region: 'center',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom', 
            hidden: !acl.isUpdate('sysdev'),
            items: [{
                text: 'Редактировать',
                action: 'edit'
            }]
        }]
    }]
});