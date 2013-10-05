Ext.define('EC.Project.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'EC.Project.view.Viewport',
        'EC.Project.view.Main',

        'EC.Project.view.abstract.Info',
        'EC.Project.view.abstract.InfoEditor',
        'EC.Project.view.abstract.ProjectTree',
        'EC.Project.view.abstract.ProjectTreeContextMenu',

        'EC.Project.view.preparation.Layout',
        'EC.Project.view.preparation.Info',
        'EC.Project.view.preparation.InfoEditor',
        'EC.Project.view.preparation.ProjectTree',
        'EC.Project.view.preparation.ProjectTreeContextMenu',
        'EC.Project.view.preparation.CommentPanel',

        'EC.Project.view.execution.Layout',
        'EC.Project.view.execution.Info',
        'EC.Project.view.execution.InfoEditor',
        'EC.Project.view.execution.ProjectTree',
        'EC.Project.view.execution.ProjectTreeContextMenu',
        'EC.Project.view.execution.StageList',
        'EC.Project.view.execution.StageEditor',
        'EC.Project.view.execution.DocList',
        'EC.Project.view.execution.StageChart'

    ],

    controllers: [
        'EC.Project.controller.abstract.ProjectTreeController',
        'EC.Project.controller.abstract.InfoController',
        'EC.Project.controller.abstract.InfoEditController',

        'EC.Project.controller.preparation.LayoutController',
        'EC.Project.controller.preparation.ProjectTreeController',
        'EC.Project.controller.preparation.InfoController',
        'EC.Project.controller.preparation.InfoEditController',
        'EC.Project.controller.preparation.CommentPanelController',

        'EC.Project.controller.execution.LayoutController',
        'EC.Project.controller.execution.ProjectTreeController',
        'EC.Project.controller.execution.InfoController',
        'EC.Project.controller.execution.InfoEditController',
        'EC.Project.controller.execution.StageListController',
        'EC.Project.controller.execution.StageEditorController',
        'EC.Project.controller.execution.DocListController',
        'EC.Project.controller.execution.StageChartController'
    ],

    models: [
        'EC.Project.model.InfoModel',
        'EC.Project.model.ProjectTreeModel',
        'EC.Project.model.StageModel',
        'EC.Project.model.DocModel',
        'EC.Project.model.StageChartModel',
        'EC.Project.model.CommentModel',
        'EC.Project.model.VoteModel',
        'EC.Project.model.AccountModel'
    ],

    stores: [
        'EC.Project.store.AccountStore',

        'EC.Project.store.abstract.ProjectTreeStore',

        'EC.Project.store.preparation.ProjectTreeStore',
        'EC.Project.store.preparation.CommentStore',
        'EC.Project.store.preparation.VoteStore',

        'EC.Project.store.execution.ProjectTreeStore',
        'EC.Project.store.execution.StageStore',
        'EC.Project.store.execution.DocStore',
        'EC.Project.store.execution.StageChartStore'
    ]
//
//    ,init: function(container) {
//
//        alert("asdfljasd;lfjas;dlfkjasd;flkjasdf;lkajsdf;lkasdf;l;lskdl");
//        if (container.down('project-main')) {
//            container.down('project-main').show();
//            return;
//        }
//        container.add({xtype: 'project-main'});
//    }

    ,run: function(container) {

        this.container = container;

        panel = container.add(this.getView('EC.Project.view.Main').create());

        this.getController('EC.Project.controller.preparation.LayoutController').run();
        this.getController('EC.Project.controller.preparation.CommentPanelController').run();
        this.getController('EC.Project.controller.preparation.InfoController').run();
        this.getController('EC.Project.controller.preparation.InfoEditController').run();
        this.getController('EC.Project.controller.preparation.ProjectTreeController').run();

        this.getController('EC.Project.controller.execution.LayoutController').run();
        this.getController('EC.Project.controller.execution.DocListController').run();
        this.getController('EC.Project.controller.execution.InfoController').run();
        this.getController('EC.Project.controller.execution.ProjectTreeController').run();
        this.getController('EC.Project.controller.execution.StageChartController').run();
        this.getController('EC.Project.controller.execution.StageEditorController').run();
        this.getController('EC.Project.controller.execution.StageListController').run();




//
//        var content = container.add({
//            xtype: 'project-main'
//        });
//
//        this.initProjectComponents(content);
//        var treePanel = content.down('ProjectdevThemesTree');
//
//        treePanel.on('select', function(tree, record, index, eOpts) {
//
//            this.project = record;
//
//            if (record.get('leaf') == true) {
//
//                this.clearProjectComponents();
//                this.loadProjectDetail(this.project);
//                this.showProjectDiscussion();
//
//            }
//
//        }, this);
//
//        if (treePanel.getStore().isLoading()) {
//
//            treePanel.getStore().on('load', function() {
//                treePanel.getSelectionModel().select(this.project);
//            }, this);
//
//        } else {
//            treePanel.getSelectionModel().select(this.project);
//        }
    }
});
