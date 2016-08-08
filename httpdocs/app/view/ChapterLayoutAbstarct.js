Ext.define('App.view.ChapterLayoutAbstarct', {

    extend: 'Ext.tab.Panel',

    closable: false,
    
    border: false,
    
    bodyBorder: false,

    tabBar: {
        style: 'margin-top: -1px;'
    },

    activeTab: 0,
    
    defaults: {
        layout: 'fit',
        bodyBorder: false,
        closable: false
    }
    
});