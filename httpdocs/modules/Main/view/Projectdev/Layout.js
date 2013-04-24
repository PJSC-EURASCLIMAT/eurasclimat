Ext.define('EC.Main.view.Projectdev.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    split: true,
    
    alias: 'widget.ProjectdevLayout',
    
    hidden: !acl.isView('projectdev'),
    
    layout: {
        type: 'border',
        split: true
    },
    
    border: false,
    
    items: [{
        xtype: 'ProjectdevThemesTree',
        split: true,  
        region: 'west',
        width: 170
    }, {
        layout: 'border',
        region: 'center',
        border: false,
        split: true,
        defaults: {
            layout: 'fit',
            split: true
        },
        items : [{
            xtype: 'ProjectdevDetail',
            region: 'north',
            height: '66%'
        }, {
            region: 'center',
            items: [{
                xtype: 'ProjectdevStagesChart',  
                //autoScroll: true,
                bodyPadding: 5,
                oveflowX: 'scroll'
            }]
        }]
    }]
});