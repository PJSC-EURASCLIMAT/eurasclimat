Ext.define('EC.Project.controller.preparation.ProjectTreeController', {

    extend: 'EC.Project.controller.abstract.ProjectTreeController',

    refs: [
        { ref: 'projectTree', selector: 'project-preparation-tree' }, // this.getProjectTree()
        { ref: 'contextMenu', selector: 'project-preparation-tree-context-menu' }, // this.getContextMenu()
        { ref: 'deleteButton', selector: 'project-preparation-tree-context-menu [itemId="delete-button"]' }, // this.getDeleteButton()
        { ref: 'renameButton', selector: 'project-preparation-tree-context-menu [itemId="rename-button"]' }, // this.getRenameButton()
        { ref: 'createFolderButton', selector: 'project-preparation-tree-context-menu [itemId="create-folder-button"]' }, // this.getCreateFolderButton()
        { ref: 'createReferenceButton', selector: 'project-preparation-tree-context-menu [itemId="create-reference-button"]' } // this.getCreateReferenceButton()
    ],
    
    run: function() {
        var me = this;

        this.listen({
            component: {
                'project-preparation-tree': {
                    select: this.onSelect,
                    itemcontextmenu: this.onItemContextMenu,
                    containercontextmenu: this.onTreeClick,
                    'project-tree-context-menu-requested': this.showContextMenu
                },
                'project-preparation-tree > treeview': {
                    drop: this.onDrop,
                    beforedrop: this.beforeDrop
                },
                'project-preparation-tree-context-menu [itemId="rename-button"]': {
                    click: this.onRenameButtonClick
                },
                'project-preparation-tree-context-menu [itemId="delete-button"]': {
                    click: this.onDeleteButtonClick
                },
                'project-preparation-tree-context-menu [itemId="create-folder-button"]': {
                    click: this.onCreateFolderButtonClick
                },
                'project-preparation-tree-context-menu [itemId="create-reference-button"]': {
                    click: this.onCreateReferenceButtonClick
                }
            }
        });
        
    }
    
});