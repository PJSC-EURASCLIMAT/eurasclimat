Ext.define('EC.SysDev.view.Main', {

    extend: 'Ext.container.Container',

    alias: 'widget.project-main',

    hidden: !acl.isView('projectdev'),

//    border: false,

    layout: {
        type: 'vbox',
        align: "stretch"
    },
    items: [

        {
            xtype: 'tabpanel',
            activeTab: 'project-preparation',
            itemId: 'main-tabs',
            border: false,
            items: [
                {
                    title: 'Формирование',
                    itemId: 'project-preparation'
                }
                ,{
                    title: 'Исполнение',
                    itemId: 'project-execution'
                }
            ]
        },

        {
            xtype: "container",
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'project-tree',
                    autoScroll: true,
                    width: 200
                },
                {
                    xtype: 'project-layout',
                    flex: 1
                },
                {
                    xtype: 'project-tree-context-menu',
                    floating: true,
                    hidden: true
                }
            ]
        }

//        {
//            xtype: 'tabpanel',
//            activeTab: 'project-preparation',
//            border: false,
//            style: {border: "2px solid blue"},
//            width: 200,
//            items: [
//                {
//                    xtype: 'project-tree',
//                    title: 'Формирование',
//                    itemId: 'project-preparation'
//                }
//                ,{
//                    xtype: 'project-tree',
//                    title: 'Исполнение',
//                    itemId: 'project-execution'
//                }
//            ]
//        },


    ]
});