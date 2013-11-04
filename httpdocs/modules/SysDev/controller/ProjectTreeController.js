Ext.define('EC.SysDev.controller.ProjectTreeController', {

    id: 'preparation-project-controller',

    extend: 'Ext.app.Controller',

    currentStage: null,

    changeStageURL: '/json/sysdev/projects/change-stage',

    stores: [
        'EC.SysDev.store.ProjectTreeStore'
    ],

    refs: [
        { ref: 'projectTree', selector: 'project-tree' }, // this.getProjectTree()
        { ref: 'contextMenu', selector: 'project-tree-context-menu' }, // this.getContextMenu()
        { ref: 'deleteButton', selector: 'project-tree-context-menu #delete-button' }, // this.getDeleteButton()
        { ref: 'renameButton', selector: 'project-tree-context-menu #rename-button' }, // this.getRenameButton()
        { ref: 'createFolderButton', selector: 'project-tree-context-menu #create-folder-button' }, // this.getCreateFolderButton()
        { ref: 'createReferenceButton', selector: 'project-tree-context-menu #create-reference-button' }, // this.getCreateReferenceButton()
        { ref: 'moveToPreparationButton', selector: 'project-tree-context-menu #move-to-preparation-button' }, // this.getCreateReferenceButton()
        { ref: 'moveToExecutionButton', selector: 'project-tree-context-menu #move-to-execution-button' } // this.getCreateReferenceButton()
    ],

    onSelect: function(tree, record, index, eOpts) {
        this.fireEvent('project-selected', record);
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
        var moveToPrepButton = this.getMoveToPreparationButton();
        var moveToExecButton = this.getMoveToExecutionButton();

        if (record.get('leaf')) { // лист

            renameButton.show();
            deleteButton.show();
            createFolderButton.hide();
            createReferenceButton.hide();

            if(record.get('stage') === 1) {
                moveToPrepButton.hide();
                moveToExecButton.show();
            }

            if(record.get('stage') === 2) {
                moveToPrepButton.show();
                moveToExecButton.hide();
            }

        } else { // ответвление
            moveToPrepButton.hide();
            moveToExecButton.hide();
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
//        if (selectedNode.getDepth() <= 1) {
//            Ext.Msg.show({
//                 title:'Внимание',
//                 msg: 'Удаление невозможно',
//                 buttons: Ext.Msg.OK,
//                 icon: Ext.Msg.WARNING
//            });
//            return;
//        }

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

        var stage = this.currentStage;

        var createBranch = (function(projectTree, selectedNode, stage) {
            return function() {
                var newNode = selectedNode.appendChild({
                    id: null,
                    stage: stage,
                    name: '',
                    leaf: false
                });
                projectTree.getPlugin('project-tree-cell-editing-plugin').startEdit(newNode, 0);
            }
        })(projectTree, selectedNode, stage);

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

        var stage = this.currentStage;

        if (!selectionModel.hasSelection()) {
            return;
        }

        var selectedNode = selectionModel.getLastSelected();
        selectionModel.deselectAll();

        var createLeaf = (function(projectTree, selectedNode, stage) {
            return function() {
                var newNode = selectedNode.appendChild({
                    id: null,
                    stage: stage,
                    name: '',
                    leaf: true
                });
                projectTree.getPlugin('project-tree-cell-editing-plugin').startEdit(newNode, 0);
            }
        })(projectTree, selectedNode, stage);

        if (selectedNode.isExpanded()) {

            createLeaf();

        } else {

            this.mon(projectTree.getView(), 'afteritemexpand', function(node, index, item, eOpts) {
                createLeaf();
            }, this, {single: true});
            selectedNode.expand();

        }

    },


    changeStage: function(button, event, stage) {
        var selectionModel = this.getProjectTree().getSelectionModel();

        if (!selectionModel.hasSelection()) {
            return;
        }

        var selectedNode = selectionModel.getLastSelected();

        if (selectedNode.get('leaf') !== true) {
            Ext.Msg.show({
                title:'Внимание',
                msg: 'Перенос невозможен',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
            return;
        }

        selectionModel.deselectAll();

        selectionModel.select(selectedNode);

        var message = 'Перенести проект "' + selectedNode.get('name') + '" в раздел "Исполнение"';

        message += '?';

        Ext.MessageBox.confirm('Запрос подтверждения', message, function(buttonId) {
            if (buttonId === 'yes') {

                selectionModel.deselect(selectedNode);
                selectedNode.set("stage", stage);

                Ext.Ajax.request({
                    params: selectedNode.data,
                    url: this.changeStageURL,
                    success: function(response, opts) {
                        Ext.Msg.alert('Сообщение', 'Перенос проекта прошел успешно');
                        this.getStore('EC.SysDev.store.ProjectTreeStore').load();
//                        this.get
//                        this.getDocList().getStore().remove(record);
                    },
                    failure: function(response, opts) {
                        Ext.Msg.alert('Ошибка', 'Перенос проектане выполнен!');
                    },
                    scope: this
                });

            }
        },this);

    },

    onMoveToExecutionButtonClick: function(button, event) {
        this.changeStage(button, event, 2);
        console.log("to exec clicked");
    },

    onMoveToPreparationButtonClick: function(button, event) {
        this.changeStage(button, event, 1);
        console.log("to prep clicked");
    },

    beforeDrop: function(node, data, overModel, dropPosition, dropHandlers) {

        // запрещаем перемещать узлы верхнего уровня

//        var failed = false;
//
//        Ext.Array.each(data.records, function(record) {
//
//            if (record.getDepth() <= 1) {
//                failed = true;
//            }
//
//        });
//
//        if (failed) {
//            Ext.Msg.show({
//                 title:'Внимание',
//                 msg: 'Перемещение невозможно',
//                 buttons: Ext.Msg.OK,
//                 icon: Ext.Msg.WARNING
//            });
//            return false;
//        }

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

    },

    onProjectInfoUpdated: function(record) {
        var id = record.getId();
        var leaf = this.getProjectTree().store.getById(id);
        leaf.set('name',record.get('name'));
    },

    onTreeReady: function() {
        var tree = this.getProjectTree();
        tree.getEl().down('.x-tree-view').dom.style.display = "none";
        tree.setLoading();
    },
    
    onProjectStoreLoad: function(store, node, records, successful, eOpts){
        var tree = this.getProjectTree();
        var stage = (this.currentStage !== null) ? this.currentStage : 1;
        tree.filterBy(String(stage), 'stage');
        tree.getEl().down('.x-tree-view').dom.style.display = "block";
        tree.setLoading(false);
        tree.doLayout();
    },

    run: function() {
        
        var me = this;
        var tree = this.getProjectTree();

        tree.store.on('load', this.onProjectStoreLoad, this, {delay: 50});

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
                },
                'project-tree-context-menu [itemId="move-to-execution-button"]': {
                    click: this.onMoveToExecutionButtonClick
                },
                'project-tree-context-menu [itemId="move-to-preparation-button"]': {
                    click: this.onMoveToPreparationButtonClick
                }
            }
        });
        
    }
    
});