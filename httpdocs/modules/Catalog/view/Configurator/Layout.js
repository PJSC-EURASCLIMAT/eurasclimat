Ext.define('EC.Catalog.view.Configurator.Layout', {
    
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
            flex: 1,
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
            disabled: true,
            items: [{
                region: 'center',
                flex: 1,
                title: 'Инструменты, механизмы и вспомогательные материалы'
            }, {
                region: 'east',
                flex: 1,
                title: 'Специальные виды услуг'
            }]
        }];

        this.buttons = [{
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