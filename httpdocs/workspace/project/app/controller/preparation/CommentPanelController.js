Ext.define('Project.controller.preparation.CommentPanelController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'commentPanel', selector: 'project-comment-panel' }, // this.getCommentPanel()
        { ref: 'commentList', selector: 'project-comment-panel #commentList' } // this.getCommentList()
    ],
    
    init: function() {
        
        this.commentStore = Ext.getStore({
            type: 'project-comment-store',
            id: 'projectCommentStore'
        });
        
        this.voteStore = Ext.getStore({
            type: 'project-vote-store',
            id: 'projectVoteStore'
        });

        this.listen({
            component: {
                'project-comment-panel #commentSubmit': {
                    click: this.addComment
                },
                'project-comment-panel #markButtonFor': {
                    click: this.addVote.bind(this,1)
                },
                'project-comment-panel #markButtonAgainst': {
                    click: this.addVote.bind(this,2)
                },
                'project-comment-panel #markButtonRemake': {
                    click: this.addVote.bind(this,3)
                }
            },
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            },
            store: {
                '#projectCommentStore': {
                    load: this.onCommentStoreLoad
                },
                '#projectVoteStore': {
                    load: this.onVoteStoreLoad
                }
            }
        });
        
    },
            
    onProjectSelected: function(record) {

        if (record.get('leaf') != true) {
            return;
        }
        
        if (acl.isView('projectdev', 'comments')) {

            this.commentStore.load({
                params:{
                    project_id: record.get('id')
                }
            });
            
        }

        if (acl.isView('projectdev', 'votes')) {

            this.voteStore.load({
                params:{
                    project_id: record.get('id')
                }
            });

        }

        this.currentProjectId = record.get('id');

    },


    onVoteStoreLoad: function() {

        this.voteStore.filter([
            { property: "mark_id", value: 1 }
        ]);
        var forCount = this.voteStore.getCount();
        this.voteStore.clearFilter();

        this.voteStore.filter([
            { property: "mark_id", value: 2 }
        ]);
        var againstCount = this.voteStore.getCount();
        this.voteStore.clearFilter();

        this.voteStore.filter([
            { property: "mark_id", value: 3 }
        ]);
        var remakeCount = this.voteStore.getCount();
        this.voteStore.clearFilter();

        this.getCommentPanel().down('#countFor').update({count: forCount});
        this.getCommentPanel().down('#countAgainst').update({count: againstCount});
        this.getCommentPanel().down('#countRemake').update({count: remakeCount});

        var account_id = xlib.Acl.Storage.getIdentity().id;
        this.voteStore.filter(
            { property: "account_id", value: account_id  }
        );

        if(this.voteStore.getCount() > 0){
            this.getCommentPanel().down("#markMenu").hide();
        }
        this.voteStore.clearFilter();

    },
            
    onCommentStoreLoad: function (store, records, successful, eOpts) {

        if (successful && records.length > 0) {

            var updRecords = [];
            if (records.length > 0) {

                for (var i = 0; i < records.length; i++) {
                    updRecords.push(records[i].data);
                }
                this.getCommentList().update(updRecords);
                this.getCommentList().scrollBy(0,99999,true)
            }

        } else {

            this.getCommentList().update({});

        }

        //this.showProjectDiscussion();
    },

    addComment: function() {
        var comment = this.getCommentPanel().down('#commentContent').getValue();
        this.commentStore.add({content: comment, project_id:this.currentProjectId});
        this.commentStore.sync({
                callback: function(store, records, successful, eOpts){
                    this.commentStore.load({
                        params: { project_id: this.currentProjectId}
                    });
                    this.getCommentPanel().down("#commentContent").reset();
                },
                scope:this
            }
        );
    },

    addVote: function(voteType) {

        this.voteStore.add({mark_id: voteType, project_id: this.currentProjectId});
        this.voteStore.sync({
                callback: function(store, records, successful, eOpts){
                    this.voteStore.load({
                        params: { project_id: this.currentProjectId}
                    });

                },
                scope:this
            }
        );
        console.log("VOTE TYPE IS: " + voteType);
    }

});