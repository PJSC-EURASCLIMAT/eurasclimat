Ext.define('Project.Application', {
    
    name: 'Project',

    extend: 'Ext.app.Application',

    views: [
        'Project.view.Viewport',
        'Project.view.Main',
        'Project.view.ThemeTree',
        'Project.view.ThemeTreeContextMenu',
        'Project.view.Detail',
        'Project.view.Info',
        'Project.view.StageList',
        'Project.view.DocList',
        'Project.view.CommentPanel',
        'Project.view.StageChart'
    ],

    controllers: [
        'Project.controller.ThemeTreeController',
        'Project.controller.DetailController',
        'Project.controller.InfoController',
        'Project.controller.StageListController',
        'Project.controller.DocListController',
        'Project.controller.CommentPanelController',
        'Project.controller.StageChartController'
    ],
    
    models: [
        'Project.model.ThemeTreeModel',
        'Project.model.StageModel',
        'Project.model.DocModel',
        'Project.model.StageChartModel',
        'Project.model.CommentModel',
        'Project.model.VoteModel'
    ],

    stores: [
        'Project.store.ThemeTreeStore',
        'Project.store.StageStore',
        'Project.store.DocStore',
        'Project.store.StageChartStore',
        'Project.store.CommentStore',
        'Project.store.VoteStore'
    ]
    
});
