Ext.define('EC.Manufacturers.view.List', {

    extend: 'Ext.grid.Panel',

    alias: 'widget.ManufacturersList',

    hideHeaders: true,
    
    enableColumnMove: false,
    
    permissions: acl.isUpdate('admin'),

    listeners: {
        itemclick: function(grid, record, item, index, e, eOpts) {
            var url = record.get('url');
            this.fireEvent('rowClicked', url);
        }
    },

    store: 'EC.Manufacturers.store.Manufacturers',

    initComponent: function() {
        
        this.columns = [{
          text: 'Название',
          xtype: 'templatecolumn',
          tpl: '{name}<br/><small>({type})</small>',
          flex: 1
        }, {
          xtype:'actioncolumn',
          width: 40,
          hidden: !this.permissions,
          items: [{
            icon: '/images/icons/fam/plugin.gif',
            tooltip: 'Редактировать',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
              this.fireEvent('edititem', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
          }, {
            icon: '/images/icons/fam/delete.gif',
            tooltip: 'Удалить',
            iconCls: 'x-btn',
            handler: function(grid, rowIndex, colIndex) {
              this.fireEvent('deleteitem', grid, grid.getStore().getAt(rowIndex));
            },
            scope: this
          }]
        }];
      
        this.tbar = [{
            xtype: 'button',
            text: 'Добавить',
            iconCls: 'add',
            hidden: !this.permissions,
            handler: function(grid, rowIndex, colIndex) {
                this.fireEvent('additem', this, null);
            },
            scope: this
        }, '->', {
            xtype: 'button',
            tooltip: 'Обновить',
            iconCls: 'x-tbar-loading',
            handler: function() {
                this.getStore().load();
            },
            scope: this
        }];
        
        this.callParent();
    }
});