Ext.define('EC.SysDev.view.abstract.ProjectTreeContextMenu', {
    
    extend: 'Ext.menu.Menu',
    
    //alias: 'widget.project-tree-context-menu',
    
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
        text: 'Перенести в исполнение',
        icon: '/images/icons/move.gif',
        hidden: true,
        itemId: 'move-to-execution-button'
    },{
        text: 'Перенести в формирование',
        icon: '/images/icons/move-left.gif',
        hidden: true,
        itemId: 'move-to-preparation-button'
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