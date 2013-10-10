Ext.define('EC.SysDev.controller.abstract.ProjectTreeController', {

    id: 'preparation-project-controller',

    extend: 'Ext.app.Controller',
  
    onSelect: function(tree, record, index, eOpts) {
//        console.log("abstract.ProjectTreeController onSelected");
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

        this.showContextMenu(record, e.getXY());
        
    },
            
    showContextMenu: function(record, position) {

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
            
        } else { // ответвление
                
            renameButton.show();
            deleteButton.show();
            createFolderButton.show();
            createReferenceButton.show();
            
        }
        
        contextMenu.showAt(position);

    },
            
    onRenameButtonClick: function(button, event) {
        
        var projectTree = this.getProjectTree();
        
        var selectionModel = projectTree.getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        
        if (selectionModel.getCount() > 1) {
            selectionModel.deselectAll();
        }
        
        projectTree.getPlugin('project-tree-cell-editing-plugin').startEdit(selectedNode, 0);

    },
            
    onDeleteButtonClick: function(button, event) {

        var selectionModel = this.getProjectTree().getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        
        // запрещаем удалять узлы верхнего уровня
        if (selectedNode.getDepth() <= 1) {
            Ext.Msg.show({
                 title:'Внимание',
                 msg: 'Удаление невозможно',
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.WARNING
            });
            return;
        }
        
        // запрещаем удалять узлы, у которых есть дочерние узлы
        if (selectedNode.hasChildNodes()) {
            Ext.Msg.show({
                 title:'Внимание',
                 msg: 'Удалите сначала дочерние узлы',
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.WARNING
            });
            return;
        }
        
        selectionModel.deselectAll();
        
        selectionModel.select(selectedNode);
        
        var message = 'Удалить "' + selectedNode.get('name') + '"';
        if (selectedNode.hasChildNodes()) {
            message += ' и все вложенные элементы';
        }
        message += '?';
        
        Ext.MessageBox.confirm('Запрос подтверждения', message, function(buttonId) {
            if (buttonId === 'yes') {
                selectionModel.deselect(selectedNode);
                selectedNode.remove();
            }
        });
        
    },
            
    onCreateFolderButtonClick: function(button, event) {
        
        var projectTree = this.getProjectTree();
        
        var selectionModel = projectTree.getSelectionModel();
        
        var selectedNode = selectionModel.hasSelection() ? selectionModel.getLastSelected() : projectTree.getRootNode();

        selectionModel.deselectAll();
        
        var createBranch = (function(projectTree, selectedNode) { 
            return function() {
                var newNode = selectedNode.appendChild({
                    id: null,
                    name: '',
                    leaf: false
                });
                projectTree.getPlugin('project-tree-cell-editing-plugin').startEdit(newNode, 0);
            }
        })(projectTree, selectedNode);

        if (selectedNode.isExpanded()) {

            createBranch();

        } else {

            this.mon(projectTree.getView(), 'afteritemexpand', function(node, index, item, eOpts) {
                createBranch();
            }, this, {single: true});
            selectedNode.expand();

        }
        
    },
            
    onCreateReferenceButtonClick: function(button, event) {
        
        var projectTree = this.getProjectTree();
        
        var selectionModel = projectTree.getSelectionModel();
        
        if (!selectionModel.hasSelection()) {
            return;
        }
        
        var selectedNode = selectionModel.getLastSelected();
        selectionModel.deselectAll();

        var createLeaf = (function(projectTree, selectedNode) { 
            return function() {
                var newNode = selectedNode.appendChild({
                    id: null,
                    name: '',
                    leaf: true
                });
                projectTree.getPlugin('project-tree-cell-editing-plugin').startEdit(newNode, 0);
            }
        })(projectTree, selectedNode);

        if (selectedNode.isExpanded()) {

            createLeaf();

        } else {

            this.mon(projectTree.getView(), 'afteritemexpand', function(node, index, item, eOpts) {
                createLeaf();
            }, this, {single: true});
            selectedNode.expand();

        }
        
    },
            
    beforeDrop: function(node, data, overModel, dropPosition, dropHandlers) {

        // запрещаем перемещать узлы верхнего уровня

        var failed = false;
        
        Ext.Array.each(data.records, function(record) {

            if (record.getDepth() <= 1) {
                failed = true;
            }
            
        });

        if (failed) {
            Ext.Msg.show({
                 title:'Внимание',
                 msg: 'Перемещение невозможно',
                 buttons: Ext.Msg.OK,
                 icon: Ext.Msg.WARNING
            });
            return false;
        }

    },
            
    onDrop: function(node, data, overModel, dropPosition, dropHandler) {
        
        var targetId = overModel.get('id');
        
        var movedIds = [];
        Ext.Array.each(data.records, function(record) {

            movedIds.push(record.get('id'));
            
        });

        Ext.Ajax.request({
            url: '/json/sysdev/projects/move',
            params: {
                targetId: targetId,
                movedIds: movedIds,
                position: dropPosition
            }
        });
        
    },
            
    onTreeClick: function(treeview, e) {

        e.stopEvent();
        
        this.getProjectTree().getSelectionModel().deselectAll();

        var contextMenu = this.getContextMenu();
        var renameButton = this.getRenameButton();
        var deleteButton = this.getDeleteButton();
        var createFolderButton = this.getCreateFolderButton();
        var createReferenceButton = this.getCreateReferenceButton();

        // главная ветвь
        renameButton.hide();
        deleteButton.hide();
        createFolderButton.show();
        createReferenceButton.show();

        contextMenu.showAt(e.getXY());
        
    }
    
});
