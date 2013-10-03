Ext.define('EC.Project.view.preparation.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.project-preparation',
    
    layout: {
        type: 'border'
    },
    
    border: false,
    
    items: [
        {
            xtype: 'project-preparation-tree',
            split: true,  
            region: 'west',
            width: 200,
            hidden: !acl.isView('projectdev')
        }, {
            xtype: 'project-preparation-tree-context-menu',
            floating: true,
            hidden: true
        }, {
            xtype: 'tabpanel',
            itemId: 'project-preparation-detail-tabs',
            hidden: true,
            region: 'center',
            border: false,
            split: true,
            layout: 'fit',
            items: [
                {
                    title: 'Описание проекта',
                    xtype: 'panel',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'project-preparation-info-component',
                            hidden: false,//!acl.isView('projectdev', 'info'),
                            itemId: 'info',
                            autoScroll: true
                        }, {
                            xtype: 'project-preparation-info-editor',
                            itemId: 'info-editor'
                        }
                    ]
                }, {
                    title: 'Обсуждение и голосование',
                    xtype: 'project-comment-panel',
                    hidden: !acl.isView('projectdev', 'comments'),
                    itemId: 'projectComment'
                }
            ]
        }
    ]
    
});