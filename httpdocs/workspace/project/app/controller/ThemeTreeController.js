Ext.define('Project.controller.ThemeTreeController', {
    
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'themeTree', selector: 'project-theme-tree' }, // this.getThemeTree()
        { ref: 'contextMenu', selector: 'project-theme-tree-context-menu' }, // this.getContextMenu()
        { ref: 'deleteButton', selector: 'project-theme-tree-context-menu [itemId="delete-button"]' }, // this.getDeleteButton()
        { ref: 'renameButton', selector: 'project-theme-tree-context-menu [itemId="rename-button"]' }, // this.getRenameButton()
        { ref: 'createFolderButton', selector: 'project-theme-tree-context-menu [itemId="create-folder-button"]' }, // this.getCreateFolderButton()
        { ref: 'createReferenceButton', selector: 'project-theme-tree-context-menu [itemId="create-reference-button"]' } // this.getCreateReferenceButton()
    ],
    
    init: function() {
        
        this.listen({
            component: {
                'project-theme-tree': {
                    select: this.onSelect,
                    itemcontextmenu: this.onItemContextMenu
                },
                'project-theme-tree > treeview': {
                    drop: this.onDrop
                },
                'project-theme-tree-context-menu [itemId="rename-button"]': {
                    click: this.onRenameButtonClick
                },
                'project-theme-tree-context-menu [itemId="delete-button"]': {
                    click: this.onDeleteButtonClick
                },
                'project-theme-tree-context-menu [itemId="create-folder-button"]': {
                    click: this.onCreateFolderButtonClick
                },
                'project-theme-tree-context-menu [itemId="create-reference-button"]': {
                    click: this.onCreateReferenceButtonClick
                }
            }
        });
        
    },
            
    onSelect: function(tree, record, index, eOpts) {

        this.fireEvent('project-selected', record);

//        this.project = record;
//
//        if (record.get('leaf') == true) {
//
//            this.clearProjectComponents();
//            this.loadProjectDetail(this.project);
//            this.showProjectDiscussion();
//
//        }

    },
            
    onItemContextMenu: function(treeview, record, item, index, e) {

        e.stopEvent();

        var contextMenu = this.getContextMenu();
        var renameButton = this.getRenameButton();
        var deleteButton = this.getDeleteButton();
        var createFolderButton = this.getCreateFolderButton();
        var createReferenceButton = this.getCreateReferenceButton();

        if (record.get('leaf')) { // лист
            
            renameButton.show();
            deleteButton.show();
            createFolderButton.hide();
            createReferenceButton.hide();
            
        } else {
            
            if (record.get('id') == 0) { // главная ветвь
                
                renameButton.hide();
                deleteButton.hide();
                createFolderButton.show();
                createReferenceButton.show();
                
            } else { // ответвление
                
                renameButton.show();
                deleteButton.show();
                createFolderButton.show();
                createReferenceButton.show();
                
            }
            
        }

        contextMenu.showAt(e.getXY());
        
    },
            
    onRenameButtonClick: function(button, event) {
        
        var themeTree = this.getThemeTree();
        
        var selectionModel = themeTree.getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        selectionModel.deselectAll();
        
        themeTree.getPlugin('project-theme-tree-cell-editing-plugin').startEdit(selectedNode, 0);

    },
            
    onDeleteButtonClick: function(button, event) {

        var selectionModel = this.getThemeTree().getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        selectionModel.deselectAll();
        
        selectionModel.select(selectedNode);
        var message = 'Удалить "' + selectedNode.get('text') + '"?';
        Ext.MessageBox.confirm('Запрос подтверждения', message, function(buttonId) {
            if (buttonId === 'yes') {
                selectionModel.deselect(selectedNode);
                selectedNode.remove();
            }
        });
        
    },
            
    onCreateFolderButtonClick: function(button, event) {
        
        var themeTree = this.getThemeTree();
        
        var selectionModel = themeTree.getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        selectionModel.deselectAll();
        
        var createBranch = (function(themeTree, selectedNode) { 
            return function() {
                var newNode = selectedNode.appendChild({
                    id: null,
                    name: '',
                    leaf: false
                });
                themeTree.getPlugin('project-theme-tree-cell-editing-plugin').startEdit(newNode, 0);
            }
        })(themeTree, selectedNode);

        if (selectedNode.isExpanded()) {

            createBranch();

        } else {

            this.mon(themeTree.getView(), 'afteritemexpand', function(node, index, item, eOpts) {
                createBranch();
            }, this, {single: true});
            selectedNode.expand();

        }
        
    },
            
    onCreateReferenceButtonClick: function(button, event) {
        
        var themeTree = this.getThemeTree();
        
        var selectionModel = themeTree.getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        selectionModel.deselectAll();

        var createLeaf = (function(themeTree, selectedNode) { 
            return function() {
                var newNode = selectedNode.appendChild({
                    id: null,
                    name: '',
                    leaf: true
                });
                themeTree.getPlugin('project-theme-tree-cell-editing-plugin').startEdit(newNode, 0);
            }
        })(themeTree, selectedNode);

        if (selectedNode.isExpanded()) {

            createLeaf();

        } else {

            this.mon(themeTree.getView(), 'afteritemexpand', function(node, index, item, eOpts) {
                createLeaf();
            }, this, {single: true});
            selectedNode.expand();

        }
        
    },
            
    onDrop: function(node, data, overModel, dropPosition, dropHandler) {
        
        var targetId = overModel.get('id');
        
        var movedIds = [];
        Ext.Array.each(data.records, function(record) {
            movedIds.push(record.get('id'));
        });

//        Ext.remote.Menu.updatePositions(
//            targetId,
//            movedIds,
//            dropPosition
//        );
        
    }
    
});
