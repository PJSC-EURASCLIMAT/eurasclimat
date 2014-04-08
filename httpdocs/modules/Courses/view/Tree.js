Ext.define('EC.Courses.view.Tree', {

    extend: 'xlib.Tree',
    
    alias: ['widget.courses-tree'],

    controllerURL: '/json/courses/groups/',
    
    layout: 'fit',
    
    rootVisible: false,
    
    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',

    permissions: acl.isUpdate('courses','groups'),

    constraintErrorHandler: function() {
        Ext.MessageBox.alert("Сообщение", "Невозможно удалить группу, т.к внутри группы есть курсы");
    },

    bbar: [{
        xtype: 'button',
        text: 'Сбросить фильтр',
        itemId: 'clear-button'
    }]

    
});