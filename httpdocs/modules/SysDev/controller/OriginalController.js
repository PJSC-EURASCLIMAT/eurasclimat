Ext.define('EC.SysDev.controller.OriginalController', {
    
    extend: 'Ext.app.Controller',
            
    project: 0,
    
    projectInfo: null,
    
    projectStage: null,
    
    projectComment: null,
    
    projectCommentPanel: null,
    
    projectVote: null,
    
    projectVoteResults: null,
    
    projectCommentStore: null,
    
    projectDoc:null,
    
    projectChart: null,
    
    detailTab: null,
    
    gridProjectStage: null,
    
    gridProjectDoc: null,
    
    commentsText: null,
    
    votesResult: null,
    
    updateVoteResult: function() {
        
        if (!this.votesResult) {
            this.votesResult = Ext.create('Ext.data.Connection');
        } 
        
        var self = this;
        if (acl.isView('sysdev', 'votes')) {
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
//                    console.log('Error updating votes');
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
      
        this.projectStage = this.detailTab.down('#stages');
        this.gridProjectStage = this.getView('EC.SysDev.view.StageList').create();
        this.projectStage.add(this.gridProjectStage);
          
        this.projectDoc = this.detailTab.down('#docs');
        this.gridProjectDoc = this.getView('EC.SysDev.view.DocList').create();
        this.projectDoc.add(this.gridProjectDoc);
  
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
        
        this.projectComment = content.down('#projectComment');
        this.projectCommentPanel = this.projectComment.down('#projectCommentPanel');
        this.projectCommentStore = Ext.create('EC.SysDev.store.Comment');
      
        this.projectCommentStore.on('load', function(stor, records, successful, eOpts) {
            
            if (successful && records.length > 0) {
                
                var updRecords = [];
                if (records.length > 0) {
                    
                    for (var i = 0; i < records.length; i++) {
                        updRecords.push(records[i].data);
                    }
                    this.projectCommentPanel.update(updRecords);
                }
                
            } else {
                
                this.projectCommentPanel.update('');
                
            }
            
            this.showProjectDiscussion();
        }, this);
        
        if (acl.isUpdate('sysdev', 'comments')) {
            this.commentsText = this.projectCommentPanel.down('#commentContent');
            this.commentSubmit = this.projectCommentPanel.down('#commentSubmit');
            this.commentSubmit.on('click', function() {
            
            this.commentsText.on('blur', function(component, the, eOpts ) {
                component.clearInvalid();
            }, this);
            
            if (this.commentsText.isValid()) {
                
                    this.projectCommentStore.add({content: this.commentsText.getValue(), 
                        project_id: this.project.get('id')});
                    this.projectCommentStore.sync();
                    this.projectCommentStore.load({params:{project_id: this.project.get('id')}});
                    this.commentsText.setValue('');

                }
            }, this);
        }
        
        this.projectVoteStore = Ext.create('EC.SysDev.store.Vote');
        
        if (acl.isUpdate('sysdev', 'comments')) {
            
            this.projectCommentPanel.down('#markButtonFor').on('click', function(button, e, eOpts) {
                this.projectVoteStore.add({mark_id:1, project_id: this.project.get('id')});
                this.projectVoteStore.sync();
                this.projectVoteStore.load({params:{project_id: this.project.get('id')}});
            }, this);
            
            this.projectCommentPanel.down('#markButtonAgainst').on('click', function(button, e, eOpts) {
                this.projectVoteStore.add({mark_id:2, project_id: this.project.get('id')});
                this.projectVoteStore.sync();
                this.projectVoteStore.load({params:{project_id: this.project.get('id')}});
            }, this);
            
            this.projectCommentPanel.down('#markButtonRemake').on('click', function(button, e, eOpts){
                this.projectVoteStore.add({mark_id:3, project_id: this.project.get('id')});
                this.projectVoteStore.sync();
                this.projectVoteStore.load({params:{project_id: this.project.get('id')}});
            }, this);
        }
      
        this.projectVoteResults = this.detailTab.down('#voteResults');
        this.projectVote = this.detailTab.down('#markMenu');
      
        this.projectVoteStore.on('load', function(stor, records, successful, eOpts) {
            
            if (records.length == 0) {
                
                var isProjectVote = this.isProjectVote();
                
                if (acl.isUpdate('sysdev', 'votes')) {
                    
                    if (isProjectVote) {
                        this.projectVote.show();
                        this.projectVoteResults.hide();
                    } else {
                        if (acl.isView('sysdev', 'votes')) {
                            this.projectVote.hide();
                            this.projectVoteResults.show();
                            this.updateVoteResult();
                        } else {
                            this.projectVote.hide();
                            this.projectVoteResults.hide();
                        }
                    }
                    
                } else {
                    if (acl.isView('sysdev', 'votes')) {
                        this.projectVote.hide();
                        this.projectVoteResults.show();
                    } else {
                        this.projectVote.hide();
                        this.projectVoteResults.hide();
                    }
                }
                
            } else {
                if (acl.isView('sysdev', 'votes')) {
                    this.projectVote.hide();
                    this.projectVoteResults.show();
                    this.updateVoteResult();
                }
            }
            
            this.showProjectDiscussion();
            
        }, this);
               
        if ('portlet' == this.container.getXType()) {
            this.detailTab.tabBar.hide();
            this.container.down('project-detail').setSize(20, 380);
        }
    },
    
    clearProjectComponents: function() {
        
        this.projectInfo.update('');
        this.projectInfo.loaded = false;
      
        this.projectStage.loaded = false;
        this.gridProjectStage.getStore().loadRecords([],{addRecords: false});
      
        this.projectDoc.loaded = false;
        this.gridProjectDoc.getStore().loadRecords([], {addRecords: false});
      
        this.projectChart.getStore().loadRecords([], {addRecords: false});
        this.projectComment.loaded = false;
        
        if (acl.isUpdate('sysdev', 'comments')) {
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
            
            this.detailTab.child('#projectComment').tab.hide();
            this.detailTab.setActiveTab('info');
            return;
            
        } else {
            
            this.detailTab.child('#projectComment').tab.show();
            
        }
        
        if (isDiscussion) {
            
            this.commentSubmit.show();
            this.commentsText.show(); 
            
        } else {
            
            this.commentSubmit.hide();
            this.commentsText.hide(); 
            
        }
                
        /*if (isVote) {
            
            this.projectComment.down('#markMenu').show();
            
        } else {
            
            this.projectComment.down('#markMenu').hide();
            
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
        
        if (!acl.isView('sysdev')) {
            return;
        }
        
        if (record.get('leaf') == true) {
            
            var activeTabName = this.detailTab.getActiveTab().itemId;
            
            switch (activeTabName) {
                case 'info':
                    if (acl.isView('sysdev', 'info')) {
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
                    if (acl.isView('sysdev', 'stages')) {
                        
                        if (!this.projectStage.loaded) {

                            this.gridProjectStage.getStore().load({
                                params:{project_id: record.get('id')}
                            });
                            this.projectStage.loaded = true;
                        }
                        
                    }
                    break;
                
                case 'docs':
                    if (!this.projectDoc.loaded) {
                        
                        if (acl.isView('sysdev', 'docs')) {
                            
                            this.gridProjectDoc.getStore().load({
                                params:{project_id: record.get('id')}
                            });
                            
                            this.projectDoc.loaded = true;
                        }
                        
                    }
                    break;
                    
                case 'projectComment':
                    if (!this.projectComment.loaded) {
                        
                        if (acl.isView('sysdev', 'comments')) {
                            
                            this.projectCommentStore.load({
                                params:{project_id: record.get('id')}
                            });
                            
                            this.projectComment.loaded = true;
                        }
                        
                        if (acl.isView('sysdev', 'votes')) {
                            
                            this.projectVoteStore.load({
                                params:{project_id: record.get('id')}
                            });
                            
                        }
                                                 
                    }
                    break;
              }
              
              if ('portlet' != this.container.getXType()) {
                  if (acl.isView('sysdev', 'chart')) {
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
            xtype: 'ProjectdevEditorMain'
        });

        this.initProjectComponents(content);
        var treePanel = content.down('project-theme-tree');
        
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