Ext.define('EC.CRM.view.Configurator.Layout', {
    
    extend: 'Ext.window.Window',
    
    title: 'Конфигуратор проекта',
    
    layout: 'border',
    
    border: false,
    
    autoShow: true,
    
    modal: true,
    
    width: 1000,
    
    height: 600,
    
    projectID: null,
    
    projectName: null,
    
    permissions: false,
    
    initComponent: function() {
        
        if (!this.projectID) {
            throw 'The project ID must be set!';
        }
        
        this.items = [{
            region: 'center',
            flex: .5,
            border: false,
            layout: 'border',
            items: [{
                region: 'center',
                flex: 1,
                xtype: 'ConfiguratorEquipmentList',
                projectID: this.projectID,
                permissions: this.permissions
            }, {
                region: 'east',
                flex: 1,
                xtype: 'ConfiguratorServicesList',
                projectID: this.projectID,
                permissions: this.permissions
            }]
        }, {
            region: 'south',
            flex: .5,
            border: false,
            layout: 'border',
            items: [{
                region: 'center',
                flex: 1,
                xtype: 'ConfiguratorExpendablesList',
                projectID: this.projectID,
                permissions: this.permissions
            }, {
                region: 'east',
                flex: 1,
                xtype: 'ConfiguratorSpecialServicesList',
                projectID: this.projectID,
                permissions: this.permissions
            }]
        }];

        this.buttons = [{
            xtype: 'tbtext',
            text: '<b>Общая сумма:</b>'
        }, {
            xtype: 'tbtext',
            itemId: 'totalsumm'
        }, '->', {
            text: 'Закрыть',
            scope: this,
            handler: this.close
        }];
        
        this.callParent(arguments);
        
        if (this.projectName) {
            this.setTitle(this.title + ' "' + this.projectName + '"');
        }
    }
});