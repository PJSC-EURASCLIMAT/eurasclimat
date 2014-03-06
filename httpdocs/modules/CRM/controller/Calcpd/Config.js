Ext.define('EC.CRM.controller.Calcpd.Config', {
    
    extend: 'Ext.app.Controller',
    
    stores: [
        'EC.CRM.store.Calcpd.Serv',
        'EC.CRM.store.Calcpd.ObjType',
        'EC.CRM.store.Calcpd.ObjClass',
        'EC.CRM.store.Calcpd.ObjTree'
    ],
    
    models: [
        'EC.CRM.model.Calcpd.ConfigAbstract',
        'EC.CRM.model.Calcpd.ObjTree'
    ],

    views: [
        'EC.CRM.view.Calcpd.ServList',
        'EC.CRM.view.Calcpd.ObjTypeList',
        'EC.CRM.view.Calcpd.ObjClassList',
        'EC.CRM.view.Calcpd.ObjTree',
        'EC.CRM.view.Calcpd.ConfigPriceForm'
    ],
    
    loadURL: '/json/crm/calcpd-config/get-price',
    
    saveURL: '/json/crm/calcpd-config/set-price',
    
    run: function(container) {
        
        if (!acl.isUpdate('calcpd', 'admin')) return;
        
        this.Container = Ext.create('EC.CRM.view.Calcpd.ConfigLayout');

        /* serv section */
        
        var servPanel = this.Container.down('#servPanel').add(Ext.create('EC.CRM.view.Calcpd.ServList'));
        servPanel.Editing.on('edit', function(editor, e, eOpts) {
            e.grid.getStore().sync();
        });
        servPanel.down('button[action=refresh]').on('click', function() {
            servPanel.getStore().load();
        });
        servPanel.down('button[action=additem]').on('click', function() {
            this.onAddItem(servPanel);
        }, this);
        servPanel.on({
            'edititem': function(record) {
                this.onEditItem(servPanel, record);
            },
            'deleteitem': function(record) {
                this.onDeleteItem(servPanel, record);
            },
            scope: this
        });

        /* objType section */
        
        var objTypePanel = this.Container.down('#objTypePanel').add(Ext.create('EC.CRM.view.Calcpd.ObjTypeList'));
        objTypePanel.Editing.on('edit', function(editor, e, eOpts) {
            e.grid.getStore().sync();
        });
        objTypePanel.down('button[action=refresh]').on('click', function() {
            objTypePanel.getStore().load();
        });
        objTypePanel.down('button[action=additem]').on('click', function() {
            this.onAddItem(objTypePanel);
        }, this);
        objTypePanel.on({
            'edititem': function(record) {
                this.onEditItem(objTypePanel, record);
            },
            'deleteitem': function(record) {
                this.onDeleteItem(objTypePanel, record);
            },
            scope: this
        });

        /* objClass section */
        
        var objClassPanel = this.Container.down('#objClassPanel').add(
                Ext.create('EC.CRM.view.Calcpd.ObjClassList')
            );
        objClassPanel.Editing.on('edit', function(editor, e, eOpts) {
            e.grid.getStore().sync();
        });
        objClassPanel.down('button[action=refresh]').on('click', function() {
            objClassPanel.getStore().load();
        });
        objClassPanel.down('button[action=additem]').on('click', function() {
            this.onAddItem(objClassPanel);
        }, this);
        objClassPanel.on({
            'edititem': function(record) {
                this.onEditItem(objClassPanel, record);
            },
            'deleteitem': function(record) {
                this.onDeleteItem(objClassPanel, record);
            },
            scope: this
        });
        
        /* price section */
        var pricePanel = this.Container.down('#pricePanel'),
            objTree = this.Container.down('CalcpdObjTree'),
            priceFormPanel = this.Container.down('#priceFormPanel');
        
        pricePanel.on('activate', function() {
            this.clearForm();
            priceFormPanel.disable();
            objTree.getStore().reload();
        }, this);
        
        objTree.on('itemclick', this.onObjSelect, this);
        
        priceFormPanel.down('button[action=save]').on('click', this.saveData, this);
        priceFormPanel.down('button[action=reset]').on('click', function() {
            priceFormPanel.getForm().reset();
        }, this);
    },
    
    /* Abstract routine */
    
    onAddItem: function(gridpanel) {

        var store = gridpanel.getStore(),
            record = Ext.create('EC.CRM.model.Calcpd.ConfigAbstract', {});

        store.insert(1 + store.getCount(), record);
        
        gridpanel.Editing.on('canceledit', function() {
            store.rejectChanges();
        }, this, {single: true});
        
        gridpanel.Editing.startEdit(record, 1); 
    },
    
    onEditItem: function(gridpanel, record) {
        
        gridpanel.Editing.startEdit(record, 1);
    },
    
    onDeleteItem: function(gridpanel, record) {
        
        Ext.MessageBox.confirm('Подтверждение', 'Удалить запись?', function(b) {
            if ('yes' === b) {
                var store = gridpanel.getStore();
                store.remove(record);
                store.sync();
            }
        });
    },
    
    /* Price section */
    
    onObjSelect: function(tree, record) {
        
        var priceFormPanel = this.Container.down('#priceFormPanel'),
            params = {
                obj_type_id: record.get('obj_type_id'),
                obj_class_id: record.get('obj_class_id'),
                serv_id: record.get('serv_id')
            };
            
        if (!params.obj_type_id > 0 || !params.obj_class_id > 0 || !params.serv_id > 0) {
            this.clearForm();
            priceFormPanel.disable();
            return;
        }
        
        var failure = function() {
            this.clearForm();
            priceFormPanel.disable();
            Ext.Msg.alert('Ошибка', 'Ошибка чтения формы!');
        };
        
        priceFormPanel.getForm().load({
            url: this.loadURL,
            params: params,
            waitMsg: 'Загрузка...',
            success: function(form, action) {
                if (!action.result.success) {
                    failure();
                }
                priceFormPanel.enable();
            },
            failure: failure,
            scope: this
        });
    },
    
    clearForm: function() {
        this.Container.down('#priceFormPanel').getForm().getFields().each(
        function(i) {
            i.setValue(0);
        }, this);
    },
    
    saveData: function() {
        
        var formPanel = this.Container.down('#priceFormPanel');
            
        formPanel.submit({
            url: this.saveURL,
            waitMsg: 'Сохранение...',
            success: function(form, action) {
                this.fireEvent('itemSaved');
                Ext.Msg.alert('Сообщение', 'Данные успешно сохранены.');
            },
            failure: function(form, action) {
                switch (action.failureType) {
                    case Ext.form.action.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Ошибка', 'Поля формы заполнены неверно!');
                        break;
                    case Ext.form.action.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Ошибка', 'Проблемы коммуникации с сервером.');
                        break;
                    case Ext.form.action.Action.SERVER_INVALID:
                        Ext.Msg.alert('Ошибка', action.result.errors[0].msg);
               }
            },
            scope: this
        });
    }
});