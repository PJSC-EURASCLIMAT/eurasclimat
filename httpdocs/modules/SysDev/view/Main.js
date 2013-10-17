Ext.define('EC.SysDev.view.Main', {

    extend: 'Ext.container.Container',

    alias: 'widget.project-main',

    hidden: !acl.isView('sysdev'),

//    style: {border: "1px solid red"},

//    border: false,

    layout: {
        type: 'vbox',
        align: "stretch"
    },
    split: false,
    items: [

        {
            xtype: 'tabpanel',
            activeTab: 'project-preparation',
            itemId: 'main-tabs',
            bodyBorder: false,
            bodyStyle: {
                border: '0px solid blue'
            },
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
            style: { border: '1px solid #99bce8' },
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'project-tree',
                    autoScroll: true,
//                    border: false,
                    border: '0 1px 0 0',
                    preventHeader: true,
//                    hideMode: 'offsets',
//                    hidden: true,
//                    header: false,
//                    hideHeaders: true,
//                    frameHeader: false,
////                    border: '0px 1px 0px 0px',
                    bodyStyle: {
                        borderTop: '0px',
                        borderRight: '1px solid #99bce8',
                        borderBottom: '0px',
                        borderLeft: '0px'
                    },
                    width: 200
                },
                {
                    xtype:"container",
                    itemId: 'backInfo',
                    flex: 1,
                    html: 'Выберите проект',
                    hidden: true
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