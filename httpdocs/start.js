Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        'Ext'   : '/library/ext4/src',
        'xlib'  : '/library/xlib',
        'EC'    : '/modules'
    }
});


Ext.application({
    name: 'App',
    appFolder: 'app',
    controllers: ['Main']
});

/* Overrides */
Ext.onReady(function() {
    
    console.log('show mask', (new Date()).getTime());
    new Ext.LoadMask(Ext.getBody(), {msg:'Загрузка...'}).show();
    
    /* Translation */
    
    if (Ext.grid.RowEditor) {
        Ext.apply(Ext.grid.RowEditor.prototype, {
            saveBtnText  : 'Сохранить',
            cancelBtnText: 'Отменить',
            errorsText: 'Ошибки',
            dirtyText: 'Вы должны сохранить или отменить ваши изменения'
        });
    }

    Ext.MessageBox.initComponent();
    

    /* 
     * Fucking bug fixing for Ext 4.1 
     * TODO: check this in future releases
     */
    
    Ext.override(Ext.panel.Panel, {
        getDockedItems: function (selector, beforeBody) {
            return this.getComponentLayout().getDockedItems ?  
                this.callOverridden([selector, beforeBody]) : [];
        }
    });
    
    Ext.override(Ext.view.AbstractView, {
      onRender: function() {
        var me = this;
        this.callOverridden();
        if (me.mask && Ext.isObject(me.store)) {
            me.setMaskBind(me.store);
        }
      }
    });
    
});