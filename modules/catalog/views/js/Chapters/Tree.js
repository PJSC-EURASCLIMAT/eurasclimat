Ext.ns('Catalog.Chapters');

Catalog.Chapters.Tree = Ext.extend(xlib.TreePanel, {

    title: 'Разделы',

    loadURL: link('catalog', 'chapters', 'get'),
    
    addURL: link('catalog', 'chapters', 'add'),
    
    updateURL: link('catalog', 'chapters', 'update'),
    
    deleteURL: link('catalog', 'chapters', 'delete'),
    
    ddAppendOnly: true,
    
    enableDrop: false,
    
    enableDD: false,
    
    rootVisible: false,
    
    readOnly: false,
    
    initComponent: function() {
    
        this.root = new Ext.tree.AsyncTreeNode({
            text: 'РАЗДЕЛЫ',
            id: '0',
            leaf: false,
            expanded: true,
            allowRemove: false,
            allowRename: false
        });
        
        this.loader = new Ext.tree.TreeLoader({
            url: this.loadURL
        });
        
        Catalog.Chapters.Tree.superclass.initComponent.apply(this, arguments);
    },
    
    onContextMenu: function(node, e) {
        
        e.stopEvent();
        node.select();
        
        if (this.readOnly) {
            return;        
        }
        
        var menu = new Ext.menu.Menu();
        
        menu.add({
            text: 'Добавить',
            iconCls: 'add',
            handler: function() {
                this.createProcess(node);
            },
            scope: this
        });
        
        if (!this.isRoot(node)) {
            menu.add({
                text: 'Переименовать',
                iconCls: 'edit',
                handler: function() {
                    this.treeEditor.triggerEdit(node);
                }, 
                scope: this
            });
            
            menu.add({
                text: 'Удалить',
                iconCls: 'delete',
                handler: function() {
                    this.beforeRemove(node);
                }, 
                scope: this
            });
        }
        
        menu.showAt(e.getXY());
    },
    
    createProcess: function(node) {
        var text = '';
        Ext.Ajax.request({
            url: this.addURL,
            params: {
        		parent: node.id,
                name: text
            },
            callback: function(options, success, response) {
                var r = xlib.decode(response.responseText);
                if (success && r && r.success && r.id > 0) {
                    var newNode = new Ext.tree.TreeNode({
                        expanded: true,
                        text: text,
                        leaf: false,
                        childrens: [],
                        id: r.id 
                    });
                    node.expand();
                    node.appendChild(newNode);
                    this.treeEditor.triggerEdit(newNode);
                    return;
                }
                xlib.Msg.error('Не удалось создать.');
            },
            scope: this
        });
    },
    
    renameProcess: function(editor, node, value, startValue) {
        Ext.Ajax.request({
            url: this.updateURL,
            params: {
                node: node.id,
                name: value
            },
            callback: function(options, success, response) {
                var r = xlib.decode(response.responseText);
                var success = success && r && r.success;
                
                if (!success) {
                    this.revertRename(node, startValue);
                    xlib.Msg.error('Не удалось переименовать.');
                }
            },
            scope: this
        });
    },
    
    removeProcess: function(node) {
        Ext.Ajax.request({
            url: this.deleteURL,
            params: {
                id: node.id
            },
            callback: function(options, success, response) {
                var msg = 'Не удалось удалить.';
                if (true == success) {
                    var res = xlib.decode(response.responseText);
                    if (true == res.success) {
                        this.removeNode(node);
                        return;
                    } else if (res.errors) {
                        var msg;
                        switch (res.errors[0].code) {
                            case -20:
                                msg = 'Не удалось удалить из-за конфликта зависимостей.'
                                break;
                            default:
                        }
                    }
                }
                xlib.Msg.error(msg);
            },
            scope: this
        });
    }
});

Ext.reg('Catalog.Chapters.Tree', Catalog.Chapters.Tree);