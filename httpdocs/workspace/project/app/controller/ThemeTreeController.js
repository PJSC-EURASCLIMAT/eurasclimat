Ext.define('Project.controller.ThemeTreeController', {
    
    extend: 'Ext.app.Controller',
    
    init: function() {
        
        this.listen({
            component: {
                'project-theme-tree': {
                    select: this.onSelect
                }
            }
        });
        
    },
            
    onSelect: function(tree, record, index, eOpts) {

        this.fireEvent('project-selected', record);

//        this.project = record;
//
//        if (record.get('leaf') == true) {
//
//            this.clearProjectComponents();
//            this.loadProjectDetail(this.project);
//            this.showProjectDiscussion();
//
//        }

    }
    
});
