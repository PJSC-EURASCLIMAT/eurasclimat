Ext.define('Project.controller.preparation.LayoutController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'detailTabPanel', selector: 'project-preparation [itemId="project-preparation-detail-tabs"]' } // this.getDetailTabPanel()
    ],
    
    init: function() {
        
        this.listen({
            controller: {
                '*': {
                    'project-selected': this.onProjectSelected
                }
            }
        });
        
    },
            
    onProjectSelected: function(record) {

        var detailPanel = this.getDetailTabPanel();

        if (record.get('leaf') == true) {
            detailPanel.show();
        } else {
            detailPanel.hide();
        }
        
     }
     
});