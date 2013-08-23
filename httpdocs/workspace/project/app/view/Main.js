Ext.define('Project.view.Main', {
    
    extend: 'Ext.tab.Panel',
    
    alias: 'widget.project-main',

    hidden: !acl.isView('projectdev'),

    border: false,
    
    activeTab: 'project-preparation',
    
    items: [
        {
            xtype: 'project-preparation',
            title: 'Формирование',
            itemId: 'project-preparation'
        }, {
            xtype: 'project-execution',
            title: 'Исполнение',
            itemId: 'project-execution'
        }
    ]
});