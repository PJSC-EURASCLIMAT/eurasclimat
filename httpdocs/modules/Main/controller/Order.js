Ext.define('EC.Main.controller.Order', {
    
    extend: 'Ext.app.Controller',

    views: [
//        'EC.Main.view.AboutCompany',
        'EC.Main.view.OrderPortlet'
    ],

    permissions: acl.isUpdate('crm', 'orders'),

    URL: '/json/crm/orders/add-order',

    run: function(container) {
        
        this.Container = container;

        var panel = container.add(this.getView('EC.Main.view.OrderPortlet').create());
        panel.down('#sendBtn').on({
            click: this.sendOrder,
            scope: this
        });

        this.orderForm = panel.down('form');

        if (!this.permissions) {
//            this.orderForm.on('someFieldIsChanged', function(form, isDirty) {
//                xlib.Acl.AuthManager.showAuthWin();
//                this.orderForm.down('#sendBtn').disable();
//            },this);

            this.orderForm.on('beforeaction', function(form, action, eOpts ) {
                xlib.Acl.AuthManager.showAuthWin();
                return false;
            },this);

            this.orderForm.on('dirtychange', function(form, isDirty) {
                xlib.Acl.AuthManager.showAuthWin();
            },this);
        }

    },
    
    openCard: function(grid, record, item, index, e, eOpts) {
        var MC = this.getController('App.controller.Main');
        MC.openModuleTab(this.Container);
    },

    sendOrder: function() {
        this.orderForm.submit({
            url: this.URL,
            success: function(form, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:green;">Заказ оформлен успешно!</span>');
                this.orderForm.getForm().reset();
            },
            failure: function(form, action) {
                Ext.Msg.alert('Ответ системы',
                    '<span style="color:red;">ОШИБКА ОФОРМЛЕНИЯ ЗАКАЗА!</span>');
            },
            scope: this
        });
    }


});