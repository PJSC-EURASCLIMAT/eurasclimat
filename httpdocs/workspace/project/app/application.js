Ext.Loader.setConfig({
    disableCaching: false
});
Ext.define('Project.Application', {
    
    name: 'Project',

    extend: 'Ext.app.Application',
    
    paths: {
        //'xlib': '/workspace/common/src/xlib'
    },

    views: [
        'Project.view.Viewport',
        'Project.view.Main',
        
        'Project.view.abstract.Info',
        'Project.view.abstract.InfoEditor',
        'Project.view.abstract.ProjectTree',
        'Project.view.abstract.ProjectTreeContextMenu',

        'Project.view.preparation.Layout',
        'Project.view.preparation.Info',
        'Project.view.preparation.InfoEditor',
        'Project.view.preparation.ProjectTree',
        'Project.view.preparation.ProjectTreeContextMenu',
        'Project.view.preparation.CommentPanel',
        
        'Project.view.execution.Layout',
        'Project.view.execution.Info',
        'Project.view.execution.InfoEditor',
        'Project.view.execution.ProjectTree',
        'Project.view.execution.ProjectTreeContextMenu',
        'Project.view.execution.StageList',
        'Project.view.execution.StageEditor',
        'Project.view.execution.DocList',
        'Project.view.execution.StageChart'
        
    ],

    controllers: [
        'Project.controller.abstract.ProjectTreeController',
        'Project.controller.abstract.InfoController',
        'Project.controller.abstract.InfoEditController',

        'Project.controller.preparation.LayoutController',
        'Project.controller.preparation.ProjectTreeController',
        'Project.controller.preparation.InfoController',
        'Project.controller.preparation.InfoEditController',
        'Project.controller.preparation.CommentPanelController',

        'Project.controller.execution.LayoutController',
        'Project.controller.execution.ProjectTreeController',
        'Project.controller.execution.InfoController',
        'Project.controller.execution.InfoEditController',
        'Project.controller.execution.StageListController',
        'Project.controller.execution.StageEditorController',
        'Project.controller.execution.DocListController',
        'Project.controller.execution.StageChartController'
    ],
    
    models: [
        'Project.model.InfoModel',
        'Project.model.ProjectTreeModel',
        'Project.model.StageModel',
        'Project.model.DocModel',
        'Project.model.StageChartModel',
        'Project.model.CommentModel',
        'Project.model.VoteModel',
        'Project.model.AccountModel'
    ],

    stores: [
        'Project.store.AccountStore',
        
        'Project.store.abstract.ProjectTreeStore',
        
        'Project.store.preparation.ProjectTreeStore',
        'Project.store.preparation.CommentStore',
        'Project.store.preparation.VoteStore',
        
        'Project.store.execution.ProjectTreeStore',
        'Project.store.execution.StageStore',
        'Project.store.execution.DocStore',
        'Project.store.execution.StageChartStore'
    ]
    
});
