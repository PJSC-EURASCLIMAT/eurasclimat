Ext.define('EC.Experts.view.Courses.Tree', {

    extend: 'xlib.Tree',
    
    alias: ['widget.ExpertsCoursesTree'],
    
//    store: 'EC.Main.store.AboutSystem.ThemesTree',

    controllerURL: '/json/experts/courses-types/',
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',

    permissions: acl.isUpdate('courses'),

    bbar: [{
        xtype: 'button',
        text: 'Сбросить фильтр',
        itemId: 'clear-button'
    }]

    
});