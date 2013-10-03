Ext.define('EC.Project.controller.execution.ProjectTreeController', {
    
    extend: 'EC.Project.controller.abstract.ProjectTreeController',

    refs: [
        { ref: 'projectTree', selector: 'project-execution-tree' }, // this.getProjectTree()
        { ref: 'contextMenu', selector: 'project-execution-tree-context-menu' }, // this.getContextMenu()
        { ref: 'deleteButton', selector: 'project-execution-tree-context-menu [itemId="delete-button"]' }, // this.getDeleteButton()
        { ref: 'renameButton', selector: 'project-execution-tree-context-menu [itemId="rename-button"]' }, // this.getRenameButton()
        { ref: 'createFolderButton', selector: 'project-execution-tree-context-menu [itemId="create-folder-button"]' }, // this.getCreateFolderButton()
        { ref: 'createReferenceButton', selector: 'project-execution-tree-context-menu [itemId="create-reference-button"]' } // this.getCreateReferenceButton()
    ],
    
    init: function() {
        
        this.listen({
            component: {
                'project-execution-tree': {
                    select: this.onSelect,
                    itemcontextmenu: this.onItemContextMenu,
                    containercontextmenu: this.onTreeClick,
                    'project-tree-context-menu-requested': this.showContextMenu
                },
                'project-execution-tree > treeview': {
                    drop: this.onDrop,
                    beforedrop: this.beforeDrop
                },
                'project-execution-tree-context-menu [itemId="rename-button"]': {
                    click: this.onRenameButtonClick
                },
                'project-execution-tree-context-menu [itemId="delete-button"]': {
                    click: this.onDeleteButtonClick
                },
                'project-execution-tree-context-menu [itemId="create-folder-button"]': {
                    click: this.onCreateFolderButtonClick
                },
                'project-execution-tree-context-menu [itemId="create-reference-button"]': {
                    click: this.onCreateReferenceButtonClick
                }
            }
        });
        
    }
    
});