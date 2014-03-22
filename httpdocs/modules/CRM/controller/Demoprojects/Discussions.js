Ext.define('EC.CRM.controller.Demoprojects.Discussions', {
    
    extend: 'Ext.app.Controller',
    
    stores: ['EC.CRM.store.Demoprojects.Discussions'],

    models: ['EC.CRM.model.Demoprojects.Discussions'],

    views: ['EC.CRM.view.Demoprojects.Discussions'],
    
    refs: [
        { ref: 'discussionsList', selector: '#CRMDemoprojectsDiscussions' }
    ],
    
    cur_project_id: null,
    
    run: function(container) {
        
        this.Container = container;
        var view = container.add(this.getView('EC.CRM.view.Demoprojects.Discussions').create());
        this.Container.down('#commentSubmit').on('click', this.addComment, this);
        
        this.discussionsStore = this.getStore('EC.CRM.store.Demoprojects.Discussions');
        this.discussionsStore.on('load', this.onStoreLoad, this);
        this.loadStore();
    },
            
    loadStore: function() {
        this.discussionsStore.load({params: {project_id: this.cur_project_id}});
    },

    onStoreLoad: function(store, records, successful, eOpts) {

        if (successful && records.length > 0) {

            var updRecords = [];
            if (records.length > 0) {

                for (var i = 0; i < records.length; i++) {
                    updRecords.push(records[i].data);
                }
                this.getDiscussionsList().update(updRecords);
                this.getDiscussionsList().scrollBy(0,99999,true)
            }

//        } else {
//            this.getDiscussionsList().update({});
        }
    },

    addComment: function() {
        var comment = this.Container.down('#commentContent').getValue();
        this.discussionsStore.add({content: comment, project_id: this.cur_project_id});
        this.discussionsStore.sync({
            callback: function(store, records, successful, eOpts) {
                this.discussionsStore.load({
                    params: {project_id: this.cur_project_id}
                });
                this.Container.down("#commentContent").reset();
            },
            scope:this
        });
    }
});