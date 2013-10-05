Ext.define('EC.Project.controller.execution.LayoutController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'detailTabPanel', selector: 'project-execution [itemId="project-execution-detail-tabs"]' } // this.getDetailTabPanel()
    ],
    
    run: function() {
        console.log("execution.LayoutController inited");

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