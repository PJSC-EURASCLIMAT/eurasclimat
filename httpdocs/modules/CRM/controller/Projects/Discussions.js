Ext.define('EC.CRM.controller.Projects.Discussions', {
    
    extend: 'Ext.app.Controller',
    
    stores: ['EC.CRM.store.Projects.Discussions'],

    models: ['EC.CRM.model.Projects.Discussions'],

    views: ['EC.CRM.view.Projects.Discussions'],
    
    cur_project_id: null,
    
    run: function(container) {
        
        this.Container = container;
        var view = container.add(Ext.create('EC.CRM.view.Projects.Discussions'));
        this.Container.down('#commentSubmit').on('click', this.addComment, this);
        
        this.discussionsStore = Ext.create('EC.CRM.store.Projects.Discussions');
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
                var list = this.Container.down('#CRMProjectsDiscussions'); 
                list.update(updRecords);
                list.scrollBy(0, 99999, true)
            }
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