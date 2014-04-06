Ext.define('EC.Courses.view.Tree', {

    extend: 'xlib.Tree',
    
    alias: ['widget.courses-tree'],

    controllerURL: '/json/courses/groups/',
    
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