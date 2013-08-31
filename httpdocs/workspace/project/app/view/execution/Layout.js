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
            itemId: 'project-execution-detail-tabs',
            hidden: true,
            region: 'center',
            border: false,
            split: true,
            layout: 'fit',
            activeTab: 'stages',
            items: [
                {
                    title: 'Описание проекта',
                    itemId: 'description',
                    xtype: 'panel',
                    layout: 'fit',
                    hidden: !acl.isView('projectdev', 'info'),
                    items: [
                        {
                            xtype: 'project-execution-info-component',
                            autoScroll: true
                        }, {
                            xtype: 'project-execution-info-editor',
                            hidden: true
                        }
                    ]
                }, {
                    title: 'График исполнения',
                    itemId: 'stageChart',
                    xtype: 'project-stage-chart',  
                    //autoScroll: true,
                    bodyPadding: 5,
                    oveflowX: 'scroll'
                }, {
                    title: 'Сведения об исполнении проекта',
                    itemId: 'stages',
                    xtype: 'panel',
                    layout: 'fit',
                    hidden: !acl.isView('projectdev', 'stages'),
                    items: [
                        {
                            xtype: 'project-stage-list',
                        }, {
                            xtype: 'project-execution-stage-editor',
                            hidden: true
                        }
                    ]
                }, {
                    title: 'Документация проекта',
                    itemId: 'docs',
                    xtype: 'project-doc-list',
                    hidden: !acl.isView('projectdev', 'docs')                    
                }
            ]
        }
    ]

});