Ext.define('EC.Main.view.Projectdev.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.ProjectdevLayout',
    hidden: !acl.isView('projectdev'),
    layout: 'border',
    border: false,
    items: [{
        xtype: 'ProjectdevThemesTree',
        region: 'west',
        width: '34%'
    }, {
        xtype: 'panel',
        bodyPadding: 0,
        autoScroll: true,
        layout: 'border',
        region: 'center',
        border: false,
        width: '66%',
        items : [{
            xtype: 'panel',
            bodyPadding: 5,  
            autoScroll: true,
            region: 'center',
            layout:'fit',
            height: '66%',
            items:[{
                xtype: 'ProjectdevStagesChart'
            }]
        },{
            xtype: 'panel',
            bodyPadding: 5,
            autoScroll: true,
            layout: 'border',
            region: 'north',
            layout:'fit',
            height: '34%',
            items: [{
                xtype: 'ProjectdevDetail'
            }]
        }
      ]
    }]
});