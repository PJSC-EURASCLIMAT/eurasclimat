Ext.define('EC.Main.view.SmokerCabin.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.SmokerCabinLayout',
    
    layout: 'border',
    
    border: false,
    
    items: [{
        xtype: 'SmokerCabinThemesTree',
        region: 'west',
        width: 170
    }, {
        xtype: 'panel',
        type: 'preview',
        bodyPadding: 5,
        autoScroll: true,
        bodyStyle: 'font-size:11px;',
        loader: {
            url: '/smokercabin/description/get-description-content',
            loadMask: true
        },
        layout: 'fit',
        region: 'center',
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom', 
            hidden: !acl.isUpdate('smokercabin'),
            items: [{
                text: 'Редактировать',
                action: 'edit'
            }]
        }]
    }]
    
});