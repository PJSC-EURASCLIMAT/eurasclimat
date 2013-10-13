Ext.define('EC.SysDev.controller.Main', {
    extend: 'Ext.app.Controller',

    views: [
        'EC.SysDev.view.Viewport',
        'EC.SysDev.view.Main',

        'EC.SysDev.view.abstract.Info',
        'EC.SysDev.view.abstract.InfoEditor',
        'EC.SysDev.view.abstract.ProjectTree',
        'EC.SysDev.view.abstract.ProjectTreeContextMenu',

        'EC.SysDev.view.preparation.CommentPanel',

        'EC.SysDev.view.execution.StageList',
        'EC.SysDev.view.execution.StageEditor',
        'EC.SysDev.view.execution.DocList',
        'EC.SysDev.view.execution.StageChart',

        'EC.SysDev.view.Layout',
        'EC.SysDev.view.ProjectTree',
        'EC.SysDev.view.ProjectTreeContextMenu',
        'EC.SysDev.view.Info',
        'EC.SysDev.view.InfoEditor'

    ],

    controllers: [
        'EC.SysDev.controller.abstract.ProjectTreeController',
        'EC.SysDev.controller.abstract.InfoController',
        'EC.SysDev.controller.abstract.InfoEditController',

        'EC.SysDev.controller.preparation.CommentPanelController',

        'EC.SysDev.controller.execution.StageListController',
        'EC.SysDev.controller.execution.StageEditorController',
        'EC.SysDev.controller.execution.DocListController',
        'EC.SysDev.controller.execution.StageChartController',

        'EC.SysDev.controller.InfoController',
        'EC.SysDev.controller.InfoEditController'
    ],

    models: [
        'EC.SysDev.model.InfoModel',
        'EC.SysDev.model.ProjectTreeModel',
        'EC.SysDev.model.StageModel',
        'EC.SysDev.model.DocModel',
        'EC.SysDev.model.StageChartModel',
        'EC.SysDev.model.CommentModel',
        'EC.SysDev.model.VoteModel',
        'EC.SysDev.model.AccountModel'
    ],

    stores: [
        'EC.SysDev.store.AccountStore',

        'EC.SysDev.store.abstract.ProjectTreeStore',

        'EC.SysDev.store.preparation.ProjectTreeStore',
        'EC.SysDev.store.preparation.CommentStore',
        'EC.SysDev.store.preparation.VoteStore',

        'EC.SysDev.store.execution.ProjectTreeStore',
        'EC.SysDev.store.execution.StageStore',
        'EC.SysDev.store.execution.DocStore',
        'EC.SysDev.store.execution.StageChartStore',

        'EC.SysDev.store.ProjectTreeStore'
    ]

    ,refs: [
        { ref: 'projectLayout', selector: 'project-layout' },
        { ref: 'projectTabs',   selector: 'project-layout #project-detail-tabs' },
        { ref: 'infoTab',       selector: 'project-layout #infoCnt' },
        { ref: 'commentTab',    selector: 'project-layout #projectComment' },
        { ref: 'chartTab',      selector: 'project-layout #stageChart' },
        { ref: 'stagesTab',     selector: 'project-layout #stages' },
        { ref: 'docsTab',       selector: 'project-layout #docs' },

        { ref: 'projectMain', selector: 'project-main' },
        { ref: 'mainTabs', selector: 'project-main #main-tabs' },
        { ref: 'projectTree', selector: 'project-tree' }
    ]

    ,currentProject: null
    ,currentProjectId: null


    ,projectSelected: function(record) {


        var tabs = this.getProjectTabs();

        if(record.data.leaf === false) {
            this.getProjectMain().down("#backInfo").show();
            this.getProjectLayout().hide();
            return;
        }


        tabs.setActiveTab('infoCnt');

        this.currentProjectId = record.getId();
        this.currentProject = record;

        this.getController('EC.SysDev.controller.InfoController').onProjectSelected(record);
        this.getController('EC.SysDev.controller.InfoEditController').onProjectSelected(record);
        this.getController('EC.SysDev.controller.preparation.CommentPanelController').onProjectSelected(record);
        this.getController('EC.SysDev.controller.execution.StageListController').onProjectSelected(record);
        this.getController('EC.SysDev.controller.execution.StageChartController').onProjectSelected(record);
        this.getController('EC.SysDev.controller.execution.DocListController').onProjectSelected(record);

        if (tabs.hidden === true || this.getProjectLayout().hidden) {
            this.getProjectMain().down("#backInfo").hide();

            this.getInfoTab().down("#info-editor").hide();
            this.getInfoTab().down("#info").show();

            this.getProjectLayout().show();
            tabs.show();
        }

        this.getStagesTab().down("#stage-editor").hide();
        this.getStagesTab().down("#stage-list").show();

    }

    ,showPrepTabs: function(){
        this.getCommentTab().tab.show();
        this.getChartTab().tab.hide();
        this.getStagesTab().tab.hide();
        this.getDocsTab().tab.hide();
    }

    ,showExecTabs: function(){
        this.getCommentTab().tab.hide();
        this.getChartTab().tab.show();
        this.getStagesTab().tab.show();
        this.getDocsTab().tab.show();
    }

    ,tabClick: function(tabPanel, newCard, oldCard, eOpts ) {
        switch (newCard.itemId) {
            case 'project-preparation':
                this.getProjectTree().filterBy('1','stage');
                this.showPrepTabs();
                break;

            case 'project-execution':
                this.getProjectTree().filterBy('2','stage');
                this.showExecTabs();
                break;
        }

        this.getProjectTabs().hide();

    }

    ,run: function(container) {
        var me = this;

        this.control({
            'project-main #main-tabs': {
                tabchange: this.tabClick,
                scope: this
            }
        });

        this.container = container;

        panel = container.add(this.getView('EC.SysDev.view.Main').create());

        this.infoController =  this.getController('EC.SysDev.controller.InfoController');
        this.infoEditController =  this.getController('EC.SysDev.controller.InfoEditController');
        this.stageListCnt = this.getController('EC.SysDev.controller.execution.StageListController');
        this.stageEditorCnt = this.getController('EC.SysDev.controller.execution.StageEditorController');
        this.projectTreeCnt = this.getController('EC.SysDev.controller.ProjectTreeController');
        this.commentCnt = this.getController('EC.SysDev.controller.preparation.CommentPanelController');

        this.infoController.run();
        this.infoController.on({
            'project-description-editing-requested': this.infoEditController.onEditorRequested,
            scope: this.infoEditController
        });

        this.infoEditController.run();
        this.infoEditController.on({
            'project-info-editor-hidden': this.infoController.onEditorHidden,
            'project-info-updated': function(record){
                me.infoController.onProjectInfoUpdated(record);
                me.projectTreeCnt.onProjectInfoUpdated(record);
            },
            scope: this.infoController
        });

        this.projectTreeCnt.run();
        this.projectTreeCnt.on({
            'project-selected': this.projectSelected,
            scope: this
        });

        this.commentCnt.run();
        this.stageEditorCnt.run();
        this.stageListCnt.run();

        this.stageListCnt.on({
            'stage-editing-requested': this.stageEditorCnt.onEditingRequest,
            'stage-adding-requested': this.stageEditorCnt.onAddingRequest,
            scope: this.stageEditorCnt
        });

        this.stageEditorCnt.on({
            'project-stage-editor-hidden': this.stageListCnt.onEditorHidden,
            scope: this.stageListCnt
        });

        this.getController('EC.SysDev.controller.execution.StageChartController').run();
        this.getController('EC.SysDev.controller.execution.DocListController').run();

        this.showPrepTabs();

    }
});
