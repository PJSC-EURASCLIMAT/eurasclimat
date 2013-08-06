Ext.define('EC.Main.view.ProjectdevEditor.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    split: true,
    
    alias: 'widget.ProjectdevEditorLayout',
    
    hidden: !acl.isView('projectdev'),
    
    layout: {
        type: 'border',
        split: true
    },
    
    border: false,
    
    items: [
        {
            xtype: 'ProjectdevEditorThemesTree',
            split: true,  
            region: 'west',
            width: 170
        }, 
        {
            layout: 'border',
            region: 'center',
            border: false,
            split: true,
            defaults: {
                layout: 'fit',
                split: true
            },
            items : [
                {
                    xtype: 'ProjectdevEditorDetail',
                    region: 'north',
                    height: '66%'
                }, 
                {
                    region: 'center',
                    items: [{
                        xtype: 'ProjectdevEditorStagesChart',  
                        //autoScroll: true,
                        bodyPadding: 5,
                        oveflowX: 'scroll'
                    }]
                }
            ]
        }
    ]
});