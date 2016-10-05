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
        border: false,
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
            xtype: 'panel',
            dock: 'top',
            height: 140,
            padding: 10,
            border: false,
            layout: 'border',
            items: [{
                xtype: 'panel',
                region: 'west',
                border: false,
                html: '<img src="/images/logo.png" style="padding-left:20px;">'
            },{
                xtype: 'panel',
                region: 'east',
                border: false,
                html: '<img src="/images/rekvizits.png" height="120" style="padding-right:30px;">'
            }]
        }, {
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