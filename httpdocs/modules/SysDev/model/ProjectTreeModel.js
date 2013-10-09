Ext.define('EC.Project.model.ProjectTreeModel', {

    extend: 'Ext.data.TreeModel',
    
    idProperty: 'id',
   
    fields: [
        
        { name: 'id', type: 'int', useNull: true }, 
        { name: 'name', type: 'string' }, 
        { name: 'extended', type: 'boolean' },
        { name: 'leaf', type: 'boolean' },

        { name: 'parent_id', type: 'int', useNull: true }, 
        { name: 'account_id', type: 'int', useNull: true }, 
        { name: 'date_vote_begin', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_vote_end',   type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_discuss_begin', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_discuss_end',   type: 'date', dateFormat: 'Y-m-d H:i:s' }, 
        { name: 'stage', type: 'int', useNull: true }
        
    ]
});