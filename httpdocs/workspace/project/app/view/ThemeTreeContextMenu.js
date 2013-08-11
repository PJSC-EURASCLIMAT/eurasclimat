Ext.define('Project.view.ThemeTreeContextMenu', {
    
    extend: 'Ext.menu.Menu',
    
    alias: 'widget.project-theme-tree-context-menu',
    
    closeAction: 'hide',
    
    items: [{                                
        text: 'Создать раздел',
        itemId: 'create-folder-button',
        icon: '/images/icons/folder.gif'
    },{        
        text: 'Создать пункт',
        icon: '/images/icons/leaf.gif',
        itemId: 'create-reference-button'
    },{        
        text: 'Переименовать',
        itemId: 'rename-button',
        icon: '/images/icons/edit.png'     
    },{        
        text: 'Удалить',
        itemId: 'delete-button',
        icon: '/images/icons/delete.png'     
    }]
    
});