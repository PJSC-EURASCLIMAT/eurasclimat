Ext.define('EC.Project.store.preparation.ProjectTreeStore', {

    extend: 'EC.Project.store.abstract.ProjectTreeStore',
    
    alias: 'store.project-preparation-tree-store',
    
    proxy: {
        
        type: 'ajax',
        
        extraParams: {
            stage: 1
        },
        
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
        
    }
    
});