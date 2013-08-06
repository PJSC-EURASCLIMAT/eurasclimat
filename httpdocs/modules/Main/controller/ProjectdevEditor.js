Ext.define('EC.Main.controller.ProjectdevEditor', {
    
    extend: 'Ext.app.Controller',
        
    stores: [
        'EC.Main.store.ProjectdevEditor.ThemesTree',
        'EC.Main.store.ProjectdevEditor.Stages',
        'EC.Main.store.ProjectdevEditor.Docs',
        'EC.Main.store.ProjectdevEditor.StagesChart',
        'EC.Main.store.ProjectdevEditor.Comments',
        'EC.Main.store.ProjectdevEditor.Votes'
    ],
    
    models: [
        'EC.Main.model.ProjectdevEditor.ThemesTree',
        'EC.Main.model.ProjectdevEditor.Stages',
        'EC.Main.model.ProjectdevEditor.Docs',
        'EC.Main.model.ProjectdevEditor.StagesChart',
        'EC.Main.model.ProjectdevEditor.Comments',
        'EC.Main.model.ProjectdevEditor.Votes'
    ],

    views: [
        'EC.Main.view.ProjectdevEditor.Layout',
        'EC.Main.view.ProjectdevEditor.ThemesTree',
        'EC.Main.view.ProjectdevEditor.Detail',
        'EC.Main.view.ProjectdevEditor.StagesList',
        'EC.Main.view.ProjectdevEditor.DocsList',
        'EC.Main.view.ProjectdevEditor.StagesChart'
    ],
    
    project: 0,
    
    projectInfo: null,
    
    projectStages: null,
    
    projectComments: null,
    
    projectCommentsPanel: null,
    
    projectVotes: null,
    
    projectVoteResults: null,
    
    projectCommentsStore: null,
    
    projectDocs:null,
    
    projectChart: null,
    
    detailTab: null,
    
    gridProjectStages: null,
    
    gridProjectDocs: null,
    
    commentsText: null,
    
    votesResult : null,
    
    updateVoteResult: function() {
        
        if (!this.votesResult) {
            
            this.votesResult = Ext.create('Ext.data.Connection');
            
        } 
        var self = this;
        if (acl.isView('projectdev', 'votes')) {
            this.votesResult.request({
                url: '/json/sysdev/project-votes/get-count-by-project',
                params: {
                    'project_id': this.project.get('id')
                },
                success: function(response, opts) {
                    var res = Ext.decode(response.responseText);
                    if (res.success) {
                        self.projectVoteResults.items.getAt(1).setText('За голосов: ' + (res.data[1] ? res.data[1] 
                            : '0'));
                        self.projectVoteResults.items.getAt(2).setText('Против голосов: ' + (res.data[2] ? res.data[2] 
                            : '0'));
                        self.projectVoteResults.items.getAt(3).setText('Предложений доработать: ' + (res.data[3] ? res.data[3] 
                            : '0'));
                    }
                },
                failure: function(response, opts) {
                    console.log('Error updating votes');
                }
            });
        }
    },
    
    initProjectComponents: function(content) {

        this.detailTab = content.down('#detailTabs');
        this.detailTab.on('tabchange', function(tabPanel, newCard, oldCard, eOpts) {
            this.loadProjectDetail(this.project);
        }, this)
      
        this.projectInfo = content.down('#info');
        this.projectInfo.getLoader().on('load', function(response, options, eOpts) {
            
            var result = Ext.JSON.decode(options.responseText);
            if (result.success) {
                result.data['date_plan_begin'] = Ext.Date.parse(result.data['date_plan_begin'],'Y-m-d H:i:s');
                result.data['date_fact_begin'] = Ext.Date.parse(result.data['date_fact_begin'],'Y-m-d H:i:s');
                result.data['date_plan_end'] = Ext.Date.parse(result.data['date_plan_end'],'Y-m-d H:i:s');
                result.data['date_fact_end'] = Ext.Date.parse(result.data['date_fact_end'],'Y-m-d H:i:s');
                result.data['date_vote_begin'] = Ext.Date.parse(result.data['date_vote_begin'],'Y-m-d H:i:s');
                result.data['date_vote_end'] = Ext.Date.parse(result.data['date_vote_end'],'Y-m-d H:i:s');
                result.data['date_discuss_begin'] = Ext.Date.parse(result.data['date_discuss_begin'],'Y-m-d H:i:s');
                result.data['date_discuss_end'] = Ext.Date.parse(result.data['date_discuss_end'],'Y-m-d H:i:s');
                this.projectInfo.update(result.data); 
            }
        }, this);
      
        this.projectStages = this.detailTab.down('#stages');
        this.gridProjectStages = this.getView('EC.Main.view.ProjectdevEditor.StagesList').create();
        this.projectStages.add(this.gridProjectStages);
          
        this.projectDocs = this.detailTab.down('#docs');
        this.gridProjectDocs = this.getView('EC.Main.view.ProjectdevEditor.DocsList').create();
        this.projectDocs.add(this.gridProjectDocs);
  
        this.projectChart = content.down('#stagesChart');
        
        this.projectChart.getStore().on('load', function(store, records, successful, eOpts) {
            
            if (records.length == 0) {
                this.projectChart.hide();
            } else {
                this.projectChart.show();
            }
            var finishDatePlan = 0;
            var finishDateFact = 0;

            if (records.length > 0) {
                finishDatePlan = records[records.length-1].get('date_plan_end');
                finishDateFact = records[records.length-1].get('date_fact_end');
            }

            for (var i = 0; i < records.length; i++) {
                
                var rec = records[i];
                rec.set('date_plan_finish', finishDatePlan);
                rec.set('date_fact_finish', finishDateFact);
                if (i == records.length-1) {
                    rec.set('finish_display', 'Этап ' + rec.get('index') + ' - ' + rec.get('name') +  ' (Финиш)');
                } else {
                    rec.set('finish_display', 'Этап ' + rec.get('index') + ' - ' + rec.get('name'));
                }
            }
        }, this);
        
        this.projectComments = content.down('#projectComments');
        this.projectCommentsPanel = this.projectComments.down('#projectCommentsPanel');
        this.projectCommentsStore = Ext.create('EC.Main.store.ProjectdevEditor.Comments');
      
        this.projectCommentsStore.on('load', function(stor, records, successful, eOpts) {
            
            if (successful && records.length > 0) {
                
                var updRecords = [];
                if (records.length > 0) {
                    
                    for (var i = 0; i < records.length; i++) {
                        updRecords.push(records[i].data);
                    }
                    this.projectCommentsPanel.update(updRecords);
                }
                
            } else {
                
                this.projectCommentsPanel.update('');
                
            }
            
            this.showProjectDiscussion();
        }, this);
        
        if (acl.isUpdate('projectdev', 'comments')) { 
            this.commentsText = this.projectCommentsPanel.down('#commentContent');
            this.commentSubmit = this.projectCommentsPanel.down('#commentSubmit');
            this.commentSubmit.on('click', function() {
            
            this.commentsText.on('blur', function(component, the, eOpts ) {
                component.clearInvalid();
            }, this);
            
            if (this.commentsText.isValid()) {
                
                    this.projectCommentsStore.add({content: this.commentsText.getValue(), 
                        project_id: this.project.get('id')});
                    this.projectCommentsStore.sync();
                    this.projectCommentsStore.load({params:{project_id: this.project.get('id')}});
                    this.commentsText.setValue('');

                }
            }, this);
        }
        
        this.projectVotesStore = Ext.create('EC.Main.store.ProjectdevEditor.Votes');
        
        if (acl.isUpdate('projectdev', 'comments')) {
            
            this.projectCommentsPanel.down('#markButtonFor').on('click', function(button, e, eOpts) {
                this.projectVotesStore.add({mark_id:1, project_id: this.project.get('id')});
                this.projectVotesStore.sync();
                this.projectVotesStore.load({params:{project_id: this.project.get('id')}});
            }, this);
            
            this.projectCommentsPanel.down('#markButtonAgainst').on('click', function(button, e, eOpts) {
                this.projectVotesStore.add({mark_id:2, project_id: this.project.get('id')});
                this.projectVotesStore.sync();
                this.projectVotesStore.load({params:{project_id: this.project.get('id')}});
            }, this);
            
            this.projectCommentsPanel.down('#markButtonRemake').on('click', function(button, e, eOpts){
                this.projectVotesStore.add({mark_id:3, project_id: this.project.get('id')});
                this.projectVotesStore.sync();
                this.projectVotesStore.load({params:{project_id: this.project.get('id')}});
            }, this);
        }
      
        this.projectVoteResults = this.detailTab.down('#voteResults');
        this.projectVotes = this.detailTab.down('#markMenu');
      
        this.projectVotesStore.on('load', function(stor, records, successful, eOpts) {
            
            if (records.length == 0) {
                
                var isProjectVote = this.isProjectVote();
                
                if (acl.isUpdate('projectdev', 'votes')) {
                    
                    if (isProjectVote) {
                        this.projectVotes.show();
                        this.projectVoteResults.hide();
                    } else {
                        if (acl.isView('projectdev', 'votes')) {
                            this.projectVotes.hide();
                            this.projectVoteResults.show();
                            this.updateVoteResult();
                        } else {
                            this.projectVotes.hide();
                            this.projectVoteResults.hide();
                        }
                    }
                    
                } else {
                    if (acl.isView('projectdev', 'votes')) {
                        this.projectVotes.hide();
                        this.projectVoteResults.show();
                    } else {
                        this.projectVotes.hide();
                        this.projectVoteResults.hide();
                    }
                }
                
            } else {
                if (acl.isView('projectdev', 'votes')) {
                    this.projectVotes.hide();
                    this.projectVoteResults.show();
                    this.updateVoteResult();
                }
            }
            
            this.showProjectDiscussion();
            
        }, this);
               
        if ('portlet' == this.container.getXType()) {
            this.detailTab.tabBar.hide();
            this.container.down('ProjectdevEditorDetail').setSize(20, 380);
        }
    },
    
    clearProjectComponents: function() {
        
        this.projectInfo.update('');
        this.projectInfo.loaded = false;
      
        this.projectStages.loaded = false;
        this.gridProjectStages.getStore().loadRecords([],{addRecords: false});
      
        this.projectDocs.loaded = false;
        this.gridProjectDocs.getStore().loadRecords([], {addRecords: false});
      
        this.projectChart.getStore().loadRecords([], {addRecords: false});
        this.projectComments.loaded = false;
        
        if (acl.isUpdate('projectdev', 'comments')) {
            this.commentsText.setValue('');
            this.commentsText.clearInvalid(); 
        }
                
    },
    
    showProjectDetailTab: function() {
        
        this.detailTab.show();
        if ('portlet' == this.container.getXType()) {
            this.detailTab.tabBar.hide();
            this.container.down('ProjectdevDetail').setSize(20, 380);
        }
        
    },
    
    showProjectDiscussion: function() {
        
        var isDiscussion = false,
            isVote = false,
            currentDate = new Date();
        
        
        if (null == this.project.get('date_discuss_begin') || null == this.project.get('date_discuss_end')) {
            //alert('1');
            isDiscussion = false;
            
        } else  if (currentDate.getTime() >= this.project.get('date_discuss_begin').getTime() 
            && currentDate.getTime() <= this.project.get('date_discuss_end').getTime()) {
            
            isDiscussion = true;
            
        }
        if (null == this.project.get('date_vote_begin') || null == this.project.get('date_vote_end')) {
            //alert('12');
            isVote = false;
            
        } else if  (currentDate.getTime() >= this.project.get('date_vote_begin').getTime() 
            && currentDate.getTime() <= this.project.get('date_vote_end').getTime()) {
            
            isVote = true;
            
        }
        
        if (!isDiscussion && !isVote) {
            
            this.detailTab.child('#projectComments').tab.hide();
            this.detailTab.setActiveTab('info');
            return;
            
        } else {
            
            this.detailTab.child('#projectComments').tab.show();
            
        }
        
        if (isDiscussion) {
            
            this.commentSubmit.show();
            this.commentsText.show(); 
            
        } else {
            
            this.commentSubmit.hide();
            this.commentsText.hide(); 
            
        }
                
        /*if (isVote) {
            
            this.projectComments.down('#markMenu').show();
            
        } else {
            
            this.projectComments.down('#markMenu').hide();
            
        }*/
        
    },
    
    isProjectVote: function() {
        
        if (null == this.project.get('date_vote_begin') || null == this.project.get('date_vote_end')) {
            return false;
        }
        var date = new Date();
        if (date.getTime() >= this.project.get('date_vote_begin').getTime() && date.getTime() <= 
                this.project.get('date_vote_end').getTime()) {
            return true;
        }
        
    },
    
    loadProjectDetail: function(record) {
        
        if (!acl.isView('projectdev')) {
            return;
        }
        
        if (record.get('leaf') == true) {
            
            var activeTabName = this.detailTab.getActiveTab().itemId;
            
            switch (activeTabName) {
                case 'info':
                    if (acl.isView('projectdev', 'info')) {
                       if (!this.projectInfo.loaded) {
                        
                            this.projectInfo.getLoader().load({
                                params: {
                                    id: record.get('id')
                                }
                            });

                            this.projectInfo.loaded = true;
                            
                        }
                    }
                    
                    break;
                
                case 'stages':
                    if (acl.isView('projectdev', 'stages')) {
                        
                        if (!this.projectStages.loaded) {

                            this.gridProjectStages.getStore().load({
                                params:{project_id: record.get('id')}
                            });
                            this.projectStages.loaded = true;
                        }
                        
                    }
                    break;
                
                case 'docs':
                    if (!this.projectDocs.loaded) {
                        
                        if (acl.isView('projectdev', 'docs')) {
                            
                            this.gridProjectDocs.getStore().load({
                                params:{project_id: record.get('id')}
                            });
                            
                            this.projectDocs.loaded = true;
                        }
                        
                    }
                    break;
                    
                case 'projectComments':
                    if (!this.projectComments.loaded) {
                        
                        if (acl.isView('projectdev', 'comments')) {
                            
                            this.projectCommentsStore.load({
                                params:{project_id: record.get('id')}
                            });
                            
                            this.projectComments.loaded = true;
                        }
                        
                        if (acl.isView('projectdev', 'votes')) {
                            
                            this.projectVotesStore.load({
                                params:{project_id: record.get('id')}
                            });
                            
                        }
                                                 
                    }
                    break;
              }
              
              if ('portlet' != this.container.getXType()) {
                  if (acl.isView('projectdev', 'chart')) {
                    this.projectChart.getStore().load({
                        params:{project_id: record.get('id')}
                    });
                  }
              }
              
              this.showProjectDetailTab();
              
        } else {
            this.detailTab.hide();
            this.projectChart.hide();
        }
    },
    
    run: function(container) {
        
        this.container = container;
        
        var content = container.add({
            xtype: 'ProjectdevEditorLayout'
        });

        this.initProjectComponents(content);
        var treePanel = content.down('ProjectdevEditorThemesTree');
        
        treePanel.on('select', function(tree, record, index, eOpts) {
            
            this.project = record;
            
            if (record.get('leaf') == true) {
                
                this.clearProjectComponents();
                this.loadProjectDetail(this.project);
                this.showProjectDiscussion();
                
            }
            
        }, this);
        
        if (treePanel.getStore().isLoading()) {
            
            treePanel.getStore().on('load', function() {
                treePanel.getSelectionModel().select(this.project);
            }, this);
            
        } else {
            treePanel.getSelectionModel().select(this.project);
        }   
    }
});