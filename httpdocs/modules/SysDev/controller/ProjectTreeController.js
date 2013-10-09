Ext.define('EC.SysDev.controller.ProjectTreeController', {

    extend: 'EC.SysDev.controller.abstract.ProjectTreeController',

    stores: [
        'EC.SysDev.store.ProjectTreeStore'
    ],

    refs: [
        { ref: 'projectTree', selector: 'project-tree' }, // this.getProjectTree()
        { ref: 'contextMenu', selector: 'project-tree-context-menu' }, // this.getContextMenu()
        { ref: 'deleteButton', selector: 'project-tree-context-menu [itemId="delete-button"]' }, // this.getDeleteButton()
        { ref: 'renameButton', selector: 'project-tree-context-menu [itemId="rename-button"]' }, // this.getRenameButton()
        { ref: 'createFolderButton', selector: 'project-tree-context-menu [itemId="create-folder-button"]' }, // this.getCreateFolderButton()
        { ref: 'createReferenceButton', selector: 'project-tree-context-menu [itemId="create-reference-button"]' } // this.getCreateReferenceButton()
    ],

    onTreeReady: function() {
        console.log("onTreeReady");
    },
    onProjectStoreLoad: function( store, node, records, successful, eOpts ){
        var me = this;
        me.getProjectTree().filterBy('1','stage');
    },

    run: function() {
        var me = this;
        this.getProjectTree().store.on('load',this.onProjectStoreLoad.bind(this),null,{delay:3000});
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