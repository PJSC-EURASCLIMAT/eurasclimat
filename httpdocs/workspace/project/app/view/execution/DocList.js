Ext.define('Project.view.execution.DocList', {

    extend: 'Ext.grid.Panel',
    
    alias: 'widget.project-doc-list',

    layout: 'fit',
    
    forceFit: true,
    
    border: false,
    
    store: {
        type: 'project-doc-store'
    },

    columns: [{
        xtype: 'templatecolumn',
        header: 'Наименование',
        tpl: '<a href="{url}" action="getdoc" >{name}</a>'
    }, {
        header: 'Автор',
        dataIndex: 'author'
    }, {
        xtype: 'datecolumn',
        header: 'Дата создания',
        format: 'd.m.Y H:i',
        dataIndex: 'date_create'
    }, {
        header: 'project_id',
        dataIndex: 'project_id',
        hidden: true
    }]
       
//        this.bbar = Ext.create('Ext.PagingToolbar', {
//            store: this.store,
//            displayInfo: true,
//            plugins: Ext.create('xlib.ProgressBarPager', {})
//        });

});