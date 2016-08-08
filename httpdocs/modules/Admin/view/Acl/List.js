Ext.define('EC.Admin.view.Acl.List', {

    extend: 'Ext.tree.Panel',
    
    uses: ['xlib.CheckColumn'],
    
    alias: ['widget.AdminAclList'],
    
    store: 'EC.Admin.store.Acl',
    
    layout: 'fit',
    
    border: false,
    
    rootVisible: false,
    
    enableColumnHide: false,
    
    enableColumnMove: false,
    
    enableColumnResize: false,
    
    sortableColumns: false,
    
    useArrows: true,
    
    initComponent: function() {
        
        this.columns = [{
            xtype: 'treecolumn',
            header: 'Ресурс',
            flex: 1,
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                var title = record.get('title'),
                    name = record.get('name'),
                    text = Ext.isEmpty(title) ? name : title;
                    
                return Ext.DomHelper.markup({
                    tag: 'span',
                    width: '100%',
                    title: name,
                    html: text
                });
            } 
        }, {
            xtype: 'checkcolumn',
            header: 'Просмотр',
            align: 'center',
            dataIndex: 'view',
            width: 120
        }, {
            xtype: 'checkcolumn',
            header: 'Редактирование',
            align: 'center',
            dataIndex: 'update',
            width: 120
        }]; 
        
        this.callParent(arguments);
    }
});