Ext.define('EC.SysDev.view.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.project-layout',
    
//    layout: {
//        type: 'border'
//    },
    layout: 'fit',

    border: false,
    
    items: [
//        {
//            xtype: 'project-tree',
//            split: true,
//            region: 'west',
//            width: 200,
//            hidden: !acl.isView('projectdev')
//        },
        {
            xtype: 'tabpanel',
            itemId: 'project-detail-tabs',
            hidden: true,
            border: false,
            split: true,
            layout: 'fit',

            items: [
                {
                    title: 'Описание проекта',
                    xtype: 'panel',
                    itemId: 'infoCnt',
                    border: false,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'project-info-component',
                            hidden: false,
                            itemId: 'info',
                            autoScroll: true
                        }, {
                            xtype: 'project-info-editor',
                            hidden: true,
                            itemId: 'info-editor'
                        }
                    ]
                }, {
                    title: 'Обсуждение и голосование',
                    xtype: 'project-comment-panel',
                    hidden: !acl.isView('projectdev', 'comments'),
                    itemId: 'projectComment'
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
                            xtype: 'project-stage-list'
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