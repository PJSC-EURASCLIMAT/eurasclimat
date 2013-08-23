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
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            },
            store: {
                '#projectCommentStore': {
                    load: this.onCommentStoreLoad
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

    },
            
    onCommentStoreLoad: function (store, records, successful, eOpts) {

        if (successful && records.length > 0) {

            var updRecords = [];
            if (records.length > 0) {

                for (var i = 0; i < records.length; i++) {
                    updRecords.push(records[i].data);
                }
                this.getCommentList().update(updRecords);
            }

        } else {

            this.getCommentList().update({});

        }

        //this.showProjectDiscussion();
    }
    
});