Ext.define('EC.Main.controller.Projectdev', {
    
    extend: 'Ext.app.Controller',
        
    stores: [
        'EC.Main.store.Projectdev.ThemesTree',
        'EC.Main.store.Projectdev.Stages',
        'EC.Main.store.Projectdev.Docs',
        'EC.Main.store.Projectdev.StagesChart',
        'EC.Main.store.Projectdev.Comments',
        'EC.Main.store.Projectdev.Votes'
    ],
    
    models: [
        'EC.Main.model.Projectdev.ThemesTree',
        'EC.Main.model.Projectdev.Stages',
        'EC.Main.model.Projectdev.Docs',
        'EC.Main.model.Projectdev.StagesChart',
        'EC.Main.model.Projectdev.Comments',
        'EC.Main.model.Projectdev.Votes'
    ],

    views: [
        'EC.Main.view.Projectdev.Layout',
        'EC.Main.view.Projectdev.ThemesTree',
        'EC.Main.view.Projectdev.Detail',
        'EC.Main.view.Projectdev.StagesList',
        'EC.Main.view.Projectdev.DocsList',
        'EC.Main.view.Projectdev.StagesChart'
    ],
    
    project: 0,
    
    projectInfo: null,
    
    projectStages: null,
    
    projectComments: null,
    
    projectCommentsPanel: null,
    
    projectCommentsStore: null,
    
    projectDocs:null,
    
    projectChart: null,
    
    detailTab: null,
    
    gridProjectStages: null,
    
    gridProjectDocs: null,
    
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
        this.gridProjectStages = this.getView('EC.Main.view.Projectdev.StagesList').create();
        this.projectStages.add(this.gridProjectStages);
          
        this.projectDocs = this.detailTab.down('#docs');
        this.gridProjectDocs = this.getView('EC.Main.view.Projectdev.DocsList').create();
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
        this.projectCommentsStore = Ext.create('EC.Main.store.Projectdev.Comments');
      
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
        }, this);
      
        this.projectCommentsPanel.down('#commentSubmit').on('click', function() {
        
            var textArea = this.projectCommentsPanel.down('#commentContent');
            
            if (textArea.isValid()) {
                
                this.projectCommentsStore.add({content: textArea.getValue(), project_id: this.project.get('id')});
                this.projectCommentsStore.sync();
                this.projectCommentsStore.load({params:{project_id: this.project.get('id')}});
                textArea.setValue('');
            }
        }, this);
      
        this.projectVotesStore = Ext.create('EC.Main.store.Projectdev.Votes');
        
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
      
        this.projectVotesStore.on('load', function(stor, records, successful, eOpts) {
            
            if (records.length == 0) {
                
                if (isUpdate('projectdev', 'comments')) {
                    this.projectCommentsPanel.down('#markMenu').show();
                    this.projectCommentsPanel.down('#markLabel').hide();
                }
                
            } else {
                
                var markName = '';
                
                if (records[0].get('mark_id')==1) {
                    markName = 'Ваш голос: За';
                }
                if (records[0].get('mark_id')==2) {
                    markName = 'Ваш голос: Против';
                }
                if (records[0].get('mark_id')==3) {
                    markName = 'Ваш голос: Доработать';
                }
                
                this.projectCommentsPanel.down('#markLabel').setText(markName);
                this.projectCommentsPanel.down('#markLabel').show();
                this.projectCommentsPanel.down('#markMenu').hide();
            }
        }, this);
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
    },
    
    loadProjectDetail: function(record) {
        
        if (!acl.isView('projectdev')) {
            return;
        }
        
        if (record.get('leaf') == true) {
            
            var activeTabName = this.detailTab.getActiveTab().itemId;
            
            switch (activeTabName) {
                case 'info':
                    if (!this.projectInfo.loaded) {
                        
                        this.projectInfo.getLoader().load({
                            params: {
                                id: record.get('id')
                            }
                        });
                        
                        this.projectInfo.loaded = true;
                    }
                    break;
                
                case 'stages':
                    if (!this.projectStages.loaded) {
                        
                        this.gridProjectStages.getStore().load({
                            params:{project_id: record.get('id')}
                        });
                        this.projectStages.loaded = true;
                    }
                    break;
                
                case 'docs':
                    if (!this.projectDocs.loaded) {
                        
                        this.gridProjectDocs.getStore().load({
                            params:{project_id: record.get('id')}
                        });
                        this.projectDocs.loaded = true;
                    }
                    break;
                    
                case 'projectComments':
                    if (!this.projectComments.loaded) {
                        
                        this.projectCommentsStore.load({
                            params:{project_id: record.get('id')}
                        });
                        this.projectVotesStore.load({
                            params:{project_id: record.get('id')}
                        });
                        this.projectComments.loaded = true;
                    }
                    break;
              }
              
              this.projectChart.getStore().load({
                    params:{project_id: record.get('id')}
              });
              this.detailTab.show();
              
        } else {
            this.detailTab.hide();
            this.projectChart.hide();
        }
    },
    
    run: function(container) {

        var content = container.add({
            xtype: 'ProjectdevLayout'
        });
        
        this.initProjectComponents(content);
        var treePanel = content.down('ProjectdevThemesTree');
        
        treePanel.on('select', function(tree, record, index, eOpts) {
            
            this.project = record;
            this.clearProjectComponents();
            this.loadProjectDetail(this.project);
            
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