Ext.define('EC.SysDev.controller.ProjectTreeController', {

    extend: 'EC.SysDev.controller.abstract.ProjectTreeController',

    stores: [
        'EC.SysDev.store.ProjectTreeStore'
    ],

    refs: [
        { ref: 'projectTree', selector: 'project-tree' }, // this.getProjectTree()
        { ref: 'contextMenu', selector: 'project-tree-context-menu' }, // this.getContextMenu()
        { ref: 'deleteButton', selector: 'project-tree-context-menu #delete-button' }, // this.getDeleteButton()
        { ref: 'renameButton', selector: 'project-tree-context-menu #rename-button' }, // this.getRenameButton()
        { ref: 'createFolderButton', selector: 'project-tree-context-menu #create-folder-button' }, // this.getCreateFolderButton()
        { ref: 'createReferenceButton', selector: 'project-tree-context-menu #create-reference-button' } // this.getCreateReferenceButton()
    ],

    onTreeReady: function() {
        var tree = this.getProjectTree();
        tree.getEl().down('.x-tree-view').dom.style.display = "none";
        tree.setLoading();
    },
    
    onProjectStoreLoad: function(store, node, records, successful, eOpts){
        var tree = this.getProjectTree();
        tree.filterBy('1', 'stage');
        tree.getEl().down('.x-tree-view').dom.style.display = "block";
        tree.setLoading(false);
//        tree.setVisible(true);
//        tree.show();
    },

    run: function() {
        
        var me = this;
        var tree = this.getProjectTree();

        tree.store.on('load',
            this.onProjectStoreLoad, this, {delay: 3000}
        );

        this.listen({
            component: {
                'project-tree': {
                    select: this.onSelect,
                    itemcontextmenu: this.onItemContextMenu,
                    containercontextmenu: this.onTreeClick,
                    viewready: this.onTreeReady,
//                    load: this.onProjectStoreLoad,
//                    afterrender: this.onTreeAfterRender,
                    'project-tree-context-menu-requested': this.showContextMenu
                },
                'project-tree > treeview': {
                    drop: this.onDrop,
                    beforedrop: this.beforeDrop
                },
                'project-tree-context-menu [itemId="rename-button"]': {
                    click: this.onRenameButtonClick
                },
                'project-tree-context-menu [itemId="delete-button"]': {
                    click: this.onDeleteButtonClick
                },
                'project-tree-context-menu [itemId="create-folder-button"]': {
                    click: this.onCreateFolderButtonClick
                },
                'project-tree-context-menu [itemId="create-reference-button"]': {
                    click: this.onCreateReferenceButtonClick
                }
            }
        });
        
    }
    
});