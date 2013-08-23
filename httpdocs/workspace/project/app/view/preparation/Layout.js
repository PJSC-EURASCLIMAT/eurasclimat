Ext.define('Project.view.preparation.Layout', {
    
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
            hidden: !acl.isView('projectdev'),
        }, {
            xtype: 'project-preparation-tree-context-menu',
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
                    title: 'Информация о проекте',
                    xtype: 'project-preparation-info-component',
                    hidden: !acl.isView('projectdev', 'info'),
                    itemId: 'info',
                    autoScroll: true
                }, 
                {
                    title: 'Обсуждение и голосование',
                    xtype: 'project-comment-panel',
                    hidden: !acl.isView('projectdev', 'comments'),
                    itemId: 'projectComment',
                }
            ]
        }
    ]
    
});