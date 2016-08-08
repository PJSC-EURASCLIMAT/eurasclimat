Ext.define('EC.CRM.view.Projects.Groups.Edit', {
    
    extend: 'Ext.window.Window',
    
    title: 'Редактирование группы',
    
    layout: 'fit',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 500,
    
    uses: ['EC.CRM.view.Projects.Groups.Combo'],
    
    initComponent: function() {
        
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            fieldDefaults: {
                labelAlign: 'left',
                border: false,
                allowBlank: false,
                anchor: '100%'
            },
            items: [{
                xtype: 'hidden',
                name: 'id'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Наименование',
                name: 'name'
            }],
            buttons: ['->',{
                text: 'Сохранить',
                formBind: true,
                action: 'save'
            }, {
                text: 'Отменить',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});