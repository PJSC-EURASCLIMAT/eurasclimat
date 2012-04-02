Ext.define('EC.Catalog.view.List', {

    extend: 'Ext.grid.Panel',
   
    alias: ['widget.CatalogList'],
    
    initComponent: function() {
        this.store = {
            fields: ['name', 'email'],
            data  : [
                {name: 'Ed',    email: 'ed@sencha.com'},
                {name: 'Tommy', email: 'tommy@sencha.com'}
            ]
        };

        this.columns = [
            {header: 'Имя',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];

        this.callParent(arguments);
    }
    
});