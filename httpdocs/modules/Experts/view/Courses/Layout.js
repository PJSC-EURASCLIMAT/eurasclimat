Ext.define('EC.Experts.view.Courses.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    alias: 'widget.ExpertsCoursesLayout',
    
    layout: 'border',
    
    border: false,

    isPortlet: false,

    initComponent: function() {
        this.items = [{
            xtype: 'ExpertsCoursesTree',
            region: 'west',
            hidden: this.isPortlet,
            itemId: 'tree',
            border: '0 1 0 0',
            split: true,
            width: 200
        }, {
            xtype: 'ExpertsCoursesList',
            border: '0 0 0 1',
            isPortlet: this.isPortlet,
            layout: 'fit',
            itemId: 'list',
            region: 'center'
        }];
        this.callParent();
    }
});