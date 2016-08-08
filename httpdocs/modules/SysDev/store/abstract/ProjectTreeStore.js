Ext.define('EC.SysDev.store.abstract.ProjectTreeStore', {

    extend: 'Ext.data.TreeStore',
    
    alias: 'store.project-tree-store',
   
    model: 'EC.SysDev.model.ProjectTreeModel',
    
    sortOnLoad: true,
    
    autoSync: true, // автоматическая синхронизация данных с сервером
    
    root: {
        text: 'Меню',
        id: '0',
        position: 1,
        expanded: false // значение ИСТИНА запускает загрузку дочерних узлов с сервера, поскольку они не заданы. В ответе сервера корневой узел должен иметь признак loaded = true
    },
        
    sorters: [{
        property: 'position'
    }]

});