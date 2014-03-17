Ext.define('EC.CRM.controller.Projects.Members', {
    
    extend: 'Ext.app.Controller',
    
    views: ['EC.CRM.view.Projects.Members'],
    
    uses: [
        'xlib.form.ComboBox',
        'xlib.AccountsCombo'
    ],
    
    getURL: '/json/crm/projects/get-members',
    
    updateURL: '/json/crm/projects/update-members',
    
    projectID: null,
    
    permissions: true,
    
    run: function(container) {

        this.Container = container; 
        
        var membersPanel = container.add(this.getView('EC.CRM.view.Projects.Members', {
            permissions: this.permissions
        }).create());
        
        if (this.permissions) {
        
            membersPanel.down('button[action=save]').on({
                click: function() {
                    this.saveData();
                },
                scope: this
            });
            
            var addButtons = membersPanel.query('fieldset button');
            Ext.each(addButtons, function(item) {
                item.on({
                    click: function(b) {
                        this.addField(b.action);
                    },
                    scope: this
                });
            }, this);
            
        }
        
        this.loadData();
    },
    
    addField: function(itemId, value) {
        
        var cnt = this.Container.down('#' + itemId),
            combo = Ext.create('xlib.AccountsCombo', {
                anchor: '50%',
                padding: 10,
                hideLabel: true,
                name: itemId + '[]'
            });
            
            if (!Ext.isEmpty(value)) {
                combo.getStore().on('load', function() {
                    combo.setValue(value);
                }, this, {single: true});
            }
            
        cnt.add(combo);
    },
    
    loadData: function() {
        
        var failure = function() {
            Ext.Msg.alert('Ошибка', 'Ошибка загрузки!');
        };
            
        Ext.Ajax.request({
            url: this.getURL,
            params: {id: this.projectID},
            success: function(response, opts) {
                var resp = Ext.decode(response.responseText, true);
                if (!resp || !resp.success) {
                    failure();
                    return;
                }
                this.buildForm(resp.data);
            },
            failure: failure,
            scope: this
        });
    },
    
    buildForm: function(data) {
        Ext.each(data, function(item) {
            this.addField(item.role, item.account_id);
        }, this);
    },
    
    saveData: function() {
        
        this.Container.down('form').submit({
            url: this.updateURL,
            params: {id: this.projectID},
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('saved');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    }
    
});