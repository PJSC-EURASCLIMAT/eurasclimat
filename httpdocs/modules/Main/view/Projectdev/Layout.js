Ext.define('EC.Main.view.Projectdev.Layout', {
    
    extend: 'Ext.panel.Panel',
    split: true,
    alias: 'widget.ProjectdevLayout',
    hidden: !acl.isView('projectdev'),
    layout: {
      type: 'border',
      split:true
    },
    border: false,
    items: [{
        xtype: 'ProjectdevThemesTree',
        split: true,  
        region: 'west',
        width: '34%'
    }, {
        xtype: 'panel',
        bodyPadding: 0,
//        autoScroll: true,
        layout: 'border',
        region: 'center',
        border: false,
        split: true,  
        width: '34%',
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
            height: '66%',
            items: [{
                xtype: 'ProjectdevDetail'
            }],
            split: true
        }
      ]
    }]
});