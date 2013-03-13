Ext.define('EC.CRM.controller.1C', {

    extend: 'Ext.app.Controller',

    views: ['EC.CRM.view.CurrentProjects.1C'],
    
    init: function(container, module) {
        
//        if (Ext.isObject(module) && module.down) {
//            container.add(module.child());
//        } else {
            container.add(this.getView(this.views[0]).create());
//        }
    }
    
});