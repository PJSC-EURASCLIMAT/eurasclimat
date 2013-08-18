Ext.define('Project.store.ProjectTreeStore', {

    extend: 'Ext.data.TreeStore',
    
    alias: 'store.project-tree-store',
   
    model: 'Project.model.ProjectTreeModel',
    
    sortOnLoad: true,
    
    autoSync: true, // автоматическая синхронизация данных с сервером
    
    root: {
        text: 'Меню',
        id: '0',
        position: 1,
        expanded: false // значение ИСТИНА запускает загрузку дочерних узлов с сервера, поскольку они не заданы. В ответе сервера корневой узел должен иметь признак loaded = true
    },
    
    proxy: {
        
        type: 'ajax',
        
        api: {

            create: '/json/sysdev/projects/create',
            read: '/json/sysdev/projects/get-tree',
            update: '/json/sysdev/projects/rename',
            destroy : '/json/sysdev/projects/delete'
            
        },
        
        reader: {
            type: 'json',
            root: 'children' // ответ сервера должен содержать такой ключ, чтобы клиент смог прочитать его.
        },
        
        writer: {
            root: 'data',
            encode: true
        }
        
    },
    
    sorters: [{
        property: 'position'
    }]

});