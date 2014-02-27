Ext.define('EC.CRM.view.Calcpd.Add', {
    
    extend: 'Ext.window.Window',
    
    layout: 'fit',
    
    border: false,
    
    bodyBorder: false,
    
    autoShow: true,
    
    modal: true,
    
    title: 'Новый проект',
    
    items: [{
        xtype: 'form',
        border: false,
        defaults: {
            allowBlank: false,
            padding: 5,
            width: 400
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Наименование',
            name: 'name'
        }, {
            xtype: 'combo',
            valueField: 'id',
            displayField: 'name', 
            fieldLabel: 'Тип объекта',
            editable: false,
            name: 'obj_type_id',
            store: {
                fields: ['id', 'name'],
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    api: {
                        read:   '/json/crm/calcpd-config/read-obj-type'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        successProperty: 'success'
                    },
                    pageParam: undefined,
                    startParam: undefined,
                    sortParam: undefined,
                    limitParam: undefined
                }
            }
        }],
        buttons: [{
            text: 'Продолжить',
            formBind: true,
            action: 'save'
        }]
    }]
    
});