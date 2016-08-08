Ext.define('EC.SysDev.model.VoteModel', {

    extend: 'Ext.data.Model',
   
    fields: [
        {name: 'id', type: 'number'},
        {name: 'mark_id', type: 'number'},
        {name: 'project_id', type: 'number'},
        {name: 'account_id', type: 'number'}
    ]
});