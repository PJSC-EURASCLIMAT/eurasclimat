Ext.define('EC.Courses.view.Tree', {

    extend: 'xlib.Tree',
    
    alias: ['widget.courses-tree'],

    controllerURL: '/json/courses/groups/',
    
    layout: 'fit',
    
    rootVisible: true,

    hideHeaders: true,
    
    useArrows: true,
    
    scroll: 'vertical',

    addText: 'Добавить группу',

    addToolTip: 'Добавить группу',

    root: {
        text: "Все курсы",
        expanded: true
    },

    permissions: acl.isUpdate('courses','groups'),

    constraintErrorHandler: function() {
        Ext.MessageBox.alert("Сообщение", "Невозможно удалить группу, т.к внутри группы есть курсы");
    }
    
});