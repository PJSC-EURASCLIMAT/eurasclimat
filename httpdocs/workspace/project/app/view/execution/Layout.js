Ext.define('Project.view.execution.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.project-execution',
    
    layout: 'border',
    
    border: false,
    
    items: [
        {
            xtype: 'project-execution-tree',
            split: true,  
            region: 'west',
            width: 200,
            hidden: !acl.isView('projectdev'),
        }, {
            xtype: 'project-execution-tree-context-menu',
            floating: true,
            hidden: true
        }, {
            xtype: 'tabpanel',
            region: 'center',
            border: false,
            split: true,
            layout: 'fit',
            items: [
                {
                    title: 'Описание проекта',
                    xtype: 'project-execution-info-component',
                    hidden: !acl.isView('projectdev', 'info'),
                    itemId: 'info',
                    autoScroll: true
                }, {
                    title: 'График исполнения',
                    xtype: 'project-stage-chart',  
                    //autoScroll: true,
                    bodyPadding: 5,
                    oveflowX: 'scroll',
                    itemId: 'stageChart'
                }, {
                    title: 'Сведения об исполнении проекта',
                    xtype: 'project-stage-list',
                    hidden: !acl.isView('projectdev', 'stages'),
                    itemId: 'stages'
                }, {
                    title: 'Документация проекта',
                    xtype: 'project-doc-list',
                    hidden: !acl.isView('projectdev', 'docs'),
                    itemId: 'docs'
                }
            ]
        }
    ]

});