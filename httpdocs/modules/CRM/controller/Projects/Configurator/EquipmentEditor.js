Ext.define('EC.CRM.controller.Projects.Configurator.EquipmentEditor', {
    
    extend: 'Ext.app.Controller',
    
    itemID: null,
    
    permissions: acl.isUpdate('crm', 'projects'),
    
    getURL: '/json/crm/projects-configurator/get-equipment',
    
    setURL: '/json/crm/projects-configurator/update-equipment',
    
    run: function() {

        if (!this.itemID) {
            throw 'The item ID must be set!';
        }
        console.log('EquipmentEditor');
        /*
        this.loadData();
        
        this.Container = this.getWindow();
        this.Container.down('button[action=save]').on('click', this.saveData, this);
        
        this.Container.add();
        */
    },
    
    getWindow: function() {
        
        var win = Ext.create('Ext.window.Window', {
            title: 'Редактирование позиции',
            width: 800,
            height: 400,
            modal: true,
            autoShow: true,
            border: false,
            layout: 'fit',
            buttons: [{
                text: 'Сохранить',
                formBind: true,
                action: 'save'
            }, {
                text: 'Закрыть',
                handler: function() {
                    win.close();
                }
            }]
        });
        
        return win;
    },
    
    loadData: function() {
        
        var failure = Ext.Msg.alert('Ошибка', 'Загрузка не выполнена!');
        
        Ext.Ajax.request({
            params: {
                id: this.itemID
            },
            url: this.getURL,
            success: function(response, opts) {
                var r = Ext.decode(response.responseText);
                if (r && r.succes == true) { 
                    this.process(r.data);
                } else {
                    failure();
                }
            },
            failure: failure,
            scope: this
        });
    },
    
    saveData: function() {
        
        var failure = Ext.Msg.alert('Ошибка', 'Сохранение не выполнено!');
        
        Ext.Ajax.request({
            params: {
                id: this.itemID
            },
            url: this.setURL,
            success: function(response, opts) {
                var r = Ext.decode(response.responseText);
                if (r && r.succes == true) { 
                    this.Container.close();
                } else {
                    failure();
                }
            },
            failure: failure,
            scope: this
        });
    }
});