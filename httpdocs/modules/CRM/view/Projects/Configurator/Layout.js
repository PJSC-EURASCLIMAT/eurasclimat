Ext.define('EC.CRM.view.Projects.Configurator.Layout', {
    
    extend: 'Ext.panel.Panel',
    
    layout: 'border',
    
    border: false,
    
    projectID: null,
    
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

        this.bbar = ['->', {
            xtype: 'tbtext',
            text: '<b>Общая сумма:</b>'
        }, {
            xtype: 'tbtext',
            itemId: 'totalsumm'
        }];
        
        this.callParent(arguments);
    }
});