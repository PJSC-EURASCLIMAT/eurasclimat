Ext.define('EC.CRM.controller.Calcpd.Main', {
    
    extend: 'Ext.app.Controller',

    controllers: [
        'EC.CRM.controller.Calcpd.Editor'
    ],
    
    stores: [
        'EC.CRM.store.Calcpd.Main'
    ],
    
    models: [
        'EC.CRM.model.Calcpd.Main'
    ],
    
    views: [
        'EC.CRM.view.Calcpd.MainList'
    ],
    
    permissions: acl.isUpdate('admin'),
    
    deleteURL: '/json/crm/calcpd/delete',
    
    run: function(container) {

        this.Container = container; 
        
        var isPortlet = ('portlet' == container.getXType() || container.up('portlet')); 
        
        var grid = container.add(Ext.create('EC.CRM.view.Calcpd.MainList', {
            permissions: this.permissions
        }));
        
        grid.down('button[action=refresh]').on({
            click: function() {
                grid.getStore().load();
            },
            scope: this
        });
        
        if (this.permissions) {
            
            grid.down('button[action=additem]').on({
                click: this.addItem,
                scope: this
            });
            
            grid.down('button[action=config]').on({
                click: this.showConfig,
                scope: this
            });
            
            grid.on({
                edititem: this.editItem,
                itemdblclick: this.editItem,
                deleteitem: this.deleteItem,
                scope: this
            });
            
            this.on({
                'itemSaved': function() {
                    grid.getStore().load();
                },
                scope: this
            }, this);
        }
        
    },
    
    showConfig: function() {
        
        // 'Настройки калькулятора'
        this.getController('EC.CRM.controller.Calcpd.Config').run();
    },
    
    addItem: function() {
        
        Ext.Msg.alert('Сообщение', 'Функция в разработке');
    },
    
    editItem: function(grid, record) {
        
        var module = this.getController('EC.CRM.controller.Calcpd.Editor');
        module.on('closed', function() {
            grid.getStore().load();
        });
        module.run();
    },
    
    deleteItem: function(grid, record) {
        
        var failureFn = function(response, opts) {
            Ext.Msg.alert('Ошибка', 'Удаление не выполнено!');
        }
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить позицию?', function(b) {
            
            if ('yes' === b) {
                Ext.Ajax.request({
                    params: {
                        id: record.get('id')
                    },
                    url: this.deleteURL,
                    success: function(response, opts) {
                        try {
                            var r = Ext.decode(response.responseText);
                            if (!r.success) {
                                return failureFn(arguments);
                            }
                        } catch(e) {
                            return failureFn(arguments);
                        }
                        Ext.Msg.alert('Сообщение', 'Удаление прошло успешно');
                        this.fireEvent('itemSaved');
                    },
                    failure: failureFn,
                    scope: this
                });
            }
        }, this);
    }
    
});