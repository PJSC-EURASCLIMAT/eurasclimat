Ext.define('Project.view.Main', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.project-main',
    
    split: true,
    
    hidden: !acl.isView('projectdev'),
    
    layout: {
        type: 'border',
        split: true
    },
    
    border: false,
    
    items: [
        {
            xtype: 'project-tree',
            split: true,  
            region: 'west',
            width: 200,
            hidden: !acl.isView('projectdev'),
        }, {
            xtype: 'project-tree-context-menu',
            floating: true,
            hidden: true
        }, {
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
                    xtype: 'project-detail',
                    region: 'north',
                    height: '66%'
                }, 
                {
                    region: 'center',
                    items: [{
                        xtype: 'project-stage-chart',  
                        //autoScroll: true,
                        bodyPadding: 5,
                        oveflowX: 'scroll'
                    }]
                }
            ]
        }
    ]
});