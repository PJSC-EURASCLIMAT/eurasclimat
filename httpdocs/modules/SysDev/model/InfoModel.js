Ext.define('EC.SysDev.model.InfoModel', {

    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'name', type: 'string' },
        { name: 'account_id', type: 'number' },
        { name: 'author', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'full_desc', type: 'string' },
        { name: 'budget', type: 'float' },
        { name: 'date_create', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_vote_begin', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_vote_end',   type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_discuss_begin', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_discuss_end',   type: 'date', dateFormat: 'Y-m-d H:i:s' }, 
        { name: 'date_plan_begin', type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'date_plan_end',   type: 'date', dateFormat: 'Y-m-d H:i:s' }, 
        { name: 'date_fact_end',   type: 'date', dateFormat: 'Y-m-d H:i:s' },
        { name: 'stage', type: 'int', useNull: true }
    ],
    
    proxy: {
        
        type: 'ajax',

        api: {
            read: '/json/sysdev/project-info/get',
            update: '/json/sysdev/project-info/save'
        },

        reader: {
            type: 'json',
            root: 'data' // ответ сервера должен содержать такой ключ, чтобы клиент смог прочитать его.
        },
        
        writer: {
            root: 'data',
            encode: true
        }
        
    }
    
});