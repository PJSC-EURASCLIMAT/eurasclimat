Ext.define('Project.view.Detail', {

    extend: 'Ext.tab.Panel',
    
    alias: 'widget.project-detail',

    closable: false,

    border: false,

    bodyBorder: false,

    layout: 'fit',
    
    activeTab: 'info',
    
    itemId: 'detailTabs',
    
    items: [
        {
            title: 'Информация о проекте',
            xtype: 'project-info-component',
            hidden: !acl.isView('projectdev', 'info'),
            itemId: 'info',
            autoScroll: true
        }, 
        {
            title: 'Обсуждение и голосование',
            xtype: 'project-comment-panel',
            hidden: !acl.isView('projectdev', 'comments'),
            itemId: 'projectComment',
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
});