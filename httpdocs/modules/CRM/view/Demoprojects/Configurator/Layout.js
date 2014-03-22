Ext.define('EC.CRM.view.Demoprojects.Configurator.Layout', {
    
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

        this.bbar = ['-', {
            xtype: 'tbtext',
            text: 'Оборудование:'
        }, {
            xtype: 'tbtext',
            itemId: 'totalequipment'
        }, '-', {
            xtype: 'tbtext',
            text: 'Услуги:'
        }, {
            xtype: 'tbtext',
            itemId: 'totalservices'
        }, '-', {
            xtype: 'tbtext',
            text: 'Специальные услуги:'
        }, {
            xtype: 'tbtext',
            itemId: 'totalspecialservices'
        }, '-', {
            xtype: 'tbtext',
            text: 'Материалы:'
        }, {
            xtype: 'tbtext',
            itemId: 'totalexpendables'
        }, '-', '->', {
            xtype: 'tbtext',
            text: '<b>Общая сумма:</b>'
        }, {
            xtype: 'tbtext',
            itemId: 'totalsumm'
        }];
        
        this.callParent(arguments);
    }
});