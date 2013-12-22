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
            flex: 1,
            border: false,
            xtype: 'ConfiguratorEquipmentList',
            projectID: this.projectID,
            permissions: this.permissions
        }, {
            region: 'south',
            flex: 1,
            border: false,
            cls: 'x-border-top',
            xtype: 'ConfiguratorSpecialServicesList',
            projectID: this.projectID,
            permissions: this.permissions
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