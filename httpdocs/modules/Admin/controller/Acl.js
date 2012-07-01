Ext.define('EC.Admin.controller.Acl', {
    
    extend: 'Ext.app.Controller',

    stores: [
        'EC.Admin.store.Roles',
        'EC.Admin.store.Acl'
    ],
    
    models: [
        'EC.Admin.model.Roles',
        'EC.Admin.model.Acl'
    ],
    
    views: [
        'EC.Admin.view.Roles.List',
        'EC.Admin.view.Acl.List'
    ],
    
    init: function(container) {
        
        if (!acl.isView('admin')) {
            return;
        }
        
        if ('portlet' == container.getXType()) {

            container.setHeight(80);
            
            container.add({
                xtype: 'panel',
                layout: 'fit',
                padding: 10,
                html: 'Разверите для просмотра',
                preventHeader: true,
                border: false
            });
            
        } else {
            
            container.setLoading('Загрузка...', true);
            
            var rolesPanel = Ext.create('EC.Admin.view.Roles.List', {
                border: false,
                width: 300,
                region: 'west',
                cls: 'x-border-right',
                margins: '0 5 0 0',
                allowEditing: false
            });
            
            var aclPanel = Ext.create('EC.Admin.view.Acl.List', {
                border: false,
                region: 'center',
                cls: 'x-border-left'
            });
            
            container.add({
                layout: 'border',
                preventHeader: true,
                border: false,
                items: [rolesPanel, aclPanel],
                listeners: {
                    afterLayout: function() {
                        container.setLoading(false);
                    }
                }
            });
            
            rolesPanel.on('select', function(selModel, record, index, eOpts) {
                aclPanel.getStore().load({params: {roleId: record.get('id')}})
            });
            
            
            if (acl.isUpdate('admin')) {
                
                Ext.each(aclPanel.query('checkcolumn'), function(item) {
                    item.on('checkchange', this.onCheckChange);
                }, this);
                
            } else {
                
                Ext.each(aclPanel.query('checkcolumn'), function(item) {
                    item.on('beforecheckchange', function() {
                        return false;
                    });
                }, this);
            }
            
            rolesPanel.getStore().load();
            aclPanel.getRootNode().removeAll();
        }
    },
    
    onCheckChange: function(checkColumn, recordIndex, checked, record, dataIndex) {
        
        var failure = function() {
            record.reject();
            Ext.Msg.alert('Ошибка', 'Ошибка при установке привилегий!');
        };
        
        Ext.Ajax.request({
            params: {
                resourceId: record.get('id'),
                roleId: record.get('roleId'),
                privilege: dataIndex,
                value: checked
            },
            url: '/json/admin/acl/allow',
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                record.commit();
            },
            failure: failure,
            scope: this
        });
    }
});