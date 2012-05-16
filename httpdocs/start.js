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

/* Overrides translation */ 

Ext.onReady(function() {
    
    if (Ext.grid.RowEditor) {
        Ext.apply(Ext.grid.RowEditor.prototype, {
            saveBtnText  : 'Сохранить',
            cancelBtnText: 'Отменить',
            errorsText: 'Ошибки',
            dirtyText: 'Вы должны сохранить или отменить ваши изменения'
        });
    }

    Ext.MessageBox.initComponent();
    
});