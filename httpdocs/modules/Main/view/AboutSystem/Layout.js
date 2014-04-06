Ext.define('EC.Main.view.AboutSystem.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.AboutSystemLayout',
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'AboutSystemThemesTree',
        region: 'west',
        split: true,
        border: '0 1 0 0',
        width: 200
    }, {
        xtype: 'panel',
        type: 'preview',
        border: '0 0 0 1',
        bodyPadding: 5,
        autoScroll: true,
        bodyStyle: 'font-size:11px;',
        loader: {
            url: '/aboutsystem/description/get-description-content',
            loadMask: true
        },
        layout: 'fit',
        region: 'center',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom', 
            hidden: !acl.isUpdate('aboutsystem'),
            items: [{
                text: 'Редактировать',
                action: 'edit'
            }]
        }]
    }]
    
});