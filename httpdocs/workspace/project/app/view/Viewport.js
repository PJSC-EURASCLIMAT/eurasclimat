Ext.define('Project.view.Viewport', {
    
    extend: 'Ext.container.Viewport',

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'project-main'
    }]

});
