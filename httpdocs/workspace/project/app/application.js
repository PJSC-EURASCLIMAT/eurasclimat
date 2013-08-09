Ext.define('Project.Application', {
    
    name: 'Project',

    extend: 'Ext.app.Application',

    views: [
        'Project.view.Viewport',
        'Project.view.Main',
        'Project.view.ThemeTree',
        'Project.view.Detail',
        'Project.view.StageList',
        'Project.view.DocList',
        'Project.view.StageChart'
    ],

    controllers: [
        'Project.controller.OriginalController'
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
