Ext.define('EC.SysDev.view.ProjectTree', {

    extend: 'EC.SysDev.view.abstract.ProjectTree',

    store: 'EC.SysDev.store.ProjectTreeStore',

    mixins: ['xlib.tree.TreeFilter'],

    alias: 'widget.project-tree'

//    ,initComponent: function() {
//
//        this.store = Ext.getStore({
//            type: 'project-tree-store',
//            autoload: true
//        });
//
//        this.callParent(arguments);
//    }

});