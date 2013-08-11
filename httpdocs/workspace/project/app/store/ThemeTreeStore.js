Ext.define('Project.store.ThemeTreeStore', {

    extend: 'Ext.data.TreeStore',
    
    alias: 'store.project-theme-tree-store',
   
    model: 'Project.model.ThemeTreeModel',
    
    autoSync: true, // автоматическая синхронизация данных с сервером
    
    root: {
        text: 'Меню',
        id: '0',
        expanded: false // значение ИСТИНА запускает загрузку дочерних узлов с сервера, поскольку они не заданы. В ответе сервера корневой узел должен иметь признак loaded = true
    },
    
    proxy: {
        
        type: 'ajax',
        
        api: {

            create: '/json/sysdev/projects/create',
            read: '/json/sysdev/projects/get-tree',
            update: '/json/sysdev/projects/update',
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
        
    }    

});